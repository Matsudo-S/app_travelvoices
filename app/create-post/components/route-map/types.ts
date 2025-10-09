'use client'

export interface Location {
  id: string
  name: string
  lat: number
  lng: number
  address: string
  visitedDate: string
  description?: string
  isTransitStation?: boolean
}

export type TravelMode = 'WALKING' | 'DRIVING' | 'TRANSIT' | 'BICYCLING'

export interface RouteSegment {
  fromLocationId: string
  toLocationId: string
  travelMode: TravelMode
}

export interface SegmentDuration {
  fromLocationId: string
  toLocationId: string
  durationText: string
}

