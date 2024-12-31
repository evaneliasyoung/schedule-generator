import { derived, readable } from "svelte/store"

import { Time } from "$lib/models/time"

export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date())
  }, 1000)

  return function stop() {
    clearInterval(interval)
  }
})

export const now = derived(time, ($time) => new Time($time))
