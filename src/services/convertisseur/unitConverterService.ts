import {
  unitCategories,
  type UnitCategory,
  type UnitCategoryId,
  type UnitDefinition,
} from '@/services/convertisseur/unitConverterData'

const MAX_DECIMALS = 12

// Retrouve la categorie demandee dans la liste disponible.
const findCategory = (categoryId: UnitCategoryId): UnitCategory => {
  const category = unitCategories.find((item) => item.id === categoryId)

  if (!category) {
    throw new Error('Categorie de conversion introuvable.')
  }

  return category
}

// Retrouve une unite precise dans une categorie.
const findUnit = (category: UnitCategory, unitId: string): UnitDefinition => {
  const unit = category.units.find((item) => item.id === unitId)

  if (!unit) {
    throw new Error('Unite de conversion introuvable.')
  }

  return unit
}

// Nettoie et valide la valeur saisie par l utilisateur.
const normalizeInput = (input: string): number => {
  const normalized = input.replace(',', '.').trim()

  if (!normalized) {
    throw new Error('Saisissez une valeur a convertir.')
  }

  const parsedValue = Number(normalized)

  if (Number.isNaN(parsedValue)) {
    throw new Error('Entrez un nombre valide.')
  }

  return parsedValue
}

// Formate une valeur numerique pour l affichage.
const formatValue = (value: number): string => {
  if (!Number.isFinite(value)) {
    return ''
  }

  if (value === 0) {
    return '0'
  }

  const absoluteValue = Math.abs(value)

  if (absoluteValue >= 1_000_000_000 || absoluteValue < 0.000001) {
    return value.toExponential(6).replace('e+', 'e')
  }

  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: MAX_DECIMALS,
  }).format(value)
}

export const unitConverterService = {
  // Retourne toutes les categories disponibles.
  getCategories(): UnitCategory[] {
    return unitCategories
  },

  // Retourne une categorie a partir de son identifiant.
  getCategory(categoryId: UnitCategoryId): UnitCategory {
    return findCategory(categoryId)
  },

  // Convertit une valeur numerique d une unite vers une autre.
  convert(categoryId: UnitCategoryId, fromUnitId: string, toUnitId: string, value: number): number {
    const category = findCategory(categoryId)
    const fromUnit = findUnit(category, fromUnitId)
    const toUnit = findUnit(category, toUnitId)
    const baseValue = fromUnit.toBase(value)

    return toUnit.fromBase(baseValue)
  },

  // Convertit une saisie texte en valeur puis lance la conversion.
  convertInput(categoryId: UnitCategoryId, fromUnitId: string, toUnitId: string, input: string): number {
    const value = normalizeInput(input)

    return this.convert(categoryId, fromUnitId, toUnitId, value)
  },

  // Formate le resultat final pour l interface.
  formatValue(value: number): string {
    return formatValue(value)
  },
}
