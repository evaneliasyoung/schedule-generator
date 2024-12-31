import { floor, random } from "lodash-es"

import { choice } from "$lib/utils"

import { CourseType } from "./course-type"
import { Day } from "./day"
import { Time } from "./time"

export type Course = {
  name: string
  section: string
  topic: string
  professor: string
  type: CourseType
  location: string
  start: Time
  end: Time
  days: Set<Day>
  isTA: boolean
}

export type PrimitiveCourse = {
  name: string
  section: string
  topic: string
  professor: string
  type: string
  location: string
  start: string
  end: string
  days: number[]
  isTA: boolean
}

export const toPrimitive = ({ start, end, days, ...rest }: Course) =>
  ({
    ...rest,
    start: start.toString(true),
    end: end.toString(true),
    days: Array.from(days).map((day) => day.valueOf()),
  }) as PrimitiveCourse

export const fromPrimitive = ({ start, end, days, ...rest }: PrimitiveCourse) =>
  ({ ...rest, start: new Time(start), end: new Time(end), days: new Set(days) }) as Course

export function getRandomCourse(): Course {
  const meetsPerWeek = [1, 1, 2, 2, 2, 3, 3, 3, 3, 3][random(2)] as 1 | 2 | 3
  const runtime = [150, 75, 50][meetsPerWeek - 1]
  const start = Time.fromValue(15 * random(40, floor((16 * 60 - runtime) / 15)))

  return {
    name: [
      choice(["MATH", "ENGLISH", "SPANISH", "COMP SCI", "CHEM", "PHYSICS", "COMP ENG", "STAT", "ETHICS", "ELEC ENG", "MECH ENG"]),
      (random(1, 4) * 1000 + random(1, 8) * 100 + random(3) * 15).toString(),
    ].join(" "),
    section: random(1) === 1 ? `${random(1, 3)}${"ABC".charAt(random(2))}` : random(100, 113).toString(),
    topic: "",
    professor: "",
    type: [CourseType.Lecture, CourseType.Lab, CourseType.Recitation][random(2)],
    location: "",
    start,
    end: Time.fromValue(start.valueOf() + runtime),
    days: new Set([[Day.Wednesday], [Day.Tuesday, Day.Thursday], [Day.Monday, Day.Wednesday, Day.Friday]][meetsPerWeek - 1]),
    isTA: false,
  }
}
