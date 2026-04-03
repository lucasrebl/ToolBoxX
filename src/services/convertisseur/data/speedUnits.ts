import { createLinearUnit } from '@/services/convertisseur/data/unitFactories'
import type { UnitCategory } from '@/services/convertisseur/data/unitTypes'

const units = [
  createLinearUnit('meter-per-second', 'Metre par seconde', 'm/s', 'Reference scientifique et technique', 1),
  createLinearUnit('kilometer-per-hour', 'Kilometre par heure', 'km/h', 'Vitesse courante sur route', 1 / 3.6),
  createLinearUnit('mile-per-hour', 'Mile par heure', 'mph', 'Vitesse anglo-saxonne', 0.44704),
  createLinearUnit('knot', 'Noeud', 'kt', 'Navigation maritime et aerienne', 0.5144444444444445),
  createLinearUnit('foot-per-second', 'Pied par seconde', 'ft/s', 'Mesure imperiale technique', 0.3048),
]

export const speedCategory: UnitCategory = {
  id: 'speed',
  icon: '🚗',
  name: 'Vitesse',
  shortDescription: 'Route, navigation et mesures techniques',
  helperText:
    'Les conversions de vitesse utilisent le metre par seconde comme unite de reference pour rester simples et fiables.',
  baseUnitLabel: 'Toutes les vitesses passent par m/s avant d etre reconverties.',
  units,
  defaultFromUnitId: 'kilometer-per-hour',
  defaultToUnitId: 'mile-per-hour',
}
