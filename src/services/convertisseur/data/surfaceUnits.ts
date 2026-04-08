import { createLinearUnit } from '@/services/convertisseur/data/unitFactories'
import type { UnitCategory } from '@/services/convertisseur/data/unitTypes'

const units = [
  createLinearUnit('square-meter', 'Metre carre', 'm²', 'Unite de reference des surfaces', 1),
  createLinearUnit('square-kilometer', 'Kilometre carre', 'km²', 'Grandes surfaces geographiques', 1000000),
  createLinearUnit('square-centimeter', 'Centimetre carre', 'cm²', 'Petites surfaces du quotidien', 0.0001),
  createLinearUnit('square-millimeter', 'Millimetre carre', 'mm²', 'Mesures tres fines', 0.000001),
  createLinearUnit('hectare', 'Hectare', 'ha', 'Terrains agricoles et parcelles', 10000),
  createLinearUnit('acre', 'Acre', 'ac', 'Surface anglo-saxonne de terrain', 4046.8564224),
  createLinearUnit('square-foot', 'Pied carre', 'ft²', 'Surface imperiale courante', 0.09290304),
  createLinearUnit('square-inch', 'Pouce carre', 'in²', 'Petites surfaces imperiales', 0.00064516),
]

export const surfaceCategory: UnitCategory = {
  id: 'surface',
  icon: '📐',
  name: 'Surface',
  shortDescription: 'Du mm² aux grandes parcelles',
  helperText:
    'Les surfaces sont converties via le metre carre pour garder une logique simple entre mesures metriques et imperiales.',
  baseUnitLabel: 'Toutes les surfaces passent par m² avant la conversion finale.',
  units,
  defaultFromUnitId: 'square-meter',
  defaultToUnitId: 'square-foot',
}
