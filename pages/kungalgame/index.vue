<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.kungalgame.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.kungalgame.description'),
    },
  ],
})

const { locale } = useI18n()

const { showKUNGalgamePageWidth } = storeToRefs(useKUNGalgameSettingsStore())
const kungalgamePageWidth = computed(() => {
  return showKUNGalgamePageWidth.value.kungalgame + '%'
})
</script>

<template>
  <div class="content-container">
    <KungalgameAside class="aside" />

    <div class="content">
      <KungalgameContentEN v-if="locale === 'en'" />

      <KungalgameContentCN v-if="locale === 'zh'" />

      <KunFooter style="padding-bottom: 20px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  border-radius: 7px;
  height: calc(100dvh - 75px);
  transition: width 0.2s;
  width: v-bind(kungalgamePageWidth);
  margin: auto;
  display: flex;
}

.content {
  height: 100%;
  overflow-y: scroll;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  box-shadow: var(--kungalgame-shadow-0);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  position: relative;
}

@media (max-width: 1000px) {
  .content-container {
    width: 90%;
    padding: 0;
  }
}

@media (max-width: 700px) {
  .content-container {
    width: 95%;
  }

  .aside {
    display: none;
  }
}
</style>
