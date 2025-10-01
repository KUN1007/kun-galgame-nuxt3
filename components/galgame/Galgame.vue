<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'
import type { GalgamePageRatingCard } from '~/types/api/galgame-rating'

const props = defineProps<{
  galgame: GalgameDetail
}>()

const { images, isLightboxOpen, currentImageIndex } = useKunLightbox()

provide<GalgameDetail>('galgame', props.galgame)

const ratings = ref([...props.galgame.ratings])
const sortedRatings = computed(() => {
  return [...ratings.value].sort(
    (a, b) => b.short_summary.length - a.short_summary.length
  )
})

const handleRatingCreated = (newRating: GalgamePageRatingCard) => {
  ratings.value.unshift(newRating)
}
</script>

<template>
  <div class="space-y-3">
    <KunLightbox
      :images="images"
      v-model:is-open="isLightboxOpen"
      :initial-index="currentImageIndex"
    />

    <GalgameHeader
      :galgame="galgame"
      @on-rating-created="handleRatingCreated"
    />

    <GalgameTag :tags="galgame.tag" />

    <div v-if="sortedRatings.length" class="grid grid-cols-1 gap-3">
      <GalgameRatingRadarCard :ratings="sortedRatings" />
    </div>

    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <div class="md:col-span-2">
        <KunCard
          :is-hoverable="false"
          :is-transparent="false"
          content-class="space-y-12 relative"
        >
          <GalgameIntroduction :introduction="galgame.introduction" />

          <GalgameResource />

          <GalgamePatchContainer :vndb-id="galgame.vndbId" />

          <div v-if="galgame.series" class="space-y-3">
            <KunHeader
              name="Galgame 系列"
              description="Galgame 全系列所有 Galgame 作品。例如美少女万华镜 1, 2, 3, 4, 5, 雪女, 外传 就是一个 Galgame 系列"
              scale="h3"
            />
            <GalgameSeriesCard :series="galgame.series" />
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

        <KunCard
          content-class="space-y-3"
          :is-hoverable="false"
          :is-transparent="false"
        >
          <KunHeader
            name="贡献者"
            description="本游戏项目的贡献者, 计 Galgame 资源发布贡献"
            scale="h3"
          />

          <div
            class="text-default-500 flex cursor-default flex-wrap items-center gap-2"
          >
            <KunUser :user="galgame.user" />
            <span class="text-sm">
              {{
                `${formatDate(galgame.created, { isShowYear: true })} 创建本游戏`
              }}
            </span>
          </div>

          <KunAvatarGroup :users="galgame.contributor" :ellipsis="false" />
        </KunCard>

        <div class="text-default-500 flex items-center justify-center text-sm">
          部分页面数据由
          <KunLink size="sm" target="_blank" to="https://vndb.org">
            VNDB
          </KunLink>
          提供
        </div>
      </div>
    </div>
  </div>
</template>
