<script setup lang="ts">
const { isTopicRewriting } = storeToRefs(useTempEditStore())

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
  <ClientOnly>
    <KunCard
      class-name="overflow-visible min-h-[calc(100dvh-6rem)]"
      content-class="space-y-6"
      :is-hoverable="false"
      :is-transparent="false"
    >
      <EditTopicTitle />
      <EditTopicEditor />
      <EditTopicFooter />
    </KunCard>
  </ClientOnly>
</template>
