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

const activeTab = ref<GalgameDetailSectionTabType>('comment')
</script>

<template>
  <div class="space-y-3">
    <GalgameHeader :galgame="galgame" />

    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <KunCard
        :is-hoverable="false"
        :is-transparent="false"
        content-class="space-y-6 relative"
        class-name="w-full h-full md:col-span-2"
      >
        <GalgameIntroduction :introduction="galgame.introduction" />

        <KunDivider />

        <GalgameResource />

        <GalgameSeries v-if="galgame.series" />

        <KunTab
          :items="galgameDetailSectionTabs"
          v-model="activeTab"
          variant="underlined"
          size="sm"
        />
        <KunCard :is-hoverable="false">
          <GalgameCommentContainer
            v-if="activeTab === 'comment'"
            :user-data="galgame.contributor"
            :target-user="galgame.user"
          />
          <GalgameHistory v-if="activeTab === 'history'" />
          <GalgameLink v-if="activeTab === 'link'" />
          <GalgamePrContainer v-if="activeTab === 'pr'" />
        </KunCard>
      </KunCard>

      <div class="space-y-3 md:col-span-1">
        <GalgameInfo :galgame="galgame" />

        <KunCard :is-hoverable="false" :is-transparent="false">
          <GalgameHistory />
        </KunCard>

        <KunCard :is-hoverable="false" :is-transparent="false">
          <KunHeader
            name="贡献者"
            description="本游戏项目的贡献者, 计 Galgame 资源贡献"
            scale="h3"
            :is-show-divider="false"
          />
          <div class="flex items-center gap-1">
            <KunTooltip
              v-for="(user, index) in galgame.contributor"
              :key="index"
              :text="user.name"
            >
              <KunAvatar :user="user" />
            </KunTooltip>
          </div>
        </KunCard>
      </div>
    </div>
  </div>
</template>
