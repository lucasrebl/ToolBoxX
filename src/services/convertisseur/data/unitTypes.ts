export type UnitCategoryId =
  | 'length'
  | 'mass'
  | 'volume'
  | 'surface'
  | 'temperature'
  | 'time'
  | 'speed'

export type UnitDefinition = {
  id: string
  label: string
  symbol: string
  description: string
  toBase: (value: number) => number
  fromBase: (value: number) => number
}

export type UnitCategory = {
  id: UnitCategoryId
  icon: string
  name: string
  shortDescription: string
  helperText: string
  baseUnitLabel: string
  units: UnitDefinition[]
  defaultFromUnitId: string
  defaultToUnitId: string
}
