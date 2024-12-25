import WeekForecastResponse from '@/app/_types/WeekForecastResponse'
import DayForecast from '../DayForecast/DayForecast'

import styles from './WeekForecast.module.css'
import Notification from '../Notification/Notification'

export interface WeatherForecastProps {
  longitude: number
  latitude: number
}
export default async function WeekForecast({
  longitude,
  latitude,
}: WeatherForecastProps) {
  try {
    const data = await fetch(
      `${process.env.URL}/api/week-forecast?latitude=${latitude}&longitude=${longitude}`
    )

    if (!data.ok) {
      throw new Error('Błąd podczas pobierania prognozy')
    }

    const weekForecast: WeekForecastResponse = await data.json()

    return (
      <section className={styles.container}>
        {Object.entries(weekForecast).map(([date, forecast]) => (
          <DayForecast
            key={date}
            className={styles.dayForecast}
            date={date}
            weatherCode={forecast.weatherCode}
            temperatureMax={forecast.temperatureMax}
            temperatureMin={forecast.temperatureMin}
            estimatedEnergyProduction={forecast.estimatedEnergyProduction}
          />
        ))}
      </section>
    )
  } catch (error) {
    console.error(error)
    return (
      <Notification
        dismissTime={5000}
        message={'Błąd podczas pobierania prognozy pogody'}
        severity="error"
      />
    )
  }
}
