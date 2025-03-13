<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

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
  <EditTopicTitle />
  <!-- <EditTopicEditor :is-show-menu="true" /> -->
  <EditTopicFooter />
</template>
