import { get } from "svelte/store"

import { localStorageStore } from "@skeletonlabs/skeleton"

import { toPrimitive, type Course, type PrimitiveCourse, fromPrimitive, getRandomCourse } from "$lib/models/course"

function createCourses() {
  const parse = (text: string) => (JSON.parse(text) as PrimitiveCourse[]).map(fromPrimitive)
  const stringify = (courses: Course[]) => JSON.stringify(courses.map(toPrimitive))

  const { subscribe, set, update } = localStorageStore<Course[]>("courses", [], {
    serializer: { parse, stringify },
  })

  return {
    subscribe,
    set,
    remove: (index: number) => update((courses) => courses.slice(0, index).concat(courses.slice(index + 1))),
    add: () => update((courses) => [...courses, getRandomCourse()]),
    update: (index: number, props: Partial<Course>) =>
      update((courses) => [...courses.slice(0, index), Object.assign(courses[index], props), ...courses.slice(index + 1)]),
    toPrimitive: () => get({ subscribe }).map(toPrimitive),
    fromPrimitive: (primitive: PrimitiveCourse[]) => set(primitive.map(fromPrimitive)),
    reset: () => set([]),
  }
}

export const courses = createCourses()
