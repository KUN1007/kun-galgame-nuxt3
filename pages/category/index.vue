<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.category.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.category.description')
    }
  ]
})
</script>

<template>
  <div class="root">
    <Category />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 64rem;
  margin: 0 auto;
  color: var(--kungalgame-font-color-3);
}
</style>
