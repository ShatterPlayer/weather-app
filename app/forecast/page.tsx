import { redirect } from 'next/navigation'

import WeekForecast from '@/app/_components/WeekForecast/WeekForecast'
import WeekSummary from '@/app/_components/WeekSummary/WeekSummary'
import ChangeLocalizationButton from '@/app/_components/ChangeLocalizationButton/ChangeLocalizationButton'

import { numberRegex } from '@/app/_utils/regexes'

import styles from './page.module.css'

export interface ForecastPageProps {
  searchParams: Promise<{
    latitude: string
    longitude: string
  }>
}

export default async function Forecast({ searchParams }: ForecastPageProps) {
  const { latitude, longitude } = await searchParams

  if (
    !latitude ||
    !longitude ||
    !numberRegex.test(latitude) ||
    !numberRegex.test(longitude) ||
    +latitude < -90 ||
    +latitude > 90 ||
    +longitude < -180 ||
    +longitude > 180
  ) {
    redirect('/')
  }

  return (
    <section className={styles.container}>
      <div className={styles.changeLocalizationButton}>
        <ChangeLocalizationButton />
      </div>
      <WeekForecast latitude={+latitude} longitude={+longitude} />
      <WeekSummary latitude={+latitude} longitude={+longitude} />
    </section>
  )
}
