<script setup lang="ts">
import { galgameIntroductionLanguageTabs } from '~/constants/galgame'

const introductionLanguage = ref<Language>('zh-cn')

defineProps<{
  introduction: KunLanguage
}>()
</script>

<template>
  <div class="space-y-3">
    <KunHeader
      name="游戏介绍"
      description="Galgame 的简体中文, 繁体中文, 英语, 日语 介绍。英语介绍来源于 VNDB, 日语介绍来源于游戏官网"
      scale="h2"
    >
      <template #endContent>
        <KunTab
          :items="galgameIntroductionLanguageTabs"
          v-model="introductionLanguage"
          size="sm"
          variant="underlined"
        />
      </template>
    </KunHeader>

    <div
      class="bg-primary/20 text-primary rounded-lg p-3"
      v-if="introduction[introductionLanguage as Language] === ''"
    >
      暂无对应翻译, 为您找到最近似的语言, 欢迎贡献翻译
    </div>

    <KunContent
      :content="getPreferredLanguageText(introduction, introductionLanguage)"
    />
  </div>
</template>
