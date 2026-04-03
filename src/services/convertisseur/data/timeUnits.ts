import { createLinearUnit } from '@/services/convertisseur/data/unitFactories'
import type { UnitCategory } from '@/services/convertisseur/data/unitTypes'

const SECOND = 1
const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const YEAR = 365.2425 * DAY
const MONTH = YEAR / 12
const DECADE = 10 * YEAR
const CENTURY = 100 * YEAR

const units = [
  createLinearUnit('nanosecond', 'Nanoseconde', 'ns', 'Mesures ultra rapides et calculs fins', 0.000000001),
  createLinearUnit('microsecond', 'Microseconde', 'µs', 'Traitements courts et signaux', 0.000001),
  createLinearUnit('millisecond', 'Milliseconde', 'ms', 'Performances et latences', 0.001),
  createLinearUnit('second', 'Seconde', 's', 'Unite de reference du temps', SECOND),
  createLinearUnit('minute', 'Minute', 'min', 'Duree courte du quotidien', MINUTE),
  createLinearUnit('hour', 'Heure', 'h', 'Organisation et planification', HOUR),
  createLinearUnit('day', 'Jour', 'd', 'Periode de 24 heures', DAY),
  createLinearUnit('week', 'Semaine', 'wk', 'Periode standard de 7 jours', WEEK),
  createLinearUnit('month', 'Mois', 'mo', 'Valeur moyenne basee sur l annee civile', MONTH),
  createLinearUnit('year', 'Annee', 'yr', 'Valeur moyenne de l annee civile', YEAR),
  createLinearUnit('decade', 'Decennie', 'dec', 'Periode moyenne de dix annees', DECADE),
  createLinearUnit('century', 'Siecle', 'c', 'Periode moyenne de cent annees', CENTURY),
]

export const timeCategory: UnitCategory = {
  id: 'time',
  icon: '⏱️',
  name: 'Temps',
  shortDescription: 'Des nanosecondes aux siecles',
  helperText:
    'Les conversions temporelles utilisent la seconde comme base. Les mois, annees, decennies et siecles sont calcules sur des durees moyennes.',
  baseUnitLabel: 'Les unites calendaires longues reposent ici sur des moyennes, pas sur un calendrier reel.',
  units,
  defaultFromUnitId: 'hour',
  defaultToUnitId: 'minute',
}
