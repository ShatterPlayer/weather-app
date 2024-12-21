'use effect'
import WeekForecastResponse from '@/app/_types/WeekForecastResponse'
import DayForecast from '../DayForecast/DayForecast'

import styles from './WeekForecast.module.css'
import { useEffect, useState } from 'react'

interface Props {
  longitude: number
  latitude: number
}
export default function WeekForecast({ longitude, latitude }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [weekForecast, setWeekForecast] = useState<WeekForecastResponse | null>(
    null
  )

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!latitude || !longitude) {
      return
    }

    setIsLoading(true)
    fetch(`/api/week-forecast?latitude=${latitude}&longitude=${longitude}`)
      .then(response => response.json())
      .then(data => {
        setWeekForecast(data)
        setIsLoading(false)
      })
      .catch(error => {
        setError('Błąd podczas pobierania prognozy')
        console.log(error)
        setIsLoading(false)
      })
  }, [latitude, longitude])

  if (error) {
    return <p>{error}</p>
  }

  if (isLoading || !weekForecast) {
    return <p>Pobieranie prognozy</p>
  }

  return (
    <section className={styles.container}>
      {Object.entries(weekForecast).map(([date, forecast]) => (
        <DayForecast
          key={date}
          date={date}
          weatherCode={forecast.weatherCode}
          temperatureMax={forecast.temperatureMax}
          temperatureMin={forecast.temperatureMin}
          estimatedEnergyProduction={forecast.estimatedEnergyProduction}
        />
      ))}
    </section>
  )
}
