<script setup lang="ts">
definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const { messageStatus } = storeToRefs(useTempSettingStore())

useHead({ title: `消息 - ${kungal.titleShort}` })

onMounted(() => (messageStatus.value = 'online'))
</script>

<template>
  <MessageNotice />
</template>

<style lang="scss" scoped></style>
