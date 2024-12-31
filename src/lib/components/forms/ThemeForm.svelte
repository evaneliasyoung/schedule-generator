<script lang="ts">
  import { RoundedCorners, roundedCorners, typeColors, twentyFourHour } from "$lib/stores/theme.store"
  import { now } from "$lib/stores/now.store"

  import InputGroup from "$lib/components/InputGroup.svelte"
  import { SlideToggle } from "@skeletonlabs/skeleton"
  import { derived } from "svelte/store"
  import { CourseType } from "$lib/models/course-type"

  const lectureColor = {
    subscribe: derived(typeColors, ($typeColors) => $typeColors[CourseType.Lecture]).subscribe,
    set: (lectureColor: string) => typeColors.update((typeColors) => ({ ...typeColors, [CourseType.Lecture]: lectureColor })),
  }

  const labColor = {
    subscribe: derived(typeColors, ($typeColors) => $typeColors[CourseType.Lab]).subscribe,
    set: (labColor: string) => typeColors.update((typeColors) => ({ ...typeColors, [CourseType.Lab]: labColor })),
  }

  const recitationColor = {
    subscribe: derived(typeColors, ($typeColors) => $typeColors[CourseType.Recitation]).subscribe,
    set: (recitationColor: string) => typeColors.update((typeColors) => ({ ...typeColors, [CourseType.Recitation]: recitationColor })),
  }
</script>

<p class="h3 uppercase">Theme</p>
<InputGroup>
  <div>
    <span class="input-label text-primary-900-50-token">Rounded Corners</span>
    <div class="btn-group grid grid-cols-3 variant-ghost-primary">
      <button
        on:click={() => ($roundedCorners = RoundedCorners.None)}
        class={$roundedCorners === RoundedCorners.None ? "bg-primary-active-token" : ""}>None</button
      >
      <button
        on:click={() => ($roundedCorners = RoundedCorners.Table)}
        class={$roundedCorners === RoundedCorners.Table ? "bg-primary-active-token" : ""}>Table</button
      >
      <button
        on:click={() => ($roundedCorners = RoundedCorners.All)}
        class={$roundedCorners === RoundedCorners.All ? "bg-primary-active-token" : ""}>All</button
      >
    </div>
  </div>

  <div>
    <span class="input-label text-primary-900-50-token">Lecture, Lab, and Recitation Colors</span>
    <div class="flex justify-evenly">
      <input class="input" type="color" name="lectureColor" bind:value={$lectureColor} />
      <input class="input" type="color" name="labColor" bind:value={$labColor} />
      <input class="input" type="color" name="recitationColor" bind:value={$recitationColor} />
    </div>
  </div>

  <div>
    <span class="input-label text-primary-900-50-token">Twenty Four Hour</span>

    <SlideToggle
      name="twentyFourHour"
      size="sm"
      background="variant-ghost-surface"
      active="variant-filled-primary"
      bind:checked={$twentyFourHour}
    >
      <time datetime={$now.toString(true)}>{$now.toString($twentyFourHour)}</time>
    </SlideToggle>
  </div>
</InputGroup>

<style lang="postcss">
  .input-label {
    @apply block text-sm font-medium leading-6;
  }
</style>
