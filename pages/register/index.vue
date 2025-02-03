<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: `${t('seo.register.title')} - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: t('seo.register.description')
    }
  ]
})
</script>

<template>
  <div class="root">
    <Register />

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.root {
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 80rem;
  margin: 0 auto;
  @include kun-center;
}
</style>
