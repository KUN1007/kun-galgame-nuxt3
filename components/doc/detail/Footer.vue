<script setup lang="ts">
const route = useRoute()

const { data: posts } = await useAsyncData(() => {
  return queryCollectionItemSurroundings('content', route.path, {
    fields: ['title', 'path']
  })
})

const [prev, next] = posts.value || []
</script>

<template>
  <div class="flex items-center justify-between">
    <KunButton
      class-name="mr-auto justify-start text-start gap-2"
      v-if="prev"
      color="default"
      variant="light"
      :href="prev.path"
    >
      <KunIcon name="lucide:chevron-left" />
      {{ prev.title }}
    </KunButton>
    <KunButton
      class-name="ml-auto justify-end text-end gap-2"
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
