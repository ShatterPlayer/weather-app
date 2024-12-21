import ExternalAPISummaryResponse from '@/app/_types/external-api/ExternalAPISummaryResponse'
import WeekSummaryResponse from '@/app/_types/WeekSummaryResponse'
import { NextRequest } from 'next/server'

function average(array: number[]): number {
  return array.reduce((acc, value) => acc + value, 0) / array.length
}

function wasPrecipitationWeek(weatherCodes: number[]): boolean {
  // Kody powyżej 48 oznaczają jakiś rodzaj opadów. Mgła to 45 i 48 - nie liczymy tego jako opadów.
  return weatherCodes.filter(code => code > 48).length >= 4
}

export async function GET(request: NextRequest) {
  try {
    // Dane są walidowane w pliku /middleware.ts
    const longitude = request.nextUrl.searchParams.get('longitude')
    const latitude = request.nextUrl.searchParams.get('latitude')

    const url = new URL('https://api.open-meteo.com/v1/forecast')
    url.searchParams.append('latitude', latitude!)
    url.searchParams.append('longitude', longitude!)
    url.searchParams.append('hourly', 'pressure_msl')
    url.searchParams.append(
      'daily',
      'weather_code,temperature_2m_max,temperature_2m_min,sunshine_duration'
    )
    url.searchParams.append('timezone', 'Europe/Berlin')
    url.searchParams.append('forecast_days', '7')

    const apiResponse = await fetch(url.toString())
    const apiData: ExternalAPISummaryResponse = await apiResponse.json()

    const { daily } = apiData
    const { hourly } = apiData

    let averagePressure = average(hourly.pressure_msl)

    // Zaokrąglenie do liczby całkowitej
    averagePressure = Math.round(averagePressure)

    let averageSunshine = average(daily.sunshine_duration)

    // Zamiana sekund na godziny
    averageSunshine = averageSunshine / 3600

    // Zaokrąglenie do jednego miejsca po przecinku
    averageSunshine = Math.round(averageSunshine * 10) / 10

    const response: WeekSummaryResponse = {
      temperatureMax: Math.max(...daily.temperature_2m_max),
      temperatureMin: Math.min(...daily.temperature_2m_min),
      averagePressure,
      averageSunshine,
      precipitationWeek: wasPrecipitationWeek(daily.weather_code),
    }

    return Response.json(response)
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Błąd wewnętrzny serwera' }, { status: 500 })
  }
}
