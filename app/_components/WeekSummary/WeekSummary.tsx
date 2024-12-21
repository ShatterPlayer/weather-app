import WeekSummaryResponse from '@/app/_types/WeekSummaryResponse'
import { useEffect, useState } from 'react'

interface Props {
  latitude: number
  longitude: number
}

export default function WeekSummary({ latitude, longitude }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [weekSummary, setWeekSummary] = useState<WeekSummaryResponse | null>()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!latitude || !longitude) {
      return
    }

    setIsLoading(true)
    fetch(`/api/week-summary?latitude=${latitude}&longitude=${longitude}`)
      .then(response => response.json())
      .then(data => {
        setWeekSummary(data)
        setIsLoading(false)
      })
      .catch(() => {
        setError('Błąd podczas pobierania podsumowania tygodnia')
        setIsLoading(false)
      })
  }, [latitude, longitude])

  if (error) {
    return <p>{error}</p>
  }

  if (isLoading || !weekSummary) {
    return <p>Pobieranie podsumowania tygodnia</p>
  }

  return (
    <section>
      <h2>Podsumowanie tygodnia</h2>
      <p>Maksymalna temperatura: {weekSummary.temperatureMax}°C</p>
      <p>Minimalna temperatura: {weekSummary.temperatureMin}°C</p>
      <p>Średnie ciśnienie atmosferyczne: {weekSummary.averagePressure}hPa</p>
      <p>Średni czas ekspozycji na słońce: {weekSummary.averageSunshine}h</p>
      {weekSummary.precipitationWeek ? (
        <p>Tydzień na ogół z opadami</p>
      ) : (
        <p>Tydzień na ogół bez opadów</p>
      )}
    </section>
  )
}
