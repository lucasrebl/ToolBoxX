import { createLinearUnit } from '@/services/convertisseur/data/unitFactories'
import type { UnitCategory } from '@/services/convertisseur/data/unitTypes'

const units = [
  createLinearUnit('liter', 'Litre', 'L', 'Volume metrique courant', 0.001),
  createLinearUnit('milliliter', 'Millilitre', 'mL', 'Sous-unite usuelle du litre', 0.000001),
  createLinearUnit('cubic-meter', 'Metre cube', 'm³', 'Unite volumique de reference', 1),
  createLinearUnit('cubic-centimeter', 'Centimetre cube', 'cm³', 'Petit volume metrique', 0.000001),
  createLinearUnit('gallon-us', 'Gallon US', 'gal US', 'Volume liquide americain', 0.003785411784),
  createLinearUnit('gallon-uk', 'Gallon UK', 'gal UK', 'Volume liquide imperial', 0.00454609),
  createLinearUnit('pint-us', 'Pint US', 'pt', 'Mesure US pour boissons et recettes', 0.000473176473),
  createLinearUnit('quart-us', 'Quart US', 'qt', 'Mesure US intermediaire', 0.000946352946),
  createLinearUnit('cup-us', 'Cup US', 'cup', 'Mesure culinaire americaine', 0.0002365882365),
  createLinearUnit('tablespoon-us', 'Tablespoon US', 'tbsp', 'Cuillere a soupe americaine', 0.00001478676478125),
  createLinearUnit('teaspoon-us', 'Teaspoon US', 'tsp', 'Cuillere a cafe americaine', 0.00000492892159375),
  createLinearUnit('cubic-foot', 'Pied cube', 'ft³', 'Volume imperial technique', 0.028316846592),
  createLinearUnit('cubic-inch', 'Pouce cube', 'in³', 'Petit volume imperial', 0.000016387064),
]

export const volumeCategory: UnitCategory = {
  id: 'volume',
  icon: '📦',
  name: 'Volume',
  shortDescription: 'Liquides, recipents et volumes techniques',
  helperText:
    'Les volumes passent par le metre cube. Pint, quart, cup, tablespoon et teaspoon sont ici interpretes en version US.',
  baseUnitLabel: 'Les equivalences culinaires et imperiales sont calculees a partir de m³.',
  units,
  defaultFromUnitId: 'liter',
  defaultToUnitId: 'gallon-us',
}
