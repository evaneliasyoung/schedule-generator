<script lang="ts">
  import { RangeSlider } from "@skeletonlabs/skeleton"
  import { derived } from "svelte/store"

  import {
    studentName,
    leadingText,
    startDate,
    endDate,
    startHour,
    endHour,
    hourTicks,
    fields,
    type CourseField,
  } from "$lib/stores/schedule.store"
  import InputGroup from "$lib/components/InputGroup.svelte"
  import { Time } from "$lib/models/time"
  import { twentyFourHour } from "$lib/stores/theme.store"
  import MatSymbol from "$lib/components/MatSymbol.svelte"
  import { flip } from "svelte/animate"

  const inputStartDate = {
    subscribe: derived(startDate, (startDate) => (startDate.toISOString ? startDate.toISOString().substring(0, 10) : "")).subscribe,
    set: (value: string) => startDate.update(() => new Date(`${value}T00:00:00.000Z`)),
  }

  const inputEndDate = {
    subscribe: derived(endDate, (endDate) => (endDate.toISOString ? endDate.toISOString().substring(0, 10) : "")).subscribe,
    set: (value: string) => endDate.update(() => new Date(`${value}T00:00:00.000Z`)),
  }

  const allFields: CourseField[] = ["name", "type", "time", "location", "topic", "professor"]

  let ghost: HTMLDivElement
  let grabbed: HTMLDivElement | undefined = undefined
  let lastTarget: HTMLDivElement | undefined = undefined
  let mouseY = 0
  let offsetY = 0
  let ghostWidth = 0
  let ghostX = 0
  $: ghostY = mouseY + offsetY
  $: ghostPosition = `left: ${ghostX}px; top: ${ghostY}px;`
  $: ghostStyle = `${ghostPosition} width: ${ghostWidth}px;`

  function grab(clientY: number, element: unknown): void {
    if (element instanceof HTMLDivElement) {
      grabbed = element as HTMLDivElement
      grabbed!.dataset.grabY = clientY.toString()

      ghost.innerHTML = grabbed!.innerHTML

      const bb = grabbed!.getBoundingClientRect()
      offsetY = bb.y - clientY
      ghostX = bb.left
      ghostWidth = bb.width

      drag(clientY)
    }
  }

  function drag(clientY: number): void {
    if (grabbed) mouseY = clientY
  }

  function touchEnter(touch: Touch): void {
    drag(touch.clientY)
    const target = document.elementFromPoint(touch.clientX, touch.clientY)!.closest(".card") as HTMLDivElement
    if (target && target !== lastTarget) {
      lastTarget = target
      dragEnter(target)
    }
  }

  function dragEnter(target: EventTarget | null): void {
    if (grabbed && target && target !== grabbed && (target as HTMLElement).classList.contains("card")) {
      fields.swap(parseInt(grabbed.dataset.index ?? "0"), parseInt((target as HTMLElement).dataset.index ?? "0"))
    }
  }

  function release(): void {
    grabbed = undefined
  }
</script>

<p class="h3 uppercase">Schedule</p>
<InputGroup title="Flavor" subtitle="for fun! 🎉">
  <div>
    <label for="studentName" class="input-label">Student Name</label>
    <input class="input" type="text" name="studentName" maxlength="12" bind:value={$studentName} />
  </div>

  <div>
    <label for="leadingText" class="input-label">Leading Text</label>
    <input class="input" type="text" name="leadingText" maxlength="24" bind:value={$leadingText} />
  </div>
</InputGroup>

<InputGroup title="Dates" subtitle="not those dates 😉">
  <div>
    <label for="startDate" class="input-label text-primary-900-50-token">Start Date</label>
    <input class="input" type="date" name="startDate" bind:value={$inputStartDate} />
  </div>

  <div>
    <label for="startDate" class="input-label text-primary-900-50-token">End Date</label>
    <input class="input" type="date" name="endDate" bind:value={$inputEndDate} />
  </div>
</InputGroup>

