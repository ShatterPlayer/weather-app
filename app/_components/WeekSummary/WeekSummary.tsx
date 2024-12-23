import WeekSummaryResponse from '@/app/_types/WeekSummaryResponse'

import styles from './WeekSummary.module.css'

import Notification from '@/app/_components/Notification/Notification'

export interface WeekSummaryProps {
  latitude: number
  longitude: number
}

export default async function WeekSummary({
  latitude,
  longitude,
}: WeekSummaryProps) {
  try {
    const data = await fetch(
      `${process.env.URL}/api/week-summary?latitude=${latitude}&longitude=${longitude}`
    )

    if (!data.ok) {
      throw new Error('Błąd podczas pobierania podsumowania tygodnia')
    }

    const weekSummary: WeekSummaryResponse = await data.json()

    return (
      <section className={styles.container}>
        <h2 className={styles.title}>
          Podsumowanie tygodnia -{' '}
          {weekSummary.precipitationWeek ? (
            <>tydzień na ogół z opadami</>
          ) : (
            <>tydzień na ogół bez opadów</>
          )}{' '}
        </h2>
        <div className={styles.summary}>
          <div className={styles.summaryStatsGroup}>
            <div className={styles.summaryStat}>
              <p className={styles.summaryStatDesc}>Maksymalna temperatura</p>
              <p>{weekSummary.temperatureMax} °C</p>
            </div>
            <div className={styles.summaryStat}>
              <p className={styles.summaryStatDesc}>Minimalna temperatura</p>
              <p>{weekSummary.temperatureMin} °C</p>
            </div>
          </div>
          <div className={styles.summaryStatsGroup}>
            <div className={styles.summaryStat}>
              <p className={styles.summaryStatDesc}>
                Średnie ciśnienie atmosferyczne
              </p>
              <p>{weekSummary.averagePressure} hPa</p>
            </div>
            <div className={styles.summaryStat}>
              <p className={styles.summaryStatDesc}>
                Średni czas ekspozycji na słońce
              </p>
              <p>{weekSummary.averageSunshine} h</p>
            </div>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    return (
      <Notification
        dismissTime={5000}
        message={'Błąd podczas pobieranie prognozy pogody'}
        severity="error"
      />
    )
  }
}
