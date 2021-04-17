export type CellType = {
    active: boolean
}

export type RuleType = {
    index: number
    value: boolean
}

export type OnClickCell = (cell: CellType, key: number) => void
