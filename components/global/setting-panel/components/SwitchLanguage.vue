<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useKUNGalgameSettingsStore } from '@/store/modules/settings'
import { storeToRefs } from 'pinia'

const { showKUNGalgameLanguage } = storeToRefs(useKUNGalgameSettingsStore())
const { locale } = useI18n({ useScope: 'global' })

watch(showKUNGalgameLanguage, () => {
  locale.value = showKUNGalgameLanguage.value
})
</script>

<template>
  <div class="set-lang">
    <span>{{ $tm('header.settings.language') }}</span>
    <select class="select" v-model="showKUNGalgameLanguage">
      <option value="en">English</option>
      <option value="zh">中文</option>
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
