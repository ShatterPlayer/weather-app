import WeatherIcon from '../WeatherIcon/WeatherIcon'

import styles from './DayForecast.module.css'

interface Props {
  date: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
  estimatedEnergyProduction: number
}

export default function DayForecast({
  date,
  weatherCode,
  temperatureMax,
  temperatureMin,
  estimatedEnergyProduction,
}: Props) {
  return (
    <section className={styles.container}>
      <WeatherIcon className={styles.weatherIcon} code={weatherCode} />
      <p>{date}</p>
      <p>Maksymalna temperatura: {temperatureMax}°C</p>
      <p>Minimalna temperatura: {temperatureMin}°C</p>
      <p>Przewidywana produkcja energii: {estimatedEnergyProduction} kWh</p>
    </section>
  )
}
