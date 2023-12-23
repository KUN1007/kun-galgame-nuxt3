<script setup lang="ts">
const ReplyPanel = defineAsyncComponent(
  () => import('~/components/topic/reply/Panel.vue')
)

const route = useRoute()
const tid = computed(() => {
  return parseInt((route.params as { tid: string }).tid)
})
</script>

<template>
  <div class="root">
    <ReplyPanel />

    <Topic :tid="tid" />

    <TopicBar />
  </div>
</template>

<style lang="scss" scoped>
.root {
  min-height: calc(100vh - 65px);
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
}
</style>
