<script setup lang="ts">
import { languageItems } from '~/components/edit/utils/options'

const introductionLanguage = ref('zh-cn')

defineProps<{
  introduction: KunLanguage
}>()
</script>

<template>
  <KunHeader :size="2">
    <template #header>介绍</template>
  </KunHeader>

  <KunTab
    class="nav"
    :items="languageItems"
    :default-value="introductionLanguage"
    @set="(value) => (introductionLanguage = value)"
  />

  <div
    class="hint"
    v-if="introduction[introductionLanguage as Language] === ''"
  >
    暂无对应翻译, 为您找到最近似的语言, 欢迎贡献翻译
  </div>

  <KunContent class="kun-content" :content="introduction['zh-cn']" />
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
