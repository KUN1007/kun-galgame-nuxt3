<script setup lang="ts">
useHead({
  title: `${t('seo.login.title')} - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: t('seo.login.description')
    }
  ]
})
</script>

<template>
  <div class="root">
    <Login />

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
