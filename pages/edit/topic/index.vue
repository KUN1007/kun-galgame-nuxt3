<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const content = ref<HTMLElement | null>(null)

const { isTopicRewriting } = storeToRefs(useTempEditStore())

useHead({ title: '发布话题' })

onBeforeRouteLeave(async (_, __, next) => {
  if (isTopicRewriting.value) {
    const res =
      await useComponentMessageStore().alert(
        '确认离开界面吗？您的更改将不会保存。'
      )
    if (res) {
      useTempEditStore().resetRewriteTopicData()
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})
</script>

<template>
  <div class="container">
    <div ref="content" class="content">
      <ClientOnly>
        <EditTopicTitle />
        <EditTopicEditor :is-show-menu="true" />
        <EditTopicFooter />
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
}

.kun-footer {
  margin: 17px 0;
}
</style>
