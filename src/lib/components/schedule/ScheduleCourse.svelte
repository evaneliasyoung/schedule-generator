<script lang="ts">
  import ScheduleBlock from "./ScheduleBlock.svelte"
  import { twentyFourHour, typeColors } from "$lib/stores/theme.store"
  import { derived } from "svelte/store"
  import { courses } from "$lib/stores/courses.store"
  import { fields } from "$lib/stores/schedule.store"

  export let index: number

  let klass: string | undefined
  export { klass as class }

  const course = derived(courses, ($courses) => $courses[index])

  const name = derived(course, ($course) => $course?.name)
  const section = derived(course, ($course) => $course?.section)
  const topic = derived(course, ($course) => $course?.topic)
  const professor = derived(course, ($course) => $course?.professor)
  const type = derived(course, ($course) => $course?.type)
  const location = derived(course, ($course) => $course?.location)
  const start = derived(course, ($course) => $course?.start)
  const end = derived(course, ($course) => $course?.end)
  const days = derived(course, ($course) => $course?.days)
</script>

{#each $days as day}
  <ScheduleBlock class={klass} {day} fill={$typeColors[$type]} start={$start} end={$end}>
    {#each $fields as field}
      {#if field === "name"}
        <span>{$name} &ndash; {$section}</span>
      {:else if field === "type"}
        <span>{$type[0].toUpperCase() + $type.slice(1)}</span>
      {:else if field === "time"}
        <span>{$start.toString($twentyFourHour)} &ndash; {$end.toString($twentyFourHour)}</span>
      {:else if field === "location"}
        <span>{$location}</span>
      {:else if field === "topic"}
        <span>{$topic}</span>
      {:else if field === "professor"}
        <span>{$professor}</span>
      {/if}
    {/each}
  </ScheduleBlock>
{/each}
