<script setup lang="ts">
const { path } = useRoute()

const { data } = await useAsyncData(`kun-doc-footer`, () =>
  queryCollectionItemSurroundings('content', path, {
    fields: ['title', 'path']
  })
)

const [prev, next] = data.value || []
</script>

<template>
  <div class="flex items-center justify-between">
    <KunButton v-if="prev" color="default" variant="light" :href="prev.path">
      <KunIcon name="lucide:chevron-left" />
      {{ prev.title }}
    </KunButton>
    <KunButton
      class-name="ml-auto"
      color="default"
      v-if="next"
      variant="light"
      :href="next.path"
    >
      {{ next.title }}
      <KunIcon name="lucide:chevron-right" />
    </KunButton>
  </div>
</template>
