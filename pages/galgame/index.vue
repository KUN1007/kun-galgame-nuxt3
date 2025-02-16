<script setup lang="ts">
useHead({
  title: `${t('seo.galgame.title')} - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: t('seo.galgame.description')
    }
  ]
})
</script>

<template>
  <div class="root">
    <GalgameCardNav />

    <GalgameCardContainer />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 80rem;
  margin: 0 auto;
  color: var(--kungalgame-font-color-3);
}
</style>
