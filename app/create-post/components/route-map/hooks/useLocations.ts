'use client'

import { useEffect, useState } from 'react'
import type { Location, RouteSegment, TravelMode } from '../types'

const STORAGE_PREFIX = 'createPost-'

const STORAGE_KEYS = {
  locations: `${STORAGE_PREFIX}visitedLocations`,
  segments: `${STORAGE_PREFIX}routeSegments`,
  confirmed: `${STORAGE_PREFIX}isRouteConfirmed`,
} as const

const DEFAULT_TRAVEL_MODE: TravelMode = 'WALKING'

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [routeSegments, setRouteSegments] = useState<RouteSegment[]>([])
  const [isRouteConfirmed, setIsRouteConfirmed] = useState(false)

  useEffect(() => {
    try {
      const storedLocations = localStorage.getItem(STORAGE_KEYS.locations)
      if (storedLocations) {
        const parsedLocations = JSON.parse(storedLocations) as Location[]
        setLocations(parsedLocations)
      }
      localStorage.removeItem(STORAGE_KEYS.segments)
      localStorage.setItem(STORAGE_KEYS.confirmed, 'false')
    } catch (error) {
      console.error('Failed to load stored locations:', error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.locations, JSON.stringify(locations))
    } catch (error) {
      console.error('Failed to persist locations:', error)
    }
  }, [locations])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.segments, JSON.stringify(routeSegments))
      localStorage.setItem(STORAGE_KEYS.confirmed, isRouteConfirmed ? 'true' : 'false')
    } catch (error) {
      console.error('Failed to persist route data:', error)
    }
  }, [routeSegments, isRouteConfirmed])

  const addLocation = (location: Omit<Location, 'id'>) => {
    const newLocation: Location = {
      ...location,
      id: crypto.randomUUID(),
    }

    setLocations((prev) => [...prev, newLocation])
    setSelectedLocation(newLocation)
    resetRouteState()
  }

  const deleteLocation = (id: string) => {
    setLocations((prev) => prev.filter((location) => location.id !== id))
    if (selectedLocation?.id === id) {
      setSelectedLocation(null)
    }
    setRouteSegments((prev) => prev.filter((segment) => segment.fromLocationId !== id && segment.toLocationId !== id))
    resetRouteState(false)
  }

  const reorderLocations = (fromIndex: number, toIndex: number) => {
    setLocations((prev) => {
      const updated = [...prev]
      const [moved] = updated.splice(fromIndex, 1)
      updated.splice(toIndex, 0, moved)
      return updated
    })
    resetRouteState()
  }

  const confirmRoute = () => {
    if (locations.length < 2) return

    const newSegments: RouteSegment[] = []
    for (let i = 0; i < locations.length - 1; i += 1) {
      newSegments.push({
        fromLocationId: locations[i]!.id,
        toLocationId: locations[i + 1]!.id,
        travelMode: DEFAULT_TRAVEL_MODE,
      })
    }

    setRouteSegments(newSegments)
    setIsRouteConfirmed(true)
  }

  const updateRouteSegment = (fromLocationId: string, toLocationId: string, travelMode: TravelMode) => {
    setRouteSegments((prev) => prev.map((segment) => {
      if (segment.fromLocationId === fromLocationId && segment.toLocationId === toLocationId) {
        return { ...segment, travelMode }
      }
      return segment
    }))
  }

  const resetRouteState = (resetSegments = true) => {
    setIsRouteConfirmed(false)
    if (resetSegments) {
      setRouteSegments([])
    }
  }

  return {
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
    setRouteSegments,
    setIsRouteConfirmed,
  }
}

