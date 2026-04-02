import type { UnitCategory } from '@/services/convertisseur/data/unitTypes'

const units = [
  {
    id: 'celsius',
    label: 'Celsius',
    symbol: '°C',
    description: 'Temperature usuelle dans de nombreux pays',
    // Renvoie la valeur telle quelle vers la base Celsius.
    toBase: (value: number) => value,
    // Renvoie la valeur telle quelle depuis la base Celsius.
    fromBase: (value: number) => value,
  },
  {
    id: 'fahrenheit',
    label: 'Fahrenheit',
    symbol: '°F',
    description: 'Temperature courante aux Etats-Unis',
    // Convertit Fahrenheit vers Celsius.
    toBase: (value: number) => ((value - 32) * 5) / 9,
    // Convertit Celsius vers Fahrenheit.
    fromBase: (value: number) => (value * 9) / 5 + 32,
  },
  {
    id: 'kelvin',
    label: 'Kelvin',
    symbol: 'K',
    description: 'Reference scientifique absolue',
    // Convertit Kelvin vers Celsius.
    toBase: (value: number) => value - 273.15,
    // Convertit Celsius vers Kelvin.
    fromBase: (value: number) => value + 273.15,
  },
  {
    id: 'rankine',
    label: 'Rankine',
    symbol: 'R',
    description: 'Echelle absolue basee sur Fahrenheit',
    // Convertit Rankine vers Celsius.
    toBase: (value: number) => ((value - 491.67) * 5) / 9,
    // Convertit Celsius vers Rankine.
    fromBase: (value: number) => ((value + 273.15) * 9) / 5,
  },
]

export const temperatureCategory: UnitCategory = {
  id: 'temperature',
  icon: '🌡️',
  name: 'Temperature',
  shortDescription: 'Usage quotidien, scientifique et technique',
  helperText:
    'Les conversions thermiques utilisent des formules dediees pour respecter les decalages entre echelles.',
  baseUnitLabel: 'Les calculs s appuient sur Celsius comme reference intermediaire.',
  units,
  defaultFromUnitId: 'celsius',
  defaultToUnitId: 'fahrenheit',
}
