<script setup lang="ts">
import { galgameIntroductionLanguageTabs } from '~/constants/galgame'

const introductionLanguage = ref<Language>('zh-cn')

defineProps<{
  introduction: KunLanguage
}>()
</script>

<template>
  <div class="space-y-3">
    <KunTab
      :items="galgameIntroductionLanguageTabs"
      v-model="introductionLanguage"
      size="sm"
      variant="underlined"
    />

    <div
      class="bg-primary/20 text-primary rounded-lg p-3"
      v-if="introduction[introductionLanguage as Language] === ''"
    >
      暂无对应翻译, 为您找到最近似的语言, 欢迎贡献翻译
    </div>

    <KunCard :is-hoverable="false">
      <KunContent
        :content="getPreferredLanguageText(introduction, introductionLanguage)"
      />
    </KunCard>
  </div>
</template>
