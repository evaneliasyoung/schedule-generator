<script lang="ts">
  import { createEventDispatcher } from "svelte"

  export let checked: boolean | undefined = undefined
  export let size: "sm" | "md" | "base" | "lg" | "xl" = "base"
  export let background: string | undefined = undefined
  export let active: string | undefined = undefined
  export let rounded: string | undefined = undefined

  let klass: string | undefined = undefined
  export { klass as class }

  const dispatch = createEventDispatcher()

  $: backgroundClass = background ?? "bg-surface-200-700-token hover:variant-soft"
  $: activeClass = active ?? "variant-filled"
  $: roundedClass = rounded ?? ""
  $: extraClass = klass ?? ""
  $: fullClass = `btn btn-${size} ${checked ? activeClass : backgroundClass} ${roundedClass} ${extraClass}`
</script>

<button
  class={fullClass}
  on:click={($event) => {
    dispatch("click", $event)
  }}
>
  <slot />
</button>
