<script lang="ts">
  import PrinterPaper from "$lib/components/PrinterPaper.svelte"
  import ScheduleGrid from "$lib/components/schedule/ScheduleGrid.svelte"
  import ScheduleHeader from "$lib/components/schedule/ScheduleHeader.svelte"
</script>

<PrinterPaper>
  <div class="flex flex-col w-full h-full">
    <ScheduleHeader />
    <ScheduleGrid />
  </div>
</PrinterPaper>
