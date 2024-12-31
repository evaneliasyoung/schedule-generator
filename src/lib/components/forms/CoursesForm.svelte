<script lang="ts">
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton"
  import { courses } from "$lib/stores/courses.store"
  import MatSymbol from "$lib/components/MatSymbol.svelte"
  import CourseForm, { type DeleteCourseEvent, type BaseCourseEvent } from "$lib/components/forms/CourseForm.svelte"
  import { editingCourse } from "$lib/stores/nav.store"

  const modalStore = getModalStore()

  function onDelete({ detail: { index, shift } }: DeleteCourseEvent): void {
    if (shift) courses.remove(index)
    else
      new Promise<boolean>((resolve) => {
        const modal: ModalSettings = {
          type: "confirm",
          title: "Delete Course",
          body: `Are you sure you want to delete ${$courses[index].name}?`,
          response: resolve,
        }
        modalStore.trigger(modal)
      }).then((confirmed) => {
        if (!confirmed) return
        courses.remove(index)
      })
  }

  function onToggle({ detail: { index } }: BaseCourseEvent): void {
    $editingCourse = index === $editingCourse ? -1 : index
  }

  function onAdd(): void {
    $editingCourse = $courses.length
    courses.add()
  }
</script>

<p class="h3 uppercase">Courses</p>

{#each $courses as _, index}
  <CourseForm {index} opened={$editingCourse === index} on:delete={onDelete} on:toggle={onToggle} />
{/each}

<div class="flex justify-center">
  <button class="btn-icon variant-filled-primary" on:click={onAdd}>
    <MatSymbol>add</MatSymbol>
  </button>
</div>
