<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.forgot.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.forgot.description'),
    },
  ],
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="title">{{ $t('forgot.title') }}</div>

      <ForgotPassword />

      <div class="nav">
        <KunBackToPrevious />
        <KunBackToHome />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100vh - 75px);
  width: 100vw;
  display: flex;
  color: var(--kungalgame-font-color-3);
}

.container {
  margin: auto;
  width: 300px;
  height: 400px;
  background-color: var(--kungalgame-trans-white-2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.title {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  font-size: large;
  background-color: var(--kungalgame-blue-5);
  border-radius: 10px 10px 0 0;
  color: var(--kungalgame-white);
}

.nav {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>
