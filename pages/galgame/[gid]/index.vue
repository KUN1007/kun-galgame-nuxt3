<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const galgame = ref<GalgameDetail>()
const route = useRoute()
const isBanned = ref(false)
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { data } = await useFetch(`/api/galgame/${gid.value}`, {
  method: 'GET',
  watch: false,
  ...kungalgameResponseHandler
})

if (data.value === 'banned') {
  isBanned.value = true
} else {
  galgame.value = data.value ?? undefined
}

// useHead({
//   title: topic.value?.title,
//   meta: [
//     {
//       name: 'description',
//       content: topicContentText.value
//     },
//     {
//       name: 'keywords',
//       content: topic.value?.tags.toString()
//     }
//   ]
// })
</script>

<template>
  <div class="root">
    <Galgame v-if="galgame" :gid="gid" :galgame="galgame" />

    <!-- <KunBlank v-if="!galgame && !isBanned">
      {{ $t('topic.notFound') }}
    </KunBlank>

    <KunBlank v-if="isBanned">
      {{ $t('topic.banned') }}
    </KunBlank> -->
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 64rem;
  margin: 0 auto;
  color: var(--kungalgame-font-color-3);
}
</style>
