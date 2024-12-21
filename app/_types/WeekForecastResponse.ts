export default interface WeekForecastResponse {
  [date: string]: {
    weatherCode: number
    temperatureMax: number
    temperatureMin: number
    estimatedEnergyProduction: number
  }
}
