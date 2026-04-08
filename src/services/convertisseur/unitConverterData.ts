import { dataRateCategory } from '@/services/convertisseur/data/dataRateUnits'
import { lengthCategory } from '@/services/convertisseur/data/lengthUnits'
import { massCategory } from '@/services/convertisseur/data/massUnits'
import { speedCategory } from '@/services/convertisseur/data/speedUnits'
import { storageCategory } from '@/services/convertisseur/data/storageUnits'
import { surfaceCategory } from '@/services/convertisseur/data/surfaceUnits'
import { temperatureCategory } from '@/services/convertisseur/data/temperatureUnits'
import { timeCategory } from '@/services/convertisseur/data/timeUnits'
import { volumeCategory } from '@/services/convertisseur/data/volumeUnits'

export type {
  UnitCategory,
  UnitCategoryId,
  UnitDefinition,
} from '@/services/convertisseur/data/unitTypes'

export const unitCategories = [
  lengthCategory,
  massCategory,
  volumeCategory,
  surfaceCategory,
  temperatureCategory,
  timeCategory,
  speedCategory,
  storageCategory,
  dataRateCategory,
]
