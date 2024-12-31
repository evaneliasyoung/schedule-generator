<script lang="ts">
  import { Time } from "$lib/models/time"
  import { startHour, endHour, hourTicks } from "$lib/stores/schedule.store"
  import { RoundedCorners, roundedCorners, twentyFourHour } from "$lib/stores/theme.store"
  import { range } from "$lib/utils"
  import { getGridArea } from "$lib/utils/grid"
  import { courses } from "$lib/stores/courses.store"
  import ScheduleCourse from "./ScheduleCourse.svelte"
  import { Day } from "$lib/models/day"

  $: totalGridRows = ($endHour - $startHour + 1) * $hourTicks + 1
  $: style = `grid-template-rows: repeat(${totalGridRows}, minmax(0, 1fr));`
  $: tableRounded = $roundedCorners !== RoundedCorners.None ? "rounded" : ""
  $: allRounded = $roundedCorners === RoundedCorners.All ? "rounded" : ""

  $: totalGridArea = 5 * totalGridRows - 1
  $: usedGridArea = $courses.reduce<number>((totalArea, course) => {
    const { rowStart, rowEnd } = getGridArea(Day.Monday, course.start, course.end, $startHour, $hourTicks)
    const gridArea = (rowEnd - rowStart) * course.days.size
    return totalArea + gridArea
  }, 0)
  $: freeGridArea = totalGridArea - usedGridArea
</script>

<div class="schedule-grid grid grow gap-0.5 overflow-hidden {tableRounded}" {style}>
  <span class="th {allRounded}">Time</span>
  <date class="th {allRounded}">Monday</date>
  <date class="th {allRounded}">Tuesday</date>
  <date class="th {allRounded}">Wednesday</date>
  <date class="th {allRounded}">Thursday</date>
  <date class="th {allRounded}">Friday</date>

  {#each range($endHour - $startHour + 1) as ind}
    <time class="th col-span-1 {allRounded}" style="grid-row: {2 + ind * $hourTicks} / span {$hourTicks};">
      {new Time($startHour + ind).toString($twentyFourHour)}
    </time>
  {/each}

  {#each $courses as _, index}
    <ScheduleCourse class={allRounded} {index} />
  {/each}

  {#each range(freeGridArea) as _}
    <span class="td {allRounded}" />
  {/each}
</div>

<style lang="postcss">
  .schedule-grid {
    grid-template-columns: calc(100% / 16) repeat(5, minmax(0, 1fr));
  }

  .schedule-grid > * {
    @apply bg-gray-100;
  }

  .th {
    @apply text-center flex items-center justify-center font-bold leading-none;
  }
</style>
