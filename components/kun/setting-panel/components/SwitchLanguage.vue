<script setup lang="ts">
import { watch } from 'vue'

import { useKUNGalgameSettingsStore } from '~/store/modules/settings'
import { storeToRefs } from 'pinia'

const i18n = useNuxtApp().$i18n
const { showKUNGalgameLanguage } = storeToRefs(useKUNGalgameSettingsStore())

watch(
  () => showKUNGalgameLanguage.value,
  () => {
    i18n.locale.value = showKUNGalgameLanguage.value
  }
)
</script>

<template>
  <div class="set-lang">
    <span>{{ $t('header.settings.language') }}</span>
    <select class="select" v-model="showKUNGalgameLanguage">
      <option
        v-for="(lang, index) in i18n.availableLocales"
        :key="index"
        :value="lang"
      >
        {{ $t(`header.settings.${lang}`) }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.set-lang {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.select {
  width: 100px;
  font-size: 16px;
  color: var(--kungalgame-font-color-3);
  border: 1px solid var(--kungalgame-blue-4);
  background-color: var(--kungalgame-trans-white-9);

  option {
    background-color: var(--kungalgame-white);
  }
}
</style>
