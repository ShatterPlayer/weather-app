import { create } from 'zustand'

interface WorldMapState {
  markerLatitude: number
  markerLongitude: number
  zoom: number
  setMarkerCoordinates: (latitude: number, longitude: number) => void
  setZoom: (zoom: number) => void
}

export const useWorldMapState = create<WorldMapState>(set => ({
  markerLatitude: 50.064598076823806,
  markerLongitude: 19.923244714736942,
  zoom: 15,
  setMarkerCoordinates: (latitude: number, longitude: number) =>
    set(() => ({ markerLatitude: latitude, markerLongitude: longitude })),
  setZoom: (zoom: number) => set(() => ({ zoom })),
}))
