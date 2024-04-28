<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  galgame: GalgameDetail
}>()

provide<GalgameDetail>('galgame', props.galgame)
</script>

<template>
  <div class="galgame">
    <GalgameTitle :galgame="galgame" />

    <GalgameIntroduction :introduction="galgame.introduction" />

    <GalgameInfo :galgame="galgame" />

    <GalgameResource />

    <GalgameLink />

    <GalgamePrContainer />

    <KunDivider />

    <GalgameContributor :views="galgame.views" />

    <GalgameFooter />

    <KunDivider />

    <GalgameCommentContainer :to-user="galgame.user" />
  </div>
</template>

<style lang="scss" scoped></style>
