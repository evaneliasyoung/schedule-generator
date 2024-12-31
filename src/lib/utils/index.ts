import { random } from "lodash-es"

export const range = (start: number, end?: number) => new Array((end ?? start) - (end ? start : 0)).fill(0).map((e, i) => e + i)

export const combineStyles = (...styles: string[]) => styles.join(";")

export const toPrecision = (value: number, precision: number, round: (value: number) => number) => round(value / precision) * precision

export const choice = (iterable: unknown[]) => iterable[random(iterable.length - 1)]
