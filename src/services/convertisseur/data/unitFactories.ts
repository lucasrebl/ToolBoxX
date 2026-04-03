import type { UnitDefinition } from '@/services/convertisseur/data/unitTypes'

// Cree une unite basee sur un simple coefficient de conversion.
export const createLinearUnit = (
  id: string,
  label: string,
  symbol: string,
  description: string,
  factorToBase: number,
): UnitDefinition => ({
  id,
  label,
  symbol,
  description,
  // Convertit une valeur vers l unite de base.
  toBase: (value) => value * factorToBase,
  // Reconvertit une valeur depuis l unite de base.
  fromBase: (value) => value / factorToBase,
})
