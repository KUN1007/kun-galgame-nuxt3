<script setup lang="ts">
const { data } = await useFetch(`/api/home`, {
  method: 'GET',
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="flex flex-col justify-between gap-3 rounded-lg lg:flex-row">
    <div class="w-full space-y-3">
      <HomeCarousel />

      <HomeTopicContainer v-if="data" :topics="data.topics" />

      <HomeGalgameContainer v-if="data" :galgames="data.galgames" />

      <HomeFooter />
    </div>

    <div class="w-full shrink-0 space-y-3 lg:w-72">
      <HomeAsideRecent v-if="data" :activities="data.activities" />

      <HomeAsideHelp />
    </div>
  </div>
</template>
