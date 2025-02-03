<script setup lang="ts">
definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const { t } = useI18n()
const { messageStatus } = storeToRefs(useTempSettingStore())

useHead({
  title: `${t('seo.message.title')} - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: t('seo.message.description')
    }
  ]
})

onMounted(() => (messageStatus.value = 'online'))
</script>

<template>
  <MessageNotice />
</template>

<style lang="scss" scoped></style>
