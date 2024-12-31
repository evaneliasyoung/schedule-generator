import type { Day } from "$lib/models/day"
import { Time } from "$lib/models/time"
import { toPrecision } from "$lib/utils"

export type GridArea = {
  columnStart: number
  columnEnd: number
  rowStart: number
  rowEnd: number
}

export const getGridArea = (day: Day, startTime: Time, endTime: Time, startHour: number, hourTicks: number) => ({
  columnStart: day + 2,
  columnEnd: day + 2,
  rowStart: Math.round(toPrecision(startTime.delta(new Time(startHour)) / 60, 1 / hourTicks, Math.round) * hourTicks) + 2,
  rowEnd: Math.round(toPrecision(endTime.delta(new Time(startHour)) / 60, 1 / hourTicks, Math.round) * hourTicks) + 2,
})

export const getGridSlots = (area: GridArea) => (area.columnEnd - area.columnStart + 1) * (area.rowEnd - area.rowStart + 1) - 1
