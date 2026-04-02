import { lengthCategory } from '@/services/convertisseur/data/lengthUnits'
import { massCategory } from '@/services/convertisseur/data/massUnits'
import { temperatureCategory } from '@/services/convertisseur/data/temperatureUnits'

export type {
  UnitCategory,
  UnitCategoryId,
  UnitDefinition,
} from '@/services/convertisseur/data/unitTypes'

export const unitCategories = [lengthCategory, massCategory, temperatureCategory]
