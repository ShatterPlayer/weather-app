'use client'
import LoadingButton from '@mui/lab/LoadingButton'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import 'leaflet/dist/leaflet.css'
import classNames from '@/app/_utils/classNames'

import { MapContainer, Popup, TileLayer, useMapEvents } from 'react-leaflet'

import styles from './PositionPicker.module.css'
import { useWorldMapState } from '@/app/_state/WorldMapState'

export interface PositionPickerProps {
  isLoading: boolean
  forecast: (latitude: number, longitude: number) => void
  className?: string
}

export default function PositionPicker({
  forecast,
  isLoading,
  className,
}: PositionPickerProps) {
  // Stan mapy musi być zapisywany poza tym komponentem by móc przywracać położenie znacznika i przybliżenie po powrocie z widoku prognozy pogody
  const {
    markerLatitude,
    markerLongitude,
    zoom,
    setZoom,
    setMarkerCoordinates,
  } = useWorldMapState()

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (isLoading) {
          return
        }
        setMarkerCoordinates(e.latlng.lat, e.latlng.lng)
      },

      zoomend(e) {
        setZoom(e.target.getZoom())
      },
    })

    return null
  }

  const forecastAtSelectedPosition = () => {
    forecast(markerLatitude, markerLongitude)
  }

  return (
    <MapContainer
      className={classNames(styles.container, className)}
      center={[markerLatitude, markerLongitude]}
      zoom={zoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Popup
        position={[markerLatitude, markerLongitude]}
        autoClose={false}
        closeOnClick={false}
        closeButton={false}
        autoPan={false}
      >
        <LoadingButton
          loading={isLoading}
          loadingPosition="start"
          startIcon={<LocationOnIcon />}
          onClick={forecastAtSelectedPosition}
          variant="text"
          color="primary"
        >
          Użyj tej lokalizacji
        </LoadingButton>
      </Popup>
      <MapEvents />
    </MapContainer>
  )
}
