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

    <GalgameLink />

    <GalgameHistory />

    <GalgameContributor />

    <KunDivider />

    <h2>评论</h2>
    <div>发布评论</div>
  </div>
</template>

<style lang="scss" scoped></style>
