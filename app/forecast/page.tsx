import { redirect } from 'next/navigation'

import WeekForecast from '@/app/_components/WeekForecast/WeekForecast'
import WeekSummary from '@/app/_components/WeekSummary/WeekSummary'
import ChangeLocalizationButton from '@/app/_components/ChangeLocalizationButton/ChangeLocalizationButton'

import { numberRegex } from '@/app/_utils/regexes'

import styles from './page.module.css'

interface Props {
  searchParams: {
    latitude: string
    longitude: string
  }
}

export default async function Forecast({ searchParams }: Props) {
  const { latitude, longitude } = await searchParams

  if (
    !latitude ||
    !longitude ||
    !numberRegex.test(latitude) ||
    !numberRegex.test(longitude)
  ) {
    console.log(latitude, longitude)
    redirect('/')
  }

  return (
    <div className={styles.verticalCenteringWrapper}>
      <main className={styles.container}>
        <div className={styles.changeLocalizationButton}>
          <ChangeLocalizationButton />
        </div>
        <WeekForecast latitude={+latitude} longitude={+longitude} />
        <WeekSummary latitude={+latitude} longitude={+longitude} />
      </main>
    </div>
  )
}
