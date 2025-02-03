<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: `${t('seo.pool.title')} - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: t('seo.pool.description')
    }
  ]
})
</script>

<template>
  <PoolContainer />
</template>

<style lang="scss" scoped></style>
