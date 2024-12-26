import type { NextRequest } from 'next/server'

import { numberRegex } from '@/app/_utils/regexes'

export function middleware(request: NextRequest) {
  const longitude = request.nextUrl.searchParams.get('longitude')
  const latitude = request.nextUrl.searchParams.get('latitude')

  if (!longitude || !latitude) {
    return Response.json(
      { error: 'Missing longitude or latitude' },
      { status: 400 }
    )
  }

  if (!numberRegex.test(longitude) || !numberRegex.test(latitude)) {
    return Response.json(
      { error: 'Longitude and latitude must be numbers' },
      { status: 400 }
    )
  }

  if (+longitude < -180 || +longitude > 180) {
    return Response.json(
      { error: 'Longitude must be between -180 and 180' },
      { status: 400 }
    )
  }

  if (+latitude < -90 || +latitude > 90) {
    return Response.json(
      { error: 'Latitude must be between -90 and 90' },
      { status: 400 }
    )
  }
}

export const config = {
  matcher: ['/api/week-forecast', '/api/week-summary'],
}
