import { CourseType } from "$lib/models/course-type"

import { resetableStores, resetableLocalStorageStore, serializableStores } from "./utils"

export enum RoundedCorners {
  None = "none",
  Table = "table",
  All = "all",
}

export const roundedCorners = resetableLocalStorageStore<RoundedCorners>("roundedCorners", RoundedCorners.None)

export const typeColors = resetableLocalStorageStore("typeColors", {
  [CourseType.Lecture]: "#c6e0b4",
  [CourseType.Lab]: "#b4c6e7",
  [CourseType.Recitation]: "#f8cbad",
})

export const twentyFourHour = resetableLocalStorageStore("twentyFourHour", true)

export const theme = {
  serialize: serializableStores({ roundedCorners, typeColors, twentyFourHour }),
  reset: resetableStores([roundedCorners, typeColors, twentyFourHour]),
}
