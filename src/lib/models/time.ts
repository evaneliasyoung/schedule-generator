import { floor } from "lodash-es"

export type TimeLike = {
  hour: number
  minute: number
}

export class Time {
  public static readonly RE_24 = /^([012]\d):([012345]\d)$/
  public static readonly RE_12 = /^(1[012]|\d):([012345]{2}) ?([AaPp])\.?[Mm]\.?$/

  public hour!: number
  public minute!: number

  public static fromDate = (date: Date) => new Time(date.getHours(), date.getMinutes())

  public static fromString(time: string): Time {
    const t = new Time()

    {
      const match = Time.RE_24.exec(time)
      if (match) {
        const [_, hour, minute] = match
        Object.assign(t, { hour: parseInt(hour), minute: parseInt(minute) })
        return t
      }
    }

    {
      const match = Time.RE_12.exec(time)
      if (match) {
        const [_, hour, minute, meridian] = match
        const pm = meridian.toUpperCase() === "P"
        Object.assign(t, {
          hour: parseInt(hour) === 12 ? (pm ? 12 : 0) : parseInt(hour) + (pm ? 12 : 0),
          minute: parseInt(minute),
        })
        return t
      }
    }

    throw Error("invalid time format")
  }

  public static fromTime = (hour: number, minute?: number) => new Time(hour, minute ?? 0)

  public static fromValue = (value: number) =>
    new Time(floor((value % (24 * 60)) / 60), floor((value % (24 * 60)) - 60 * floor((value % (24 * 60)) / 60)))

  constructor()
  constructor(time: string)
  constructor(hour: number)
  constructor(date: Date)
  constructor(hour: number, minute: number)
  constructor(...args: unknown[]) {
    let staticCtor: (() => TimeLike) | undefined = undefined

    if (args.length === 0) {
      staticCtor = () => Time.fromDate(new Date())
    } else if (args.length === 1) {
      const [arg] = args
      if (arg instanceof Date) staticCtor = () => Time.fromDate(arg)
      else if (typeof arg === "string") staticCtor = () => Time.fromString(arg)
      else if (typeof arg === "number") staticCtor = () => Time.fromTime(arg)
    } else if (args.length === 2) {
      const [hour, minute] = args
      if (typeof hour === "number" && typeof minute === "number") staticCtor = () => ({ hour, minute })
    }

    if (staticCtor !== undefined) {
      const { hour, minute } = staticCtor()
      Object.assign(this, { hour, minute })
    } else {
      throw Error("invalid arguments", { cause: args })
    }
  }

  public delta(time: Time): number {
    return Math.abs(this.valueOf() - time.valueOf())
  }

  public toString(twentyFour = true, hourOnly = false) {
    const hourSegment = twentyFour ? this.hour.toString().padStart(2, "0") : ((this.hour - 1) % 12) + 1
    const suffix = twentyFour ? "" : ` ${this.hour >= 12 ? "P" : "A"}M`

    return hourSegment + (hourOnly ? "" : `:${this.minute.toString().padStart(2, "0")}`) + suffix
  }

  public valueOf(): number {
    return this.hour * 60 + this.minute
  }
}
