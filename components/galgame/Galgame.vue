<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  galgame: GalgameDetail
}>()

provide<GalgameDetail>('galgame', props.galgame)

const { data, pending } = await useLazyFetch(
  `/api/galgame/${props.galgame.gid}/contributor`,
  {
    method: 'GET',
    watch: false,
    ...kungalgameResponseHandler
  }
)
</script>

<template>
  <div class="galgame">
    <GalgameTitle :galgame="galgame" />

    <GalgameIntroduction :introduction="galgame.introduction" />

    <GalgameInfo :galgame="galgame" />

    <GalgameResource />

    <GalgameSeries v-if="galgame.series.length" />

    <GalgameLink />

    <GalgamePrContainer />

    <KunDivider />

    <GalgameContributor
      v-if="data"
      :data="data"
      :pending="pending"
      :views="galgame.views"
    />

    <GalgameFooter />

    <KunDivider />

    <GalgameCommentContainer
      v-if="data"
      :user-data="data"
      :to-user="galgame.user"
    />
  </div>
</template>

<style lang="scss" scoped></style>
