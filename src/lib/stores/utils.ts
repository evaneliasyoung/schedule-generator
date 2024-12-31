import { get, type Readable, type Writable } from "svelte/store"

import { localStorageStore } from "@skeletonlabs/skeleton"
import { wrap } from "lodash-es"

export interface Resetable<T> extends Writable<T> {
  /**
   * Set to initial value and inform subscribers.
   */
  reset(this: void): void
}

export function resetableLocalStorageStore<T>(
  key: string,
  initialValue: T,
  options?: {
    serializer?: {
      parse: (text: string) => T
      stringify: (object: T) => string
    }
    store?: "local" | "session"
  },
): Resetable<T> {
  const original = structuredClone(initialValue)
  const { subscribe, set, update } = localStorageStore(key, initialValue, options)
  const reset = () => set(original)
  return { subscribe, set, update, reset }
}

export const reset = (store: Resetable<unknown>) => store.reset()

export const resetStores = (stores: Resetable<unknown>[]) => stores.forEach(reset)

export const resetableStores = (stores: Resetable<unknown>[]) => wrap(stores, resetStores)

export const serializeStores = (stores: Record<string, Readable<unknown>>) =>
  Object.fromEntries(Object.entries(stores).map(([key, store]) => [key, get(store)]))

export const serializableStores = (stores: Record<string, Readable<unknown>>) => wrap(stores, serializeStores)
