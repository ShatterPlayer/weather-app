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
        /* 
        Szczerze powiedziawszy nie jestem pewien czy tutaj należy użyć daylight_duration czy sunshine_duration.

        W dokumentacji open-meteo na temat sunshine_duration możemy przeczytać: "The number of seconds of sunshine per day is 
        determined by calculating direct normalized irradiance exceeding 120 W/m², following the WMO definition. Sunshine duration
        will consistently be less than daylight duration due to dawn and dusk."

        Na pierwszy rzut oka wydaje się, że powinno być użyte sunshine_duration, ale wtedy nienaturalnie dużo dni ma produkcję energii równą 0, co nie jest prawdą.

        Zostawiłem sunshine_duration z racji, że wtedy statystyki takie jak średni czas ekspozycji na słońce mają większy sens. daylight_duration nie zmienia się zbyt dużo
        w ciągu tygodnia.
        */
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
