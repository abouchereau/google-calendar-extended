export const Config = {
  NAME: 'Dates Saugrenue',
  VERSION: '1.1.0',
  BASE_API: location.hostname=="localhost"?"http://localhost:3615/api":"https://cal.lasaugrenue.fr/api",
  FIRST_YEAR: 2010,
  LAST_YEAR: new Date().getFullYear()+1   
} as const;