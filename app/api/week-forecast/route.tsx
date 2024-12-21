import ExternalAPIForecastResponse from '@/app/_types/external-api/ExternalAPIForecastResponse'
import WeekForecastResponse from '@/app/_types/WeekForecastResponse'
import { NextRequest } from 'next/server'

const installationPowerInKiloWats = 2.5
const efficiencyOfSolarPanels = 0.2

export async function GET(request: NextRequest) {
  try {
    // Dane są walidowane w pliku /middleware.ts
    const longitude = request.nextUrl.searchParams.get('longitude')
    const latitude = request.nextUrl.searchParams.get('latitude')

    const url = new URL('https://api.open-meteo.com/v1/forecast')
    url.searchParams.append('latitude', latitude!)
    url.searchParams.append('longitude', longitude!)
    url.searchParams.append(
      'daily',
      'weather_code,temperature_2m_max,temperature_2m_min,sunshine_duration'
    )
    url.searchParams.append('timezone', 'Europe/Berlin')

    const apiResponse = await fetch(url.toString())
    const apiData: ExternalAPIForecastResponse = await apiResponse.json()

    const { daily } = apiData

    const response: WeekForecastResponse = {}

    const numberOfDays = apiData.daily.time.length

    for (let i = 0; i < numberOfDays; i++) {
      let estimatedEnergyProduction =
        installationPowerInKiloWats *
        // sunshine_duration jest podane w sekundach. Używam właśnie tą wartość ponieważ jest ona mierzona powyżej nasłonecznienia 120 W/m^2. Z informacji, które udało mi się znaleźć wynika że minimum do produkcji prądu to 100-200 W/m^2.
        (daily.sunshine_duration[i] / 3600) *
        efficiencyOfSolarPanels

      // Zaokrąglam do dwóch miejsc po przecinku
      estimatedEnergyProduction =
        Math.round(estimatedEnergyProduction * 100) / 100

      const time = new Date(daily.time[i])

      const timeFormatted = `${time.getDate()}/${
        time.getMonth() + 1
      }/${time.getFullYear()}`

      response[timeFormatted] = {
        weatherCode: daily.weather_code[i],
        temperatureMax: daily.temperature_2m_max[i],
        temperatureMin: daily.temperature_2m_min[i],
        estimatedEnergyProduction,
      }
    }

    return Response.json(response)
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'Błąd wewnętrzny serwera' }, { status: 500 })
  }
}
