<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  galgame: GalgameDetail
}>()

const { images, isLightboxOpen, currentImageIndex } = useKunLightbox()

provide<GalgameDetail>('galgame', props.galgame)
</script>

<template>
  <div class="space-y-3">
    <KunLightbox
      :images="images"
      v-model:is-open="isLightboxOpen"
      :initial-index="currentImageIndex"
    />

    <GalgameHeader :galgame="galgame" />

    <GalgameTag :tags="galgame.tag" />

    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <div class="md:col-span-2">
        <KunCard
          :is-hoverable="false"
          :is-transparent="false"
          content-class="space-y-12 relative"
        >
          <GalgameIntroduction :introduction="galgame.introduction" />

          <GalgameResource />

          <div class="space-y-3">
            <KunHeader
              name="Galgame 系列"
              description="Galgame 全系列所有 Galgame 作品。例如美少女万华镜 1, 2, 3, 4, 5, 雪女, 外传 就是一个 Galgame 系列"
              scale="h3"
              :is-show-divider="false"
            />
            <GalgameSeriesCard v-if="galgame.series" :series="galgame.series" />
          </div>

          <GalgameCommentContainer
            :user-data="galgame.contributor"
            :target-user="galgame.user"
          />
        </KunCard>
      </div>

      <div class="space-y-3 md:col-span-1">
        <GalgameInfo
          :official="galgame.official"
          :engine="galgame.engine"
          :age-limit="galgame.ageLimit"
          :original-language="galgame.originalLanguage"
        />

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
