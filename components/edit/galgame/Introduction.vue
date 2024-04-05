<script setup lang="ts">
import { languageItems } from '../utils/options'

defineProps<{
  introductionLanguage: Language
  isSuccess: boolean
}>()

const emits = defineEmits<{
  set: [value: Language]
}>()
</script>

<template>
  <KunHeader :size="2" :show-help="true">
    <template #header>{{ $t('edit.galgame.introduction.name') }}</template>

    <template #help>{{ $t('edit.galgame.introduction.help') }}</template>
  </KunHeader>

  <KunNav
    class="nav"
    :items="languageItems"
    :default-value="introductionLanguage"
    @set="(value) => emits('set', value as Language)"
  />
  <EditGalgameEditor :lang="introductionLanguage" :pending="isSuccess" />
</template>

<style lang="scss" scoped>
.nav {
  margin-bottom: 17px;
}
</style>
