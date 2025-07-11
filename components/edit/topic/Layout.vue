<script setup lang="ts">
const tempStore = useTempEditStore()

onBeforeRouteLeave(async (to, from, next) => {
  if (tempStore.isTopicRewriting) {
    const res =
      await useComponentMessageStore().alert(
        '确认离开界面吗？您的更改将不会保存。'
      )
    if (res) {
      tempStore.resetRewriteTopicData()
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
    <div class="grid grid-cols-1 gap-3 lg:grid-cols-3">
      <KunCard
        :is-hoverable="false"
        :is-pressable="false"
        :is-transparent="false"
        class-name="lg:col-span-1"
        content-class="space-y-6"
      >
        <EditTopicMetadataEditor />
        <EditTopicSpecialNotice />
        <EditTopicSubmitActions />
      </KunCard>

      <div class="space-y-3 lg:col-span-2">
        <KunCard
          :is-hoverable="false"
          :is-pressable="false"
          :is-transparent="false"
        >
          <EditTopicTitle />
        </KunCard>
        <KunCard
          :is-hoverable="false"
          :is-pressable="false"
          :is-transparent="false"
        >
          <EditTopicEditor />
        </KunCard>
      </div>
    </div>
  </ClientOnly>
</template>
