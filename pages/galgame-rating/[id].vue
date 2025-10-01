<script setup lang="ts">
const route = useRoute()
const id = computed(() => parseInt((route.params as { id: string }).id))

const { data } = useFetch(`/api/galgame-rating/${id.value}`, {
  method: 'GET',
  query: { galgameRatingId: id.value },
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="contents">
    <GalgameRatingDetail v-if="data" :data="data" :rating-id="id" />
    <KunNull v-else description="未找到该评分" />
  </div>
</template>
