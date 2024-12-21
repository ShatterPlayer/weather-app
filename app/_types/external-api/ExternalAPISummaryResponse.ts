export default interface ExternalAPISummaryResponse {
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    sunshine_duration: number[]
  }
  hourly: {
    pressure_msl: number[]
  }
}
