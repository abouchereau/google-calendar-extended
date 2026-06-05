export const Config = {
  NAME: 'Dates Saugrenue',
  VERSION: '1.1.0',
  BASE_API: location.hostname=="localhost"?"http://localhost:3615/api":"https://cal.lasaugrenue.fr/api"
} as const;