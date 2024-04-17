<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/vue'
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

  <div class="kungalgame-galgame-content">
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <KunMilkdownReadOnly
          :is-readonly="true"
          :value-markdown="
            getPreferredLanguageText(
              introduction,
              introductionLanguage as Language
            )
          "
        />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  </div>
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
