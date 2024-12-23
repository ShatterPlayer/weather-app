import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import DayForecast, {
  DayForecastProps,
} from '@/app/_components/DayForecast/DayForecast'

const forecast: DayForecastProps = {
  date: '2021-08-01',
  temperatureMax: 30,
  temperatureMin: 20,
  weatherCode: 0,
  estimatedEnergyProduction: 123,
}

describe('DayForecast', () => {
  it('renders all the information', () => {
    render(<DayForecast {...forecast} />)

    expect(screen.getByText(forecast.date)).toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(`^${forecast.temperatureMax} ?(°C)?$`))
    ).toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(`^${forecast.temperatureMin} ?(°C)?$`))
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        new RegExp(`^${forecast.estimatedEnergyProduction} ?(kWh)?$`)
      )
    ).toBeInTheDocument()
  })
})
