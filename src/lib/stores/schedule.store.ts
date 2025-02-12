import { resetableStores, resetableLocalStorageStore, serializableStores } from "$lib/stores/utils"

import { clampedSerializer, dateSerializer, maxLengthSerializer } from "./serializers"

export const studentName = resetableLocalStorageStore("studentName", "Evan", {
  serializer: maxLengthSerializer(12),
})
export const leadingText = resetableLocalStorageStore("leadingText", "My Class Schedule", {
  serializer: maxLengthSerializer(24),
})

export const startDate = resetableLocalStorageStore("startDate", new Date("2019-08-12T00:00:00.000Z"), {
  serializer: dateSerializer,
})
export const endDate = resetableLocalStorageStore("endDate", new Date("2019-12-06T00:00:00.000Z"), {
  serializer: dateSerializer,
})

export const startHour = resetableLocalStorageStore("startHour", 8, {
  serializer: clampedSerializer(6, 10),
})
export const endHour = resetableLocalStorageStore("endHour", 18, {
  serializer: clampedSerializer(16, 22),
})

export const hourTicks = resetableLocalStorageStore("hourTicks", 4, {
  serializer: clampedSerializer(1, 6),
})

export type CourseField = "name" | "type" | "time" | "location" | "topic" | "professor"

function createFields() {
  const { update, ...rest } = resetableLocalStorageStore<CourseField[]>("fields", ["name", "type", "time", "location"])

  return {
    ...rest,
    update,
    push: (field: CourseField) => update((fields) => [...fields, field]),
    remove: (field: CourseField) => update((fields) => fields.filter((f) => f !== field)),
    swap: (from: number, to: number) =>
      update((fields) => {
        const temp = fields[from]
        fields = [...fields.slice(0, from), ...fields.slice(from + 1)]
        fields = [...fields.slice(0, to), temp, ...fields.slice(to)]
        return fields
      }),
  }
}

export const fields = createFields()

export const schedule = {
  serialize: serializableStores({ studentName, leadingText, startDate, endDate, startHour, endHour, hourTicks }),
  reset: resetableStores([studentName, leadingText, startDate, endDate, startHour, endHour, hourTicks]),
}
