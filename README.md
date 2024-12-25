<img src="./app/favicon.ico" alt="icon" width="200" />

# weather-app

## Opis funkcjonalności

- Aplikacja wyświetla prognozę pogody dla wskazanego miejsca na następne 7 dni wraz z podsumowaniem tygodnia
- Aplikacja posiada tryb jasny i ciemny - jest on ustawiany automatycznie na podstawie ustawień systemowych
- W folderze `__tests__` znajdują się bardzo podstawowe testy jednostkowe komponentów frontendowych
- Aplikacja jest w pełni responsywna

## Dokumentacja API

### `GET` /api/week-forecast

#### Parametry (query parameters)

- `latitude` - szerokość geograficzna miejsca (między -90 a 90)
- `longitude` - długość geograficzna miejsca (między -180 a 180)

#### Odpowiedź

- `200 OK` - zwraca prognozę pogody na najbliższe 7 dni w formacie JSON
- `400 Bad Request` - błędne parametry zapytania
- `500 Internal Server Error` - błąd serwera

#### Przykładowe zapytanie

```bash
curl -X GET "https://weather-app-shatterplayer.vercel.app/api/week-forecast?latitude=51.1&longitude=17.0"
```

#### Przykładowa odpowiedź

```json
{
  "25/12/2024": {
    "weatherCode": 3,
    "temperatureMax": 2.8,
    "temperatureMin": -0.8,
    "estimatedEnergyProduction": 0
  },
  "26/12/2024": {
    "weatherCode": 3,
    "temperatureMax": 1.7,
    "temperatureMin": -1.2,
    "estimatedEnergyProduction": 2.3
  },
  "27/12/2024": {
    "weatherCode": 51,
    "temperatureMax": 2.7,
    "temperatureMin": 0.1,
    "estimatedEnergyProduction": 0
  },
  "28/12/2024": {
    "weatherCode": 3,
    "temperatureMax": 2.9,
    "temperatureMin": 0.9,
    "estimatedEnergyProduction": 0
  },
  "29/12/2024": {
    "weatherCode": 3,
    "temperatureMax": 4.2,
    "temperatureMin": -1.9,
    "estimatedEnergyProduction": 2.97
  },
  "30/12/2024": {
    "weatherCode": 3,
    "temperatureMax": 4.8,
    "temperatureMin": -1.6,
    "estimatedEnergyProduction": 2.79
  },
  "31/12/2024": {
    "weatherCode": 3,
    "temperatureMax": 9,
    "temperatureMin": 2.4,
    "estimatedEnergyProduction": 0
  }
}
```

### `GET` /api/week-summary

#### Parametry (query parameters)

- `latitude` - szerokość geograficzna miejsca (między -90 a 90)
- `longitude` - długość geograficzna miejsca (między -180 a 180)

#### Odpowiedź

- `200 OK` - zwraca prognozę pogody na najbliższe 7 dni w formacie JSON
- `400 Bad Request` - błędne parametry zapytania
- `500 Internal Server Error` - błąd serwera

#### Przykładowe zapytanie

```bash
curl -X GET "https://weather-app-shatterplayer.vercel.app/api/week-summary?latitude=51.1&longitude=17.0"
```

#### Przykładowa odpowiedź

```json
{
  "temperatureMax": 6.2,
  "temperatureMin": -1.3,
  "averagePressure": 1030,
  "averageSunshine": 2.8,
  "precipitationWeek": false
}
```

## Instalacja

Aplikacja wymaga pliku `.env` z adresem URL. W środowisku lokalnym powinien on wyglądać następująco:

```env
URL=http://127.0.0.1:3000
```

Instalacja zależności:

```bash
npm install
```

Uruchomienie serwera deweloperskiego:

```bash
npm run dev
```

Uruchomienie testów:

```bash
npm run test
# lub
npm run test:watch
```

Zbudowanie i uruchomienie aplikacji produkcyjnej:

```bash
npm run build
npm run start
```
