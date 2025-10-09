'use client'

import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import type { Location, RouteSegment, SegmentDuration } from './types'
import styles from '../../create-post.module.css'

interface GoogleMapSectionProps {
  locations: Location[]
  selectedLocation: Location | null
  onLocationSelect: (location: Location | null) => void
  routeSegments: RouteSegment[]
  isRouteConfirmed: boolean
}

type DirectionsBySegment = Record<string, google.maps.DirectionsResult>

const DEFAULT_CENTER = { lat: 35.6762, lng: 139.6503 }

const createSegmentKey = (segment: RouteSegment) => `${segment.fromLocationId}-${segment.toLocationId}`

export function GoogleMapSection({
  locations,
  selectedLocation,
  onLocationSelect,
  routeSegments,
  isRouteConfirmed,
}: GoogleMapSectionProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [directionsBySegment, setDirectionsBySegment] = useState<DirectionsBySegment>({})
  const [totalDuration, setTotalDuration] = useState('')
  const [segmentDurations, setSegmentDurations] = useState<SegmentDuration[]>([])

  const apiKey = useMemo(() => process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, [])

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []
  }, [])

  const resetDirections = useCallback(() => {
    setDirectionsBySegment((prev) => {
      Object.values(prev).forEach((result) => {
        result.routes.forEach((route) => {
          route.legs.forEach((leg) => {
            leg.steps.forEach((step) => {
              if (step.path) {
                step.path.length = 0
              }
            })
          })
        })
      })
      return {}
    })
    setSegmentDurations([])
    setTotalDuration('')
  }, [])

  useEffect(() => {
    const initMap = async () => {
      if (!mapContainerRef.current) return

      if (!apiKey) {
        setError('Google Maps APIキーが設定されていません。')
        setIsLoading(false)
        return
      }

      try {
        const loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['places'],
        })
        await loader.load()

        if (!mapContainerRef.current) return

        mapRef.current = new google.maps.Map(mapContainerRef.current, {
          center: DEFAULT_CENTER,
          zoom: 11,
          disableDefaultUI: false,
        })
        setIsLoading(false)
      } catch (loadError) {
        console.error(loadError)
        setError('Google Mapsの読み込みに失敗しました。')
        setIsLoading(false)
      }
    }

    initMap()
  }, [apiKey])

  useEffect(() => {
    if (!mapRef.current) return

    clearMarkers()
    const { current: map } = mapRef

    const createMarker = async (location: Location) => {
      const { Marker } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary
      const marker = new Marker({
        map,
        position: { lat: location.lat, lng: location.lng },
        title: location.name,
        animation: selectedLocation?.id === location.id ? google.maps.Animation.BOUNCE : undefined,
      })

      marker.addListener('click', () => onLocationSelect(location))

      markersRef.current.push(marker)
    }

    const addMarkers = async () => {
      for (const location of locations) {
        await createMarker(location)
      }

      if (locations.length > 0) {
        const bounds = new google.maps.LatLngBounds()
        locations.forEach((location) => bounds.extend({ lat: location.lat, lng: location.lng }))
        map.fitBounds(bounds)
      }
    }

    addMarkers()
  }, [locations, selectedLocation, onLocationSelect, clearMarkers])

  useEffect(() => {
    if (!mapRef.current || routeSegments.length === 0 || !isRouteConfirmed) {
      resetDirections()
      return
    }

    const { current: map } = mapRef

    const fetchDirections = async () => {
      const { DirectionsService, DirectionsRenderer } = await google.maps.importLibrary('routes') as google.maps.RoutesLibrary

      const service = new DirectionsService()

      const results: DirectionsBySegment = {}
      const durations: SegmentDuration[] = []
      let totalSeconds = 0

      for (const segment of routeSegments) {
        const from = locations.find((location) => location.id === segment.fromLocationId)
        const to = locations.find((location) => location.id === segment.toLocationId)

        if (!from || !to) continue

        const request: google.maps.DirectionsRequest = {
          origin: { lat: from.lat, lng: from.lng },
          destination: { lat: to.lat, lng: to.lng },
          travelMode: google.maps.TravelMode[segment.travelMode],
          ...(segment.travelMode === 'TRANSIT'
            ? {
                transitOptions: {
                  modes: [google.maps.TransitMode.TRAIN, google.maps.TransitMode.SUBWAY, google.maps.TransitMode.BUS],
                  routingPreference: google.maps.TransitRoutePreference.FEWER_TRANSFERS,
                },
              }
            : {}),
        }

        try {
          const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
            service.route(request, (response, status) => {
              if (status === google.maps.DirectionsStatus.OK && response) {
                resolve(response)
              } else {
                reject(new Error(status))
              }
            })
          })

          const renderer = new DirectionsRenderer({
            map,
            preserveViewport: true,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor:
                segment.travelMode === 'WALKING' ? '#34a853' :
                segment.travelMode === 'BICYCLING' ? '#fbbc04' :
                segment.travelMode === 'TRANSIT' ? '#9c27b0' : '#0b57d0',
              strokeWeight: 5,
            },
          })
          renderer.setDirections(result)

          const leg = result.routes[0]?.legs[0]
          if (leg?.duration?.value) {
            totalSeconds += leg.duration.value
            durations.push({
              fromLocationId: segment.fromLocationId,
              toLocationId: segment.toLocationId,
              durationText: leg.duration.text ?? `${Math.round(leg.duration.value / 60)}分`,
            })
          }

          results[createSegmentKey(segment)] = result
        } catch (directionError) {
          console.error('Failed to fetch directions:', directionError)
        }
      }

      setDirectionsBySegment(results)
      setSegmentDurations(durations)

      if (totalSeconds > 0) {
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.round((totalSeconds % 3600) / 60)
        setTotalDuration(hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`)
      } else {
        setTotalDuration('')
      }
    }

    fetchDirections()
  }, [isRouteConfirmed, locations, resetDirections, routeSegments])

  return (
    <section className={styles.mapSection}>
      {isRouteConfirmed && (totalDuration || segmentDurations.length > 0) && (
        <div className={styles.routeSummary}>
          <div className={styles.routeSummaryTitle}>ルート情報</div>
          <div className={styles.routeSummaryList}>
            {segmentDurations.map((segment) => {
              const from = locations.find((location) => location.id === segment.fromLocationId)
              const to = locations.find((location) => location.id === segment.toLocationId)
              if (!from || !to) return null

              const routeSegment = routeSegments.find((item) =>
                item.fromLocationId === segment.fromLocationId && item.toLocationId === segment.toLocationId
              )
              const mode = routeSegment?.travelMode ?? 'WALKING'

              const modeLabel = mode === 'WALKING'
                ? '🚶 徒歩'
                : mode === 'DRIVING'
                  ? '🚗 車'
                  : mode === 'TRANSIT'
                    ? '🚃 公共交通機関'
                    : '🚴 自転車'

              return (
                <div key={`${segment.fromLocationId}-${segment.toLocationId}`} className={styles.routeSummaryRow}>
                  <div className={styles.routeSummaryPath}>
                    <span>{from.name}</span>
                    <span className={styles.routeSummaryArrow}>→</span>
                    <span>{to.name}</span>
                  </div>
                  <div className={styles.routeSummaryMode}>{modeLabel}</div>
                  <div className={styles.routeSummaryDuration}>{segment.durationText}</div>
                </div>
              )
            })}
          </div>
          {totalDuration && (
            <div className={styles.routeSummaryTotal}>
              <span className={styles.routeSummaryLabel}>総所要時間</span>
              <span className={styles.routeSummaryValue}>{totalDuration}</span>
            </div>
          )}
        </div>
      )}

      <div className={styles.mapContainer}>
        <div ref={mapContainerRef} className={styles.map} />

        {isLoading && (
          <div className={styles.mapOverlay}>
            <div className={styles.mapOverlayContent}>
              <span className={styles.spinner} />
              <p>Google Mapsを読み込み中...</p>
            </div>
          </div>
        )}

        {error && (
          <div className={styles.mapOverlay}>
            <div className={styles.mapOverlayContent}>
              <p className={styles.errorMessage}>{error}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

GoogleMapSection.displayName = 'GoogleMapSection'

export default GoogleMapSection

