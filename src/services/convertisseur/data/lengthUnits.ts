import { createLinearUnit } from '@/services/convertisseur/data/unitFactories'
import type { UnitCategory } from '@/services/convertisseur/data/unitTypes'

const units = [
  createLinearUnit('kilometer', 'Kilometre', 'km', 'Grandes distances terrestres', 1000),
  createLinearUnit('meter', 'Metre', 'm', 'Unite de reference internationale', 1),
  createLinearUnit('centimeter', 'Centimetre', 'cm', 'Mesures courantes du quotidien', 0.01),
  createLinearUnit('millimeter', 'Millimetre', 'mm', 'Petites longueurs et precisions', 0.001),
  createLinearUnit('micrometer', 'Micrometre', 'µm', 'Microstructures et sciences', 0.000001),
  createLinearUnit('nanometer', 'Nanometre', 'nm', 'Echelles atomiques et optiques', 0.000000001),
  createLinearUnit('mile', 'Mile', 'mi', 'Distance routiere anglo-saxonne', 1609.344),
  createLinearUnit('yard', 'Yard', 'yd', 'Mesure britannique intermediaire', 0.9144),
  createLinearUnit('foot', 'Pied', 'ft', 'Construction et dimensions', 0.3048),
  createLinearUnit('inch', 'Pouce', 'in', 'Ecrans, bricolage et materiaux', 0.0254),
  createLinearUnit('nautical-mile', 'Mille nautique', 'nmi', 'Navigation maritime et aerienne', 1852),
]

export const lengthCategory: UnitCategory = {
  id: 'length',
  icon: '📏',
  name: 'Longueur',
  shortDescription: 'Du nanometre au mille nautique',
  helperText:
    'Choisissez une unite de depart, une unite d arrivee, puis laissez le convertisseur calculer instantanement.',
  baseUnitLabel: 'Toutes les longueurs passent par le metre pour garantir des conversions fiables.',
  units,
  defaultFromUnitId: 'meter',
  defaultToUnitId: 'kilometer',
}
