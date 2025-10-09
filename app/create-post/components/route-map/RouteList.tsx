'use client'

import { useState } from 'react'
import type { Location, RouteSegment, TravelMode } from './types'
import styles from '../../create-post.module.css'

interface RouteListProps {
  locations: Location[]
  selectedLocation: Location | null
  onLocationSelect: (location: Location | null) => void
  onDeleteLocation: (id: string) => void
  onReorderLocations: (fromIndex: number, toIndex: number) => void
  onConfirmRoute: () => void
  isRouteConfirmed: boolean
  routeSegments: RouteSegment[]
  onUpdateRouteSegment: (fromLocationId: string, toLocationId: string, travelMode: TravelMode) => void
}

const travelModeLabel: Record<TravelMode, string> = {
  WALKING: '徒歩',
  DRIVING: '車',
  TRANSIT: '公共交通機関',
  BICYCLING: '自転車',
}

export default function RouteList({
  locations,
  selectedLocation,
  onLocationSelect,
  onDeleteLocation,
  onReorderLocations,
  onConfirmRoute,
  isRouteConfirmed,
  routeSegments,
  onUpdateRouteSegment,
}: RouteListProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index)
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorderLocations(draggedIndex, index)
    }
    setDraggedIndex(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  if (locations.length === 0) {
    return (
      <div className={styles.routeListEmpty}>
        <div className={styles.routeListEmptyIcon}>📍</div>
        <p>まだ訪問した場所がありません</p>
        <span>左側のフォームから場所を追加してください</span>
      </div>
    )
  }

  return (
    <div className={styles.routeListWrapper}>
      {locations.length >= 2 && !isRouteConfirmed && (
        <div className={styles.routeConfirmBox}>
          <p>場所の順番を決めたら、ルートを確定してください</p>
          <button type="button" className={styles.routeConfirmButton} onClick={onConfirmRoute}>
            ルート決定
          </button>
        </div>
      )}

      {isRouteConfirmed && routeSegments.length > 0 && (
        <div className={styles.travelModeBox}>
          <div className={styles.travelModeTitle}>移動手段を設定</div>
          <div className={styles.travelModeList}>
            {routeSegments.map((segment) => {
              const from = locations.find((location) => location.id === segment.fromLocationId)
              const to = locations.find((location) => location.id === segment.toLocationId)
              if (!from || !to) return null

              return (
                <div key={`${segment.fromLocationId}-${segment.toLocationId}`} className={styles.travelModeItem}>
                  <span className={styles.travelModePath}>
                    {from.name} → {to.name}
                  </span>
                  <select
                    value={segment.travelMode}
                    onChange={(event) => onUpdateRouteSegment(segment.fromLocationId, segment.toLocationId, event.target.value as TravelMode)}
                    className={styles.travelModeSelect}
                  >
                    {(['WALKING', 'DRIVING', 'TRANSIT', 'BICYCLING'] as TravelMode[]).map((mode) => (
                      <option key={mode} value={mode}>
                        {travelModeLabel[mode]}
                      </option>
                    ))}
                  </select>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className={styles.routeList}>
        {locations.map((location, index) => (
          <div
            key={location.id}
            className={`${styles.routeListItem} ${selectedLocation?.id === location.id ? styles.routeListItemActive : ''}`}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, index)}
            onClick={() => onLocationSelect(location)}
          >
            <div className={styles.routeListItemHeader}>
              <span className={styles.routeListIndex}>{index + 1}</span>
              <span className={styles.routeListTitle}>{location.name}</span>
              <button type="button" className={styles.routeListDelete} onClick={(event) => { event.stopPropagation(); onDeleteLocation(location.id) }}>
                削除
              </button>
            </div>
            <p className={styles.routeListAddress}>{location.address}</p>
            <div className={styles.routeListMeta}>
              <span>訪問日: {formatDate(location.visitedDate)}</span>
              <span>座標: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

