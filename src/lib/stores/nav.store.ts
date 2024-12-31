import { localStorageStore } from "@skeletonlabs/skeleton"

export enum NavTile {
  Schedule = 0,
  Courses = 1,
  Theme = 2,
}

export const navOpen = localStorageStore("navOpen", false)
export const navTile = localStorageStore<NavTile>("navTile", NavTile.Schedule)
export const editingCourse = localStorageStore<number>("editingCourse", -1)
export const loading = localStorageStore<boolean>("loading", true)
