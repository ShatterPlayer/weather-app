'use client'
import { useEffect, useState } from 'react'
import DayForecast from './_components/DayForecast/DayForecast'
import WeekForecastResponse from './_types/WeekForecastResponse'
import WeekForecast from './_components/WeekForecast/WeekForecast'
import WeekSummary from './_components/WeekSummary/WeekSummary'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      position => {
        setIsLoading(false)
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        console.log(position)
      },
      error => {
        setIsLoading(false)
        setError('Błąd podczas pobierania lokalizacji')
      }
    )
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  if (isLoading || !latitude || !longitude) {
    return <p>Pobieranie pozycji geograficznej</p>
  }

  return (
    <section>
      <WeekForecast latitude={latitude} longitude={longitude} />
      <WeekSummary latitude={latitude} longitude={longitude} />
    </section>
  )
}
