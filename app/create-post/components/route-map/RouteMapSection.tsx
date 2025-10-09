'use client'

import GoogleMapSection from './GoogleMapSection'
import LocationForm from './LocationForm'
import RouteList from './RouteList'
import { useLocations } from './hooks/useLocations'
import styles from '../../create-post.module.css'

export default function RouteMapSection() {
  const {
    locations,
    selectedLocation,
    setSelectedLocation,
    addLocation,
    deleteLocation,
    reorderLocations,
    routeSegments,
    confirmRoute,
    isRouteConfirmed,
    updateRouteSegment,
  } = useLocations()

  return (
    <section className={styles.routeSection}>
      <div className={styles.routeSectionHeader}>
        <h2 className={styles.routeSectionTitle}>ルートマップを作成する</h2>
        <p className={styles.routeSectionSubtitle}>
          行った場所を登録し、移動手段を設定して自分だけのルートを作りましょう。
        </p>
      </div>

      <div className={styles.routeSectionContent}>
        <div className={styles.routeMainColumn}>
          <div className={styles.routeCard}>
            <div className={styles.routeCardHeader}>マップ</div>
            <GoogleMapSection
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation}
              routeSegments={routeSegments}
              isRouteConfirmed={isRouteConfirmed}
            />
          </div>

          <div className={styles.routeCard}>
            <div className={styles.routeCardHeader}>新しい場所を追加</div>
            <LocationForm onAddLocation={addLocation} />
          </div>
        </div>

        <aside className={styles.routeSideColumn}>
          <div className={styles.routeCard}>
            <div className={styles.routeCardHeader}>訪問履歴 ({locations.length}件)</div>
            <RouteList
              locations={locations}
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation}
              onDeleteLocation={deleteLocation}
              onReorderLocations={reorderLocations}
              onConfirmRoute={confirmRoute}
              isRouteConfirmed={isRouteConfirmed}
              routeSegments={routeSegments}
              onUpdateRouteSegment={updateRouteSegment}
            />
          </div>
        </aside>
      </div>
    </section>
  )
}

