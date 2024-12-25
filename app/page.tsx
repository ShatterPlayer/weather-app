'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import LoadingButton from '@mui/lab/LoadingButton'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import Notification from '@/app/_components/Notification/Notification'

import styles from './page.module.css'

// Musimy importować mapę dynamicznie bez ssr, ponieważ w momencie budowania aplikacji nie ma dostępu do obiektu window
const PositionPicker = dynamic(
  () => import('@/app/_components/PositionPicker/PositionPicker'),
  { ssr: false }
)
import { ThemeProvider } from '@emotion/react'
import theme from '@/app/_utils/theme'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
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
      () => {
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
