import { createLinearUnit } from '@/services/convertisseur/data/unitFactories'
import type { UnitCategory } from '@/services/convertisseur/data/unitTypes'

const units = [
  createLinearUnit('bit-per-second', 'Bit par seconde', 'bps', 'Debit numerique de reference', 1),
  createLinearUnit('kilobit-per-second', 'Kilobit par seconde', 'Kbps', 'Debit decimal de 1000 bps', 1000),
  createLinearUnit('megabit-per-second', 'Megabit par seconde', 'Mbps', 'Debit decimal de 1 000 000 bps', 1000000),
  createLinearUnit('gigabit-per-second', 'Gigabit par seconde', 'Gbps', 'Debit decimal de 1 000 000 000 bps', 1000000000),
  createLinearUnit('byte-per-second', 'Byte par seconde', 'B/s', 'Equivalent de 8 bps', 8),
  createLinearUnit('kilobyte-per-second', 'Kilobyte par seconde', 'KB/s', 'Debit decimal de 1000 B/s', 8000),
  createLinearUnit('megabyte-per-second', 'Megabyte par seconde', 'MB/s', 'Debit decimal de 1 000 000 B/s', 8000000),
  createLinearUnit('gigabyte-per-second', 'Gigabyte par seconde', 'GB/s', 'Debit decimal de 1 000 000 000 B/s', 8000000000),
  createLinearUnit('terabyte-per-second', 'Terabyte par seconde', 'TB/s', 'Debit decimal de 1 000 000 000 000 B/s', 8000000000000),
]

export const dataRateCategory: UnitCategory = {
  id: 'data-rate',
  icon: '📡',
  name: 'Debit',
  shortDescription: 'Reseau, transferts et vitesses numeriques',
  helperText:
    'Les debits utilisent bps comme unite de base. Les unites en bytes par seconde sont reconverties automatiquement avec la relation 1 B/s = 8 bps.',
  baseUnitLabel: 'Les prefixes K, M, G et T sont interpretes ici en version decimale.',
  units,
  defaultFromUnitId: 'megabit-per-second',
  defaultToUnitId: 'megabyte-per-second',
}
