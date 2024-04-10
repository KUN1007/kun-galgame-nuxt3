<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

defineProps<{
  galgame: GalgameDetail
}>()
</script>

<template>
  <div class="galgame">
    <GalgameTitle :galgame="galgame" />

    <GalgameIntroduction :introduction="galgame.introduction" />

    <GalgameInfo :galgame="galgame" />

    <GalgameResource />

    <h2>相关链接</h2>

    <h2>贡献历史</h2>

    <h2>贡献者</h2>

    <KunDivider />

    <h2>评论</h2>
    <div>发布评论</div>
  </div>
</template>

<style lang="scss" scoped></style>
