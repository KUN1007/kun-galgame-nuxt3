<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.technique.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.technique.description'),
    },
  ],
})

const { showKUNGalgamePageWidth } = storeToRefs(useKUNGalgameSettingsStore())

const techniquePageWidth = computed(() => {
  return showKUNGalgamePageWidth.value.technique + '%'
})
</script>

<template>
  <div class="root">
    <div class="content">
      <!-- TODO: -->
      <h1 style="margin: auto">
        {{ $t('technique.KKKKK') }}
      </h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100vh - 65px);
  display: flex;
  flex-direction: column;
}

.content {
  padding: 5px;
  height: 100%;
  transition: width 0.2s;
  width: v-bind(techniquePageWidth);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: var(--kungalgame-trans-white-5);
  color: var(--kungalgame-font-color-3);
  border: 1px solid var(--kungalgame-trans-blue-2);
  border-radius: 5px;
  overflow-y: scroll;
}
</style>
