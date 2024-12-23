'use client'

import LoadingButton from '@mui/lab/LoadingButton'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { MapContainer, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import classNames from '@/app/_utils/classNames'

import styles from './PositionPicker.module.css'

interface Props {
  initialLatitude: number
  initialLongitude: number
  isLoading: boolean
  forecast: (latitude: number, longitude: number) => void
  className?: string
}

export default function PositionPicker({
  initialLatitude,
  initialLongitude,
  forecast,
  isLoading,
  className,
}: Props) {
  const [latitude, setLatitude] = useState<number>(initialLatitude)
  const [longitude, setLongitude] = useState<number>(initialLongitude)

  useEffect(() => {
    setLatitude(initialLatitude)
    setLongitude(initialLongitude)
  }, [initialLatitude, initialLongitude])

  const MapEvents = () => {
    useMapEvents({
      click(e: any) {
        if (isLoading) {
          return
        }
        console.log(e.latlng)
        setLatitude(e.latlng.lat)
        setLongitude(e.latlng.lng)
      },
    })

    return null
  }

  const forecastAtSelectedPosition = () => {
    forecast(latitude, longitude)
  }

  return (
    <MapContainer
      className={classNames(styles.container, className)}
      center={[initialLatitude, initialLongitude]}
      zoom={25}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Popup
        position={[latitude, longitude]}
        autoClose={false}
        closeOnClick={false}
        closeButton={false}
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