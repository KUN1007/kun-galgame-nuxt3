<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  galgame: GalgameDetail
}>()

provide<GalgameDetail>('galgame', props.galgame)
</script>

<template>
  <div class="space-y-3">
    <GalgameHeader :galgame="galgame" />

    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <div class="md:col-span-2">
        <KunCard
          :is-hoverable="false"
          :is-transparent="false"
          content-class="space-y-6 relative"
        >
          <GalgameIntroduction :introduction="galgame.introduction" />

          <KunDivider />

          <GalgameResource />

          <GalgameSeries v-if="galgame.series" />

          <GalgameCommentContainer
            :user-data="galgame.contributor"
            :target-user="galgame.user"
          />
        </KunCard>
      </div>

      <div class="space-y-3 md:col-span-1">
        <GalgameInfo :galgame="galgame" />

        <KunCard :is-hoverable="false" :is-transparent="false">
          <GalgameLink />
        </KunCard>

        <KunCard :is-hoverable="false" :is-transparent="false">
          <GalgameHistory />
        </KunCard>

        <KunCard :is-hoverable="false" :is-transparent="false">
          <GalgamePrContainer />
        </KunCard>

        <KunCard :is-hoverable="false" :is-transparent="false">
          <KunHeader
            name="贡献者"
            description="本游戏项目的贡献者, 计 Galgame 资源发布贡献"
            scale="h3"
            :is-show-divider="false"
          />
          <div class="flex flex-wrap items-center gap-1">
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
