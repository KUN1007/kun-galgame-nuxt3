<script setup lang="ts">
import {
  galgameDetailSectionTabs,
  type GalgameDetailSectionTabType
} from '~/constants/galgame'
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  galgame: GalgameDetail
}>()

provide<GalgameDetail>('galgame', props.galgame)

const { data } = await useFetch(
  `/api/galgame/${props.galgame.gid}/contributor`,
  {
    method: 'GET',
    watch: false,
    ...kungalgameResponseHandler
  }
)

const activeTab = ref<GalgameDetailSectionTabType>('comment')
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
  >
    <GalgameTitle :galgame="galgame" />

    <GalgameIntroduction :introduction="galgame.introduction" />

    <div class="space-y-3">
      <p>本游戏项目的贡献者</p>
      <div class="flex items-center gap-1" v-if="data">
        <KunTooltip
          v-for="(user, index) in data"
          :key="index"
          :text="user.name"
        >
          <KunAvatar :user="user" />
        </KunTooltip>
      </div>
    </div>

    <KunDivider />

    <GalgameResource />

    <GalgameSeries v-if="galgame.series.length" />

    <KunTab
      :items="galgameDetailSectionTabs"
      v-model="activeTab"
      inner-class-name="shadow border"
      size="sm"
    />
    <KunCard :is-hoverable="false">
      <GalgameCommentContainer
        v-if="data && activeTab === 'comment'"
        :user-data="data"
        :to-user="galgame.user"
      />
      <GalgameHistory v-if="activeTab === 'history'" />
      <GalgameLink v-if="activeTab === 'link'" />
      <GalgamePrContainer v-if="activeTab === 'pr'" />
    </KunCard>
  </KunCard>
</template>
