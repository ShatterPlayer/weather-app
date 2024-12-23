'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingButton from '@mui/lab/LoadingButton'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import Notification from '@/app/_components/Notification/Notification'

import styles from './page.module.css'

import PositionPicker from './_components/PositionPicker/PositionPicker'
import { ThemeProvider } from '@emotion/react'
import theme from '@/app/_utils/theme'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [markerLocalization, setMarkerLocalization] = useState({
    latitude: 50.06459463327754,
    longitude: 19.92328763008118,
  })
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const redirectToForecast = (latitude: number, longitude: number) => {
    router.push(`/forecast?latitude=${latitude}&longitude=${longitude}`)
  }

  const forecastAtCurrentPosition = () => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      position => {
        redirectToForecast(position.coords.latitude, position.coords.longitude)
      },
      error => {
        setIsLoading(false)
        setError('Błąd podczas pobierania lokalizacji')
      }
    )
  }

  const forecastAtSelectedPosition = (latitude: number, longitude: number) => {
    setIsLoading(true)
    redirectToForecast(latitude, longitude)
  }

  return (
    <ThemeProvider theme={theme}>
      <section>
        <LoadingButton
          className={styles.currentPositionButton}
          loading={isLoading}
          loadingPosition="start"
          startIcon={<GpsFixedIcon />}
          onClick={forecastAtCurrentPosition}
          variant="contained"
          color="primary"
          disabled={error !== null}
        >
          {error ? error : <>Użyj aktualnej lokalizacji urządzenia</>}
        </LoadingButton>
        <PositionPicker
          className={styles.positionPicker}
          initialLatitude={50.06459463327754}
          initialLongitude={19.92328763008118}
          forecast={forecastAtSelectedPosition}
          isLoading={isLoading}
        />
        {error && (
          <Notification dismissTime={5000} message={error} severity="error" />
        )}
      </section>
    </ThemeProvider>
  )
}
