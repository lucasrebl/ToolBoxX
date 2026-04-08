import { createLinearUnit } from '@/services/convertisseur/data/unitFactories'
import type { UnitCategory } from '@/services/convertisseur/data/unitTypes'

const units = [
  createLinearUnit('bit', 'Bit', 'b', 'Plus petite unite d information', 1 / 8),
  createLinearUnit('byte', 'Byte', 'B', 'Unite de reference du stockage', 1),
  createLinearUnit('kilobyte', 'Kilobyte', 'KB', 'Unite decimale de 1000 bytes', 1000),
  createLinearUnit('megabyte', 'Megabyte', 'MB', 'Unite decimale de 1 000 000 bytes', 1000000),
  createLinearUnit('gigabyte', 'Gigabyte', 'GB', 'Unite decimale de 1 000 000 000 bytes', 1000000000),
  createLinearUnit('terabyte', 'Terabyte', 'TB', 'Unite decimale de 1 000 000 000 000 bytes', 1000000000000),
  createLinearUnit('kibibyte', 'Kibibyte', 'KiB', 'Unite binaire de 1024 bytes', 1024),
  createLinearUnit('mebibyte', 'Mebibyte', 'MiB', 'Unite binaire de 1024 KiB', 1048576),
  createLinearUnit('gibibyte', 'Gibibyte', 'GiB', 'Unite binaire de 1024 MiB', 1073741824),
]

export const storageCategory: UnitCategory = {
  id: 'storage',
  icon: '💾',
  name: 'Stockage',
  shortDescription: 'Bits, bytes, decimal et binaire',
  helperText:
    'Les conversions de stockage utilisent le byte comme reference, ce qui permet de passer facilement entre bits, unites decimales et unites binaires.',
  baseUnitLabel: 'Les unites KB, MB, GB et TB sont decimales. KiB, MiB et GiB sont binaires.',
  units,
  defaultFromUnitId: 'gigabyte',
  defaultToUnitId: 'gibibyte',
}
