<script lang="ts">
  import { AppRail, AppRailTile } from "@skeletonlabs/skeleton"

  import { NavTile, navTile } from "$lib/stores/nav.store"
  import MatSymbol from "$lib/components/MatSymbol.svelte"
  import ScheduleForm from "$lib/components/forms/ScheduleForm.svelte"
  import ThemeForm from "$lib/components/forms/ThemeForm.svelte"
  import CoursesForm from "$lib/components/forms/CoursesForm.svelte"
</script>

<div class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 lg:grid w-[360px] overflow-hidden">
  <AppRail>
    <AppRailTile bind:group={$navTile} name="schedule" value={0} title="schedule">
      <svelte:fragment slot="lead">
        <MatSymbol>schedule</MatSymbol>
      </svelte:fragment>
      <span>Schedule</span>
    </AppRailTile>
    <AppRailTile bind:group={$navTile} name="courses" value={1} title="courses">
      <svelte:fragment slot="lead">
        <MatSymbol>school</MatSymbol>
      </svelte:fragment>
      <span>Courses</span>
    </AppRailTile>
    <AppRailTile bind:group={$navTile} name="theme" value={2} title="theme">
      <svelte:fragment slot="lead">
        <MatSymbol>palette</MatSymbol>
      </svelte:fragment>
      <span>Theme</span>
    </AppRailTile>
  </AppRail>
  <section class="p-4 space-y-4 overflow-y-auto">
    {#if $navTile === NavTile.Schedule}
      <ScheduleForm />
    {:else if $navTile === NavTile.Courses}
      <CoursesForm />
    {:else if $navTile === NavTile.Theme}
      <ThemeForm />
    {/if}
  </section>
</div>
