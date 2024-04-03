<script setup lang="ts">
import { languageItems } from './items'

defineProps<{
  introductionLanguage: Language
  isSuccess: boolean
}>()

const emits = defineEmits<{
  set: [value: Language]
}>()
</script>

<template>
  <h2>请输入 Galgame 介绍</h2>
  <KunNav
    class="nav"
    :items="languageItems"
    :default-value="introductionLanguage"
    @set="(value) => emits('set', value as Language)"
  />
  <EditGalgameEditor :lang="introductionLanguage" :pending="isSuccess" />
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 17px;
}

.nav {
  margin-bottom: 17px;
}
</style>
