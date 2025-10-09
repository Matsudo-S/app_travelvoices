'use client'

import { useEffect, useRef, useState } from 'react'
import type { Location } from './types'
import styles from '../../create-post.module.css'

interface LocationFormProps {
  onAddLocation: (location: Omit<Location, 'id'>) => void
}

type Prediction = google.maps.places.AutocompletePrediction & { isTransit?: boolean }

export default function LocationForm({ onAddLocation }: LocationFormProps) {
  const [query, setQuery] = useState('')
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isComposing, setIsComposing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null)
  const placeServiceRef = useRef<google.maps.places.PlacesService | null>(null)
  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    const init = () => {
      if (typeof window === 'undefined' || !window.google?.maps?.places) {
        setTimeout(init, 100)
        return
      }
      autocompleteServiceRef.current = new google.maps.places.AutocompleteService()
      placeServiceRef.current = new google.maps.places.PlacesService(document.createElement('div'))
    }
    init()
  }, [])

  const fetchPredictions = (text: string) => {
    if (!autocompleteServiceRef.current || !text.trim()) {
      setPredictions([])
      setOpen(false)
      return
    }

    autocompleteServiceRef.current.getPlacePredictions({ input: text }, (results) => {
      if (!results) {
        setPredictions([])
        setOpen(false)
        return
      }

      const list = results.map((prediction) => ({
        ...prediction,
        isTransit: prediction.types?.some((type) =>
          ['transit_station', 'train_station', 'subway_station', 'bus_station'].includes(type)
        ),
      }))

      setPredictions(list)
      setActiveIndex(list.length ? 0 : -1)
      setOpen(list.length > 0)
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    setQuery(text)
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => fetchPredictions(text), 200)
  }

  const handleSelect = (prediction: Prediction) => {
    setPredictions([])
    setOpen(false)
    setQuery(prediction.description || '')

    if (!placeServiceRef.current) return

    placeServiceRef.current.getDetails({
      placeId: prediction.place_id,
      fields: ['name', 'formatted_address', 'geometry'],
    }, (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !place?.geometry?.location) {
        setError('選択した候補の詳細取得に失敗しました。')
        return
      }

      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()

      onAddLocation({
        name: place.name || prediction.structured_formatting?.main_text || prediction.description || 'スポット',
        address: place.formatted_address || prediction.description || '',
        lat,
        lng,
        visitedDate: new Date().toISOString().slice(0, 10),
        description: undefined,
      })

      setQuery('')
      setError(null)
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((prev) => (prev + 1) % Math.max(predictions.length, 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((prev) => (prev - 1 + predictions.length) % Math.max(predictions.length, 1))
        break
      case 'Enter':
        if (open && activeIndex >= 0 && activeIndex < predictions.length) {
          event.preventDefault()
          handleSelect(predictions[activeIndex]!)
        }
        break
      case 'Escape':
        setOpen(false)
        break
      default:
        break
    }
  }

  return (
    <div className={styles.formWrapper}>
      <label htmlFor="search-location" className={styles.formLabel}>
        場所名を入力
      </label>
      <div className={styles.autocompleteWrapper}>
        <input
          id="search-location"
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="例: 東京タワー / 渋谷駅 / 浅草寺"
          className={styles.formInput}
          onFocus={() => { if (predictions.length) setOpen(true) }}
          onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        />

        {open && predictions.length > 0 && (
          <div className={styles.predictions} role="listbox">
            {predictions.map((prediction, index) => (
              <button
                key={prediction.place_id}
                type="button"
                role="option"
                aria-selected={activeIndex === index}
                className={`${styles.predictionItem} ${activeIndex === index ? styles.predictionItemActive : ''}`}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSelect(prediction)}
              >
                <span aria-hidden className={styles.predictionIcon}>
                  {prediction.isTransit ? '🚆' : '📍'}
                </span>
                <span className={styles.predictionContent}>
                  <span className={styles.predictionTitle}>{prediction.structured_formatting?.main_text || prediction.description}</span>
                  {prediction.structured_formatting?.secondary_text && (
                    <span className={styles.predictionSubtitle}>{prediction.structured_formatting.secondary_text}</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      <p className={styles.formHint}>
        駅・バス停などの候補は <span role="img" aria-label="transit">🚆</span> アイコンで表示します。
      </p>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  )
}

