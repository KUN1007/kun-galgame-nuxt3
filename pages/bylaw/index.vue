<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.bylaw.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.bylaw.description'),
    },
  ],
})

const { locale } = useI18n()

const { showKUNGalgamePageWidth } = storeToRefs(useKUNGalgameSettingsStore())
const bylawPageWidth = computed(() => {
  return showKUNGalgamePageWidth.value.bylaw + '%'
})
</script>

<template>
  <div class="root">
    <div class="container">
      <BylawContentEN v-if="locale === 'en'" />

      <BylawContentCN v-if="locale === 'zh'" />

      <KunFooter style="position: absolute; bottom: 2%" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100%;
  min-height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
}

.container {
  margin: 0 auto;
  padding: 10px;
  transition: width 0.2s;
  width: v-bind(bylawPageWidth);
  max-width: 1300px;
  height: 100%;
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: var(--kungalgame-shadow-0);
  color: var(--kungalgame-font-color-3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

@media (max-width: 1000px) {
  .container {
    width: 100%;
  }
}

@media (max-width: 700px) {
  .container {
    width: 95%;
  }
}
</style>