<InputGroup title="Times" subtitle="how long is the day? 🥱">
  <RangeSlider name="startHour" bind:value={$startHour} min={6} max={10} step={1} ticked>
    <div class="slider-group">
      <div class="input-label text-primary-900-50-token">Start Time</div>
      <div class="text-xs">
        {new Time(6).toString($twentyFourHour, true)} &ndash; {new Time(10).toString($twentyFourHour, true)}
      </div>
    </div>
  </RangeSlider>

  <RangeSlider name="endHour" bind:value={$endHour} min={16} max={22} step={1} ticked>
    <div class="slider-group">
      <div class="input-label text-primary-900-50-token">End Time</div>
      <div class="text-xs">
        {new Time(16).toString($twentyFourHour, true)} &ndash; {new Time(22).toString($twentyFourHour, true)}
      </div>
    </div>
  </RangeSlider>

  <RangeSlider name="hourTicks" bind:value={$hourTicks} min={1} max={6} step={1} ticked>
    <div class="slider-group">
      <div class="input-label text-primary-900-50-token">Hour Ticks</div>
      <div class="text-xs">1 &ndash; 6</div>
    </div>
  </RangeSlider>
</InputGroup>

<InputGroup title="Fields" subtitle="cut the clutter ✂️">
  <div>
    <div class="input-label text-primary-900-50-token">Displayed</div>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div
      class={grabbed ? "cursor-grabbing" : ""}
      role="list"
      on:mousemove={function ($ev) {
        $ev.stopPropagation()
        drag($ev.clientY)
      }}
      on:touchmove={function ($ev) {
        $ev.stopPropagation()
        drag($ev.touches[0].clientY)
      }}
      on:mouseup={function ($ev) {
        $ev.stopPropagation()
        release()
      }}
      on:touchend={function ($ev) {
        $ev.stopPropagation()
        release()
      }}
    >
      <div bind:this={ghost} class="card field ghost {grabbed ? 'z-20 opacity-100' : '-z-10 opacity-0'}" style={ghostStyle}></div>
      {#each $fields as field, i (field)}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          class="card field {grabbed ? '' : 'cursor-grab'} {grabbed && grabbed.dataset.id === field ? 'opacity-0' : ''}"
          data-index={i}
          data-id={field}
          data-grabY="0"
          on:mousedown={function ($ev) {
            grab($ev.clientY, this)
          }}
          on:touchstart={function ($ev) {
            grab($ev.touches[0].clientY, this)
          }}
          on:mouseenter={function ($ev) {
            $ev.stopPropagation()
            dragEnter($ev.target)
          }}
          on:touchmove={function ($ev) {
            $ev.stopPropagation()
            $ev.preventDefault()
            touchEnter($ev.touches[0])
          }}
          animate:flip={{ duration: 150 }}
        >
          <button class="btn btn-icon btn-icon-sm"></button>
          <span class="select-none font-medium">{field[0].toUpperCase() + field.slice(1)}</span>
          <button class="btn btn-icon btn-icon-sm" on:click={() => fields.remove(field)}>
            <MatSymbol size={20}>remove</MatSymbol>
          </button>
        </div>
      {/each}
    </div>
  </div>

  <div>
    <div class="input-label text-primary-900-50-token">Unused</div>
    <div>
      {#each allFields as field}
        {#if !$fields.includes(field)}
          <div class="card field">
            <button class="btn btn-icon btn-icon-sm"></button>
            <span class="select-none font-medium">{field[0].toUpperCase() + field.slice(1)}</span>
            <button class="btn btn-icon btn-icon-sm" on:click={() => fields.push(field)}>
              <MatSymbol size={20}>add</MatSymbol>
            </button>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</InputGroup>

<style lang="postcss">
  .input-label {
    @apply block text-sm font-medium leading-6;
  }

  .slider-group {
    @apply flex justify-between items-center -mb-3;
  }

  .field {
    @apply flex items-center justify-between mb-2 select-none;
  }

  .ghost {
    @apply absolute top-0 left-0 pointer-events-none;
  }
</style>
