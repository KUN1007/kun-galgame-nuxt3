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
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
  >
    <GalgameTitle :galgame="galgame" />

    <GalgameIntroduction :introduction="galgame.introduction" />

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
  </KunCard>
</template>
