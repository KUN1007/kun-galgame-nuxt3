<script setup lang="ts">
import { languageItems } from '~/components/edit/utils/options'

const { locale } = useI18n()
const introductionLanguage = ref(locale.value)

defineProps<{
  introduction: KunLanguage
}>()
</script>

<template>
  <KunHeader :size="2">
    <template #header>
      {{ $t('galgame.introduction.name') }}
    </template>
  </KunHeader>

  <KunNav
    class="nav"
    :items="languageItems"
    :default-value="introductionLanguage"
    @set="(value) => (introductionLanguage = value)"
  />

  <KunContent
    :content="
      getPreferredLanguageText(introduction, introductionLanguage as Language)
    "
  />
</template>

<style lang="scss" scoped>
h2 {
  margin: 17px 0;
}

.kungalgame-galgame-content {
  width: 100%;
  font-size: 15px;
  color: var(--kungalgame-font-color-3);
  overflow-x: auto;

  :deep(.milkdown) {
    padding: 0;
  }
}
</style>
