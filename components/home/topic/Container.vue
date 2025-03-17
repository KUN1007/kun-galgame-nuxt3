<script setup lang="ts">
const { data } = await useFetch(`/api/home/topic`, {
  method: 'GET',
  query: {
    page: 1,
    limit: 10
  },
  ...kungalgameResponseHandler
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
    v-if="data"
  >
    <div class="flex items-center gap-3">
      <h2 class="text-xl font-semibold">最新话题</h2>
      <NuxtLink class="text-default-600 hover:text-primary text-sm" to="/topic">
        查看更多 >
      </NuxtLink>
    </div>

    <template v-for="(topic, index) in data" :key="index">
      <HomeTopicCard :topic="topic" :is-transparent="true" />
    </template>
  </KunCard>
</template>
