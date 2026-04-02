import { createLinearUnit } from '@/services/convertisseur/data/unitFactories'
import type { UnitCategory } from '@/services/convertisseur/data/unitTypes'

const units = [
  createLinearUnit('metric-tonne', 'Tonne', 't', 'Tonne metrique du systeme international', 1000),
  createLinearUnit('kilogram', 'Kilogramme', 'kg', 'Unite de reference internationale', 1),
  createLinearUnit('gram', 'Gramme', 'g', 'Mesures alimentaires et courantes', 0.001),
  createLinearUnit('milligram', 'Milligramme', 'mg', 'Dosages et petites quantites', 0.000001),
  createLinearUnit('microgram', 'Microgramme', 'µg', 'Tres faibles masses et analyses fines', 0.000000001),
  createLinearUnit('pound', 'Livre', 'lb', 'Masse courante dans le systeme imperial', 0.45359237),
  createLinearUnit('ounce', 'Once', 'oz', 'Sous-unite de la livre', 0.028349523125),
  createLinearUnit('stone', 'Stone', 'st', 'Unite britannique historique', 6.35029318),
  createLinearUnit('short-ton', 'Tonne US', 'US ton', 'Tonne courte americaine', 907.18474),
  createLinearUnit('long-ton', 'Tonne UK', 'UK ton', 'Tonne longue britannique', 1016.0469088),
]

export const massCategory: UnitCategory = {
  id: 'mass',
  icon: '⚖️',
  name: 'Masse / poids',
  shortDescription: 'Du microgramme aux tonnes US et UK',
  helperText:
    'Les masses sont converties via le kilogramme pour garder des equivalences coherentes entre systemes metrique et imperial.',
  baseUnitLabel: 'Toutes les masses passent par le kilogramme comme unite intermediaire.',
  units,
  defaultFromUnitId: 'kilogram',
  defaultToUnitId: 'pound',
}
