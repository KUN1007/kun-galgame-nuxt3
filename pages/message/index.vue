<script setup lang="ts">
definePageMeta({
  layout: 'message'
})

const { t } = useI18n()
const { messageStatus } = storeToRefs(useTempSettingStore())

useHead({
  title: `${t('seo.kungalgame.title')} - ${t('head.title')}`,
  meta: [
    {
      name: 'description',
      content: t('seo.kungalgame.description')
    }
  ]
})

onMounted(() => (messageStatus.value = 'online'))
</script>

<template>
  <div>Default Page</div>
</template>

<style lang="scss" scoped></style>
