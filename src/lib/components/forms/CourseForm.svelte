<script lang="ts" context="module">
  export type DeleteCourseEvent = CustomEvent<{
    index: number
    shift: boolean
  }>

  export type BaseCourseEvent = CustomEvent<{ index: number }>
</script>

<script lang="ts">
  import { CourseType } from "$lib/models/course-type"
  import { courses } from "$lib/stores/courses.store"
  import { derived } from "svelte/store"
  import InputGroup from "../InputGroup.svelte"
  import MatSymbol from "../MatSymbol.svelte"
  import { slide } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import { Time } from "$lib/models/time"
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton"
  import { Day } from "$lib/models/day"
  import ButtonToggle from "../ButtonToggle.svelte"

  export let index: number
  export let opened: boolean = true
  const dispatch = createEventDispatcher()

  $: visible = true

  const course = derived(courses, ($courses) => $courses[index])

  const name = {
    subscribe: derived(course, (course) => course?.name)?.subscribe,
    set: (name: string) => courses.update(index, { name }),
  }

  const section = {
    subscribe: derived(course, (course) => course?.section)?.subscribe,
    set: (section: string) => courses.update(index, { section }),
  }

  const topic = {
    subscribe: derived(course, (course) => course?.topic)?.subscribe,
    set: (topic: string) => courses.update(index, { topic }),
  }

  const professor = {
    subscribe: derived(course, (course) => course?.professor)?.subscribe,
    set: (professor: string) => courses.update(index, { professor }),
  }

  const type = {
    subscribe: derived(course, (course) => course?.type)?.subscribe,
    set: (type: CourseType) => courses.update(index, { type }),
  }

  const location = {
    subscribe: derived(course, (course) => course?.location)?.subscribe,
    set: (location: string) => courses.update(index, { location }),
  }

  const start = {
    subscribe: derived(course, (course) => course?.start)?.subscribe,
    set: (start: string) => courses.update(index, { start: new Time(start) }),
  }

  const end = {
    subscribe: derived(course, (course) => course?.end)?.subscribe,
    set: (end: string) => courses.update(index, { end: new Time(end) }),
  }

  const days = {
    subscribe: derived(course, (course) => course?.days)?.subscribe,
    set: (days: Set<Day>) => courses.update(index, { days }),
    toggle: (day: Day) => {
      let cache = new Set([...$days])
      if (cache.has(day)) cache.delete(day)
      else cache.add(day)
      days.set(cache)
    },
  }
</script>

{#if visible}
  <div class="card p-4">
    <div class="grid grid-cols-2">
      <span class="font-medium">{$name}</span>
      <div class="flex gap-1 items-center justify-end">
        <button
          class="btn-icon w-5 h-5 variant-soft-secondary hover:variant-ghost-secondary active:variant-soft-secondary"
          on:click={() => dispatch("toggle", { index }, { cancelable: false })}
        >
          <MatSymbol size={18}>{opened ? "expand_less" : "expand_more"}</MatSymbol>
        </button>
        <button
          class="btn-icon w-5 h-5 variant-soft-error hover:variant-ghost-error active:variant-filled-error"
          on:click={($event) => dispatch("delete", { index, shift: $event.shiftKey }, { cancelable: false })}
        >
          <MatSymbol size={18}>close</MatSymbol>
        </button>
      </div>
    </div>
    {#if opened}
      <div class="pt-2" transition:slide={{ axis: "y" }}>
        <InputGroup>
          <div>
            <label class="input-label text-primary-900-50-token" for="course{index}Name">Name</label>
            <input class="input" type="text" placeholder="Name" name="course{index}Name" bind:value={$name} />
          </div>

          <div>
            <label class="input-label text-primary-900-50-token" for="course{index}Section">Section</label>
            <input class="input" type="text" placeholder="Section" name="course{index}Section" bind:value={$section} />
          </div>

          <div>
            <label class="input-label text-primary-900-50-token" for="course{index}Topic">Topic</label>
            <input class="input" type="text" placeholder="Topic" name="course{index}Topic" bind:value={$topic} />
          </div>

          <div>
            <label class="input-label text-primary-900-50-token" for="course{index}Professor">Professor</label>
            <input class="input" type="text" placeholder="Professor" name="course{index}Professor" bind:value={$professor} />
          </div>

          <div>
            <span class="input-label text-primary-900-50-token">Type</span>
            <RadioGroup padding="pt-2 px-4" display="flex">
              <RadioItem bind:group={$type} name="type" value={CourseType.Lecture}>
                <MatSymbol size={24}>stylus_note</MatSymbol>
              </RadioItem>
              <RadioItem bind:group={$type} name="type" value={CourseType.Lab}>
                <MatSymbol size={24}>experiment</MatSymbol>
              </RadioItem>
              <RadioItem bind:group={$type} name="type" value={CourseType.Recitation}>
                <MatSymbol size={24}>person_raised_hand</MatSymbol>
              </RadioItem>
            </RadioGroup>
          </div>

          <div>
            <label class="input-label text-primary-900-50-token" for="course{index}Location">Location</label>
            <input class="input" type="text" placeholder="Location" name="course{index}Location" bind:value={$location} />
          </div>

          <div>
            <span class="input-label text-primary-900-50-token">Times</span>
            <div class="flex gap-2">
              <input class="input" type="time" bind:value={$start} />
              <input class="input" type="time" bind:value={$end} />
            </div>
          </div>

          <div>
            <span class="input-label text-primary-900-50-token">Days</span>
            <div class="grid grid-cols-5 gap-2">
              <ButtonToggle
                size="sm"
                class="font-medium aspect-square"
                checked={$days.has(Day.Monday)}
                on:click={() => days.toggle(Day.Monday)}>M</ButtonToggle
              >
              <ButtonToggle
                size="sm"
                class="font-medium aspect-square"
                checked={$days.has(Day.Tuesday)}
                on:click={() => days.toggle(Day.Tuesday)}>T</ButtonToggle
              >
              <ButtonToggle
                size="sm"
                class="font-medium aspect-square"
                checked={$days.has(Day.Wednesday)}
                on:click={() => days.toggle(Day.Wednesday)}>W</ButtonToggle
              >
              <ButtonToggle
                size="sm"
                class="font-medium aspect-square"
                checked={$days.has(Day.Thursday)}
                on:click={() => days.toggle(Day.Thursday)}>T</ButtonToggle
              >
              <ButtonToggle
                size="sm"
                class="font-medium aspect-square"
                checked={$days.has(Day.Friday)}
                on:click={() => days.toggle(Day.Friday)}>F</ButtonToggle
              >
            </div>
          </div>
        </InputGroup>
      </div>
    {/if}
  </div>
{/if}

<style lang="postcss">
  .input-label {
    @apply block text-sm font-medium leading-6;
  }
</style>
