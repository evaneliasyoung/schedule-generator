<script lang="ts">
  import {
    AppBar,
    type PopupSettings,
    popup,
    getToastStore,
    type ToastSettings,
    type ModalSettings,
    getModalStore,
  } from "@skeletonlabs/skeleton"

  import { studentName, leadingText, startDate, endDate, startHour, endHour, hourTicks, fields, schedule } from "$lib/stores/schedule.store"
  import { roundedCorners, typeColors, twentyFourHour, theme } from "$lib/stores/theme.store"
  import { navOpen } from "$lib/stores/nav.store"
  import MatSymbol from "$lib/components/MatSymbol.svelte"
  import { courses } from "$lib/stores/courses.store"
  import { downloadObject, uploadObject } from "$lib/utils/upload-download"

  import { version } from "$app/environment"
  import { assets } from "$app/paths"
  import { resetableStores } from "$lib/stores/utils"

  const toastStore = getToastStore()
  const modalStore = getModalStore()

  const uploadPopup: PopupSettings = {
    event: "click",
    target: "uploadPopup",
    placement: "bottom",
  }

  const infoPopup: PopupSettings = {
    event: "click",
    target: "infoPopup",
    placement: "bottom",
  }

  const raiseToast = (toast: ToastSettings) =>
    toastStore.trigger({
      autohide: true,
      hideDismiss: true,
      hoverable: false,
      classes: "variant-filled-surface text-token p-2",
      timeout: 2_000,
      ...toast,
    })

  function mapLoadedSchedule(data: any): void {
    if (data?.schedule?.studentName) $studentName = data.schedule.studentName
    if (data?.schedule?.leadingText) $leadingText = data.schedule.leadingText
    if (data?.schedule?.startDate) $startDate = new Date(data.schedule.startDate)
    if (data?.schedule?.endDate) $endDate = new Date(data.schedule.endDate)
    if (data?.schedule?.startHour) $startHour = data.schedule.startHour
    if (data?.schedule?.endHour) $endHour = data.schedule.endHour
    if (data?.schedule?.hourTicks) $hourTicks = data.schedule.hourTicks
    if (data?.schedule?.fields) $fields = data.schedule.fields

    if (data?.theme?.roundedCorners) $roundedCorners = data.theme.roundedCorners
    if (data?.theme?.typeColors) $typeColors = data.theme.typeColors
    if (data?.theme?.twentyFourHour) $twentyFourHour = data.theme.twentyFourHour

    if (data?.courses) courses.fromPrimitive(data.courses)
  }

  function reset(event: MouseEvent) {
    function wrapped() {
      theme.reset()
      schedule.reset()
      courses.reset()
    }

    if (event.shiftKey) wrapped()
    else
      new Promise<boolean>((resolve) => {
        const modal: ModalSettings = {
          type: "confirm",
          title: "New Schedule",
          body: `Are you sure you want to create a new schedule?`,
          response: resolve,
        }
        modalStore.trigger(modal)
      }).then((confirmed) => {
        if (!confirmed) return
        wrapped()
      })
  }

  async function load(event: Event): Promise<void> {
    try {
      const { value } = event.target as HTMLInputElement
      mapLoadedSchedule(JSON.parse(value))
      raiseToast({ message: "Loaded schedule!" })
    } catch {
      raiseToast({ message: "Failed to load schedule!", classes: "variant-filled-error text-token p-2" })
    }
  }

  async function upload(event: Event): Promise<void> {
    try {
      const data = await uploadObject(event.target as HTMLInputElement)
      mapLoadedSchedule(data)
      raiseToast({ message: "Uploaded schedule!" })
    } catch {
      raiseToast({ message: "Failed to upload schedule!", classes: "variant-filled-error text-token p-2" })
    }
  }

  function download(): void {
    const season = ["Spring", "Spring", "Spring", "Spring", "Spring", "Summer", "Summer", "Fall", "Fall", "Fall", "Fall", "Winter"][
      $startDate.getMonth()
    ]
    const year = $startDate.getFullYear().toString()

    downloadObject(`${season} ${year}.json`, {
      $schema: `${location.protocol}//${location.host}${assets}/schedule.schema.json`,
      version,
      schedule: schedule.serialize(),
      theme: theme.serialize(),
      courses: courses.toPrimitive(),
    })
    raiseToast({ message: "Downloaded schedule!" })
  }

  function print(): void {
    window.print()
  }

  async function clickVersion(): Promise<void> {
    try {
      await navigator.clipboard.writeText(version)
      raiseToast({ message: "Version number copied to clipboard!" })
    } catch {
      raiseToast({ message: "Failed to copy version number!", classes: "variant-filled-error text-token p-2" })
    }
  }
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <div class="flex items-center gap-2">
      <button class="btn-icon btn-icon-sm mr-2 lg:!hidden" on:click={() => navOpen.set(!$navOpen)}>
        <MatSymbol>menu</MatSymbol>
      </button>
      <MatSymbol size={32} fill>assignment</MatSymbol>
      <code class="text-2xl hidden lg:block">schedule-generator</code>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <div class="flex items-center space-x-1">
      <button class="btn-icon hover:variant-soft-primary" on:click={reset}>
        <MatSymbol>new_window</MatSymbol>
      </button>
      <button class="btn-icon hover:variant-soft-primary" use:popup={uploadPopup}>
        <MatSymbol>upload</MatSymbol>
      </button>
      <button class="btn-icon hover:variant-soft-primary" on:click={download}>
        <MatSymbol>download</MatSymbol>
      </button>
      <button class="btn-icon hover:variant-soft-primary" on:click={print}>
        <MatSymbol>print</MatSymbol>
      </button>
      <button class="btn-icon hover:variant-soft-primary" use:popup={infoPopup}>
        <MatSymbol>info</MatSymbol>
      </button>
    </div>
  </svelte:fragment>

  <div class="card p-4 variant-glass-primary" data-popup="uploadPopup">
    <input class="input" type="text" placeholder="Enter JSON" on:change={load} />
    <p class="my-2 text-center opacity-75 text-sm font-medium">- OR -</p>
    <input class="input" type="file" accept="application/json" on:change={upload} />
  </div>

  <div class="card p-4 variant-glass-primary" data-popup="infoPopup">
    <div class="flex items-end justify-between gap-9">
      <span class="h4 font-mono leading-none">schedule-generator</span>
      <button class="btn variant-filled-surface text-token px-1 py-0 text-sm font-mono rounded-md" on:click={clickVersion}
        >v{version}</button
      >
    </div>
    <span class="text-sm italic">An open-source project by Evan Elias Young</span>
  </div>
</AppBar>

<style lang="postcss">
</style>
