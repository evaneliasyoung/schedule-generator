import { clamp } from "lodash-es"

export const dateSerializer = {
  parse: (v: string) => new Date(v),
  stringify: (v: Date) => v.toISOString(),
}

export const clampedSerializer = <T extends number = number>(min: number, max: number) => ({
  parse: (v: string) => clamp(parseInt(v), min, max) as T,
  stringify: (v: T) => clamp(v, min, max).toString(),
})

export const maxLengthSerializer = (maxLength: number) => ({
  parse: (v: string) => v.substring(0, maxLength),
  stringify: (v: string) => v.substring(0, maxLength),
})
