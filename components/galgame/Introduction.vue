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

  <div
    class="hint"
    v-if="introduction[introductionLanguage as Language] === ''"
  >
    {{ $t('galgame.introduction.hint') }}
  </div>

  <KunContent
    class="kun-content"
    :content="
      getPreferredLanguageText(introduction, introductionLanguage as Language)
    "
  />
</template>

<style lang="scss" scoped>
h2 {
  margin: 17px 0;
}

.hint {
  margin-top: 17px;
  color: var(--kungalgame-white);
  background-color: var(--kungalgame-blue-5);
  font-size: 15px;
  padding: 5px 10px;
}

.kun-content {
  width: 100%;
}
</style>
