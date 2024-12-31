<script lang="ts">
  export let title: string | undefined = undefined
  export let subtitle: string | undefined = undefined
</script>

<section>
  {#if title || subtitle}
    <div class="flex items-end justify-between">
      <span class="h4">{title ?? ""}</span>
      <span class="text-sm text-surface-700-200-token">{subtitle ?? ""}</span>
    </div>
  {/if}
  <div class="space-y-2">
    <slot />
  </div>
</section>
