<script lang="ts">
  import "../app.postcss"

  import { blur, slide } from "svelte/transition"
  import { AppShell, Modal, Toast, initializeStores, storePopup } from "@skeletonlabs/skeleton"

  import { loading, navOpen } from "$lib/stores/nav.store"

  import AppSidebar from "$lib/components/layout/AppSidebar.svelte"
  import AppHeader from "$lib/components/layout/AppHeader.svelte"

  import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom"
  import { writable } from "svelte/store"
  import { onMount } from "svelte"
  import { leadingText, studentName } from "$lib/stores/schedule.store"

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })

  initializeStores()

  const showLoader = writable(true)

  onMount(() => {
    loading.subscribe(() => ($showLoader = false))
  })
</script>

<svelte:head>
  <title>{$leadingText ?? "My Class Schedule"} ({$studentName ?? "Evan"})</title>
</svelte:head>

{#if $showLoader}
  <code class="absolute h-dvh w-dvw flex items-center justify-center text-4xl bg-surface-50-900-token" transition:blur={{ duration: 1000 }}>
    schedule-generator
  </code>
{:else}
  <Toast />
  <Modal />

  <AppShell>
    <svelte:fragment slot="header">
      <div class="print:hidden">
        <AppHeader />
      </div>
    </svelte:fragment>

    <svelte:fragment slot="sidebarLeft">
      {#if $navOpen}
        <div class="h-full lg:hidden" transition:slide={{ axis: "x" }}>
          <AppSidebar />
        </div>
      {/if}
      <div class="hidden lg:!block h-full">
        <AppSidebar />
      </div>
    </svelte:fragment>

    <slot />
  </AppShell>
{/if}
