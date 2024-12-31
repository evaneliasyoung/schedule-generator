<script lang="ts">
  import { studentName, leadingText, startDate, endDate } from "$lib/stores/schedule.store"

  const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: "UTC" })
  $: renderStartDate = dateFormatter.format($startDate)
  $: renderEndDate = dateFormatter.format($endDate)
</script>

<div class="h-[1in] grid grid-cols-2 grid-rows-2 font-bold">
  <span class="leading-[0.5in] text-2xl">{$leadingText}</span>
  <span class="leading-[0.5in] text-2xl">{renderStartDate} &ndash; {renderEndDate}</span>
  <span class="row-start-1 row-end-2 col-start-2 col-end-2 text-right leading-[1in] text-6xl">{$studentName}</span>
</div>
