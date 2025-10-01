<script setup lang="ts">
import {
  KUN_GALGAME_RATING_RECOMMEND_MAP,
  KUN_GALGAME_RATING_RECOMMEND_COLOR_MAP,
  KUN_GALGAME_RATING_PLAY_STATUS_MAP,
  KUN_GALGAME_RATING_SPOILER_MAP,
  KUN_GALGAME_RATING_SPOILER_COLOR_MAP,
  KUN_GALGAME_DIMENSIONS,
  KUN_GALGAME_DIM_LABELS,
  KUN_GALGAME_DIM_DESCRIPTIONS
} from '~/constants/galgame-rating'
import { calcGalgameRating } from '~/algorithms/GalgameRatingAlg'
import type { GalgameRatingDetails } from '~/types/api/galgame-rating'

const props = defineProps<{
  ratingId: number
  data: GalgameRatingDetails
}>()

const { id: uid, role } = usePersistUserStore()

const canEdit = computed(() => props.data.user.id === uid)
const canDelete = computed(() => props.data.user.id === uid || role >= 2)
const rating = computed(() =>
  calcGalgameRating(
    { ...props.data },
    props.data.overall,
    props.data.play_status as 'not_started',
    props.data.recommend as 'no'
  )
)

const isEditOpen = ref(false)

const handleDeleteRating = async () => {
  if (!uid) {
    useMessage('请登陆后再操作', 'warn', 7000)
    return
  }

  const ok = await useComponentMessageStore().alert(
    '确认删除评分？',
    '删除操作不可恢复'
  )
  if (!ok) {
    return
  }

  const res = await $fetch(`/api/galgame-rating/${props.data.id}`, {
    method: 'DELETE',
    query: { galgameRatingId: props.data.id },
    watch: false,
    ...kungalgameResponseHandler
  })
  if (res) {
    useMessage('删除成功', 'success')
    await navigateTo(`/galgame/${props.data.galgameId}`)
  }
}
</script>

<template>
  <div class="space-y-3">
    <KunCard
      :is-transparent="false"
      :is-hoverable="false"
      content-class="space-y-3"
    >
      <GalgameRatingDetailGalgame :galgame="data.galgame" />
    </KunCard>

    <KunCard
      :is-transparent="false"
      :is-hoverable="false"
      content-class="space-y-3"
    >
      <div class="flex flex-wrap gap-6">
        <div class="flex flex-1 flex-col gap-3">
          <div class="flex items-center gap-3">
            <KunAvatar
              class-name="size-15"
              image-class-name="size-15"
              :user="data.user"
            />

            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-3 text-lg font-bold sm:text-xl">
                <span>
                  {{ data.user.name }}
                </span>

                <KunBadge size="md" color="primary">
                  {{ KUN_GALGAME_RATING_PLAY_STATUS_MAP[data.play_status] }}
                </KunBadge>
              </div>

              <div class="text-default-500 flex items-center gap-2 text-sm">
                <KunIcon name="lucide:calendar" />
                {{
                  formatDate(data.created, {
                    isShowYear: true,
                    isPrecise: true
                  })
                }}
              </div>
            </div>

            <div class="ml-auto flex flex-col items-center">
              <span
                class="text-warning flex items-center gap-1 text-3xl font-bold"
              >
                <KunIcon class-name="text-2xl" name="lucide:lollipop" />
                {{ rating }}
              </span>
              <span class="text-default text-sm">
                {{ `含用户总评 ${data.overall}` }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div class="text-default-500 text-sm">推荐程度</div>
            <KunBadge
              :color="KUN_GALGAME_RATING_RECOMMEND_COLOR_MAP[data.recommend]"
            >
              {{ KUN_GALGAME_RATING_RECOMMEND_MAP[data.recommend] }}
            </KunBadge>
            <span class="bg-default-300 h-3 w-px" />
            <div class="text-default-500 text-sm">剧透程度</div>
            <KunBadge
              :color="KUN_GALGAME_RATING_SPOILER_COLOR_MAP[data.spoiler_level]"
            >
              {{ KUN_GALGAME_RATING_SPOILER_MAP[data.spoiler_level] }}
            </KunBadge>
          </div>

          <div
            v-if="data.short_summary"
            class="text-default-700 leading-7 whitespace-pre-wrap"
          >
            <KunContent :content="data.short_summary" />
          </div>
        </div>

        <GalgameRatingRadar
          :model-value="{
            art: data.art,
            story: data.story,
            music: data.music,
            character: data.character,
            route: data.route,
            system: data.system,
            voice: data.voice,
            replay_value: data.replay_value
          }"
          :readonly="true"
          :size="300"
        />
      </div>

      <div class="mt-4">
        <KunHeader
          name="维度说明"
          description="各维度对应分值的文字解释"
          scale="h3"
        />
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div
            v-for="dim in KUN_GALGAME_DIMENSIONS"
            :key="dim"
            class="rounded-lg border p-3"
          >
            <div class="mb-1 flex items-center justify-between">
              <span class="font-medium">
                {{ KUN_GALGAME_DIM_LABELS[dim] }}
              </span>
              <KunBadge color="secondary">{{ data[dim] }}</KunBadge>
            </div>
            <p class="text-default-500 text-sm">
              {{ KUN_GALGAME_DIM_DESCRIPTIONS[dim][data[dim]] }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="data.likedUsers?.length"
        class="flex flex-wrap items-center gap-2"
      >
        <KunAvatarGroup :users="data.likedUsers" :ellipsis="false" />
        <span class="text-default-500 text-sm">点赞了评分</span>
      </div>

      <div class="flex items-center gap-2">
        <GalgameRatingDetailLike
          :rating-id="data.id"
          :target-user-id="data.user.id"
          :like-count="data.likeCount"
          :is-liked="data.isLiked"
        />

        <KunButton
          v-if="canEdit"
          size="sm"
          variant="flat"
          @click="isEditOpen = true"
        >
          <KunIcon name="lucide:pencil" /> 编辑评分
        </KunButton>

        <KunButton
          v-if="canDelete"
          size="sm"
          color="danger"
          variant="light"
          @click="handleDeleteRating"
        >
          <KunIcon name="lucide:trash-2" /> 删除评分
        </KunButton>
      </div>
    </KunCard>

    <GalgameRatingCommentContainer
      v-if="data"
      :rating-id="data.id"
      :rating-author="data.user"
      :comments="data.comments"
    />

    <template v-if="data?.galgameSeries">
      <KunHeader
        name="所属 Galgame 系列"
        description="该作品所属的 Galgame 系列"
        scale="h3"
      />
      <GalgameSeriesCard :series="data.galgameSeries" />
    </template>

    <GalgameRatingPublish
      v-if="data && canEdit"
      v-model:modal-value="isEditOpen"
      :galgame-id="data.galgameId"
      :initial-data="{
        galgameRatingId: data.id,
        recommend: data.recommend as 'no',
        overall: data.overall,
        play_status: data.play_status as 'not_started',
        spoiler_level: data.spoiler_level as 'none',
        short_summary: data.short_summary,
        art: data.art,
        story: data.story,
        music: data.music,
        character: data.character,
        route: data.route,
        system: data.system,
        voice: data.voice,
        replay_value: data.replay_value,
        galgameType: data.galgameType
      }"
    />
  </div>
</template>
