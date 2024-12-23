import Image, { StaticImageData } from 'next/image'

import sunnyIcon from '@/app/_assets/weather-icons/sunny.png'
import partiallyCloudyIcon from '@/app/_assets/weather-icons/partially-cloudy.png'
import cloudy from '@/app/_assets/weather-icons/cloudy.png'
import fog from '@/app/_assets/weather-icons/fog.png'
import drizzle from '@/app/_assets/weather-icons/drizzle.png'
import rain from '@/app/_assets/weather-icons/rain.png'
import snow from '@/app/_assets/weather-icons/snow.png'
import thunderstorm from '@/app/_assets/weather-icons/thunderstorm.png'
import unknownIcon from '@/app/_assets/weather-icons/unknown.png'

import classNames from '@/app/_utils/classNames'
import styles from './WeatherIcon.module.css'

export interface WeatherIconProps {
  code: number
  className?: string
}

const codesToIcons: {
  [key: number]: StaticImageData
} = {
  0: sunnyIcon,
  1: sunnyIcon,
  2: partiallyCloudyIcon,
  3: cloudy,
  45: fog,
  48: fog,
  51: drizzle,
  53: drizzle,
  55: drizzle,
  56: drizzle,
  57: drizzle,
  61: rain,
  63: rain,
  65: rain,
  66: rain,
  67: rain,
  71: snow,
  73: snow,
  75: snow,
  77: snow,
  80: rain,
  81: rain,
  82: rain,
  85: snow,
  86: snow,
  95: thunderstorm,
  96: thunderstorm,
  99: thunderstorm,
}

export default function WeatherIcon({ code, className }: WeatherIconProps) {
  const icon = codesToIcons[code] || unknownIcon
  return (
    <Image
      className={classNames(styles.image, className)}
      src={icon}
      alt="Weather icon"
    />
  )
}
