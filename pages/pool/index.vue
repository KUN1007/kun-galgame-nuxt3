<script setup lang="ts">
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
