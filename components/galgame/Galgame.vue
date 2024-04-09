<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const { locale } = useI18n()
const introductionLanguage = ref(locale.value)

const props = defineProps<{
  gid: number
  galgame: GalgameDetail
}>()
</script>

<template>
  <div class="title">
    <h1>{{ getPreferredLanguageText(galgame.name, locale as Language) }}</h1>
    <NuxtImg :src="galgame.banner" />

    <GalgameIntroduction :introduction="galgame.introduction" />

    <GalgameResource />

    <h2>相关链接</h2>

    <h2>贡献历史</h2>

    <h2>其它信息</h2>
    <div>别名</div>
    <div>官网</div>

    <h2>贡献者</h2>

    <KunDivider />

    <h2>评论</h2>
    <div>发布评论</div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  h1 {
    margin-bottom: 17px;
  }

  img {
    max-width: 100%;
  }
}
</style>
