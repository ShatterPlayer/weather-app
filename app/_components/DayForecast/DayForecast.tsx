import WeatherIcon from '../WeatherIcon/WeatherIcon'
import classNames from '@/app/_utils/classNames'

import styles from './DayForecast.module.css'

export interface DayForecastProps {
  date: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
  estimatedEnergyProduction: number
  className?: string
}

export default function DayForecast({
  date,
  weatherCode,
  temperatureMax,
  temperatureMin,
  estimatedEnergyProduction,
  className,
}: DayForecastProps) {
  return (
    <section className={classNames(styles.container, className)}>
      <WeatherIcon className={styles.weatherIcon} code={weatherCode} />
      <h2 className={styles.date}>{date}</h2>
      <p className={styles.statDescription}>Maksymalna temperatura</p>
      <p>{temperatureMax} °C</p>
      <p className={styles.statDescription}>Minimalna temperatura</p>
      <p>{temperatureMin} °C</p>
      <p className={styles.statDescription}>Przewidywana produkcja energii</p>
      <p>{estimatedEnergyProduction} kWh</p>
    </section>
  )
}
