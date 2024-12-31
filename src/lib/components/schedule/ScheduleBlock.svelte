<script lang="ts">
  import type { Day } from "$lib/models/day"
  import type { Time } from "$lib/models/time"
  import { hourTicks, startHour } from "$lib/stores/schedule.store"
  import { getGridArea } from "$lib/utils/grid"
  import { combineStyles } from "$lib/utils"

  export let day: Day
  export let start: Time
  export let end: Time
  export let fill: string

  let klass: string | undefined = undefined
  export { klass as class }

  $: area = getGridArea(day, start, end, $startHour, $hourTicks)

  $: bgColor = `background-color: ${fill}`
  $: gridColumn = `grid-column: ${area.columnStart} / ${area.columnEnd}`
  $: gridRows = `grid-row: ${area.rowStart} / ${area.rowEnd}`
  $: style = combineStyles(bgColor, gridColumn, gridRows)
</script>

<div {style} class="flex flex-col items-center justify-center text-sm leading-none {klass ?? ''}"><slot /></div>
