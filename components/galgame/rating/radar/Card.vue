<script setup lang="ts">
import {
  KUN_GALGAME_RATING_RECOMMEND_MAP,
  KUN_GALGAME_RATING_RECOMMEND_COLOR_MAP,
  KUN_GALGAME_RATING_SPOILER_MAP,
  KUN_GALGAME_RATING_SPOILER_COLOR_MAP,
  KUN_GALGAME_RATING_PLAY_STATUS_MAP
} from '~/constants/galgame-rating'
import type { GalgamePageRatingCard } from '~/types/api/galgame-rating'

defineProps<{
  ratings: GalgamePageRatingCard[]
}>()
</script>

<template>
  <KunScrollShadow
    class-name="scrollbar-visible"
    :draggable="true"
    axis="horizontal"
    shadow-size="5rem"
  >
    <div class="flex" v-for="rating in ratings" :key="rating.id">
      <KunCard
        :is-transparent="false"
        :is-pressable="false"
        :is-hoverable="false"
        class-name="max-w-80"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <KunUser :disable-floating="true" :user="rating.user" />
            <span class="text-default-500 text-sm">
              {{ formatTimeDifference(rating.created) }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span
              class="text-warning flex shrink-0 items-center text-xl font-bold"
            >
              {{ `${rating.overall}` }}
              <span class="text-default-500 ml-1.5 text-sm">/ 10 </span>
            </span>
          </div>
        </div>

        <div class="flex gap-2">
          <GalgameRatingRadar
            :model-value="{ ...rating }"
            :size="100"
            :readonly="true"
            label-class="text-[10px]"
          />
          <KunScrollShadow
            v-if="rating.short_summary"
            axis="vertical"
            shadow-size="3rem"
            class-name="max-h-[110px]"
            class="text-default-700 text-sm"
          >
            <KunContentText :content="rating.short_summary" />
          </KunScrollShadow>
        </div>

        <div class="text-default-500 flex flex-wrap items-center gap-2">
          <KunBadge
            class-name="shrink-0"
            :color="KUN_GALGAME_RATING_RECOMMEND_COLOR_MAP[rating.recommend]"
          >
            {{ KUN_GALGAME_RATING_RECOMMEND_MAP[rating.recommend] }}
          </KunBadge>
          <KunBadge color="primary">
            {{ KUN_GALGAME_RATING_PLAY_STATUS_MAP[rating.play_status] }}
          </KunBadge>
          <KunBadge
            :color="KUN_GALGAME_RATING_SPOILER_COLOR_MAP[rating.spoiler_level]"
          >
            {{ KUN_GALGAME_RATING_SPOILER_MAP[rating.spoiler_level] }}
          </KunBadge>
        </div>

        <div class="text-default-500 flex flex-wrap items-center gap-3 text-xs">
          <span class="flex items-center gap-1">
            <KunIcon name="lucide:eye" />
            {{ rating.view }}
          </span>
          <span class="flex items-center gap-1">
            <KunIcon name="lucide:thumbs-up" />
            {{ rating.likeCount }}
          </span>
          <KunLink
            :to="`/galgame-rating/${rating.id}`"
            size="sm"
            class-name="ml-auto"
          >
            阅读详情 >
          </KunLink>
        </div>
      </KunCard>
    </div>
  </KunScrollShadow>
</template>
