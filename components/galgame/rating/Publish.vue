<script setup lang="ts">
import {
  KUN_GALGAME_RATING_RECOMMEND_CONST,
  KUN_GALGAME_RATING_RECOMMEND_MAP,
  KUN_GALGAME_RATING_PLAY_STATUS_CONST,
  KUN_GALGAME_RATING_PLAY_STATUS_MAP,
  KUN_GALGAME_DIMENSIONS,
  KUN_GALGAME_DIM_DESCRIPTIONS,
  KUN_GALGAME_DIM_LABELS,
  type KunGalgameDim
} from '~/constants/galgame-rating'

const props = defineProps<{
  galgameId: number
  onPublished?: () => void
}>()

const recommend =
  ref<(typeof KUN_GALGAME_RATING_RECOMMEND_CONST)[number]>('neutral')
const playStatus =
  ref<(typeof KUN_GALGAME_RATING_PLAY_STATUS_CONST)[number]>('not_started')
const overall = ref(1)
const shortSummary = ref('')

const advancedOpen = ref(false)
const dims = ref({
  art: 1,
  story: 1,
  music: 1,
  character: 1,
  route: 1,
  system: 1,
  voice: 1,
  replay_value: 1
})

watch(overall, (val) => {
  if (val <= 0) {
    return
  }
  dims.value = {
    art: val,
    story: val,
    music: val,
    character: val,
    route: val,
    system: val,
    voice: val,
    replay_value: val
  }
})

const isSubmitting = ref(false)

const recommendOptions = computed(() =>
  (KUN_GALGAME_RATING_RECOMMEND_CONST as readonly string[]).map((v) => ({
    value: v,
    label: KUN_GALGAME_RATING_RECOMMEND_MAP[v] || v
  }))
)
const playStatusOptions = computed(() =>
  (KUN_GALGAME_RATING_PLAY_STATUS_CONST as readonly string[]).map((v) => ({
    value: v,
    label: KUN_GALGAME_RATING_PLAY_STATUS_MAP[v] || v
  }))
)

const validate = () => {
  if (!recommend.value) return '请选择推荐度'
  if (!overall.value) return '请选择总评分数'
  if (!playStatus.value) return '请选择游玩状态'
  if (
    (overall.value === 1 || overall.value === 10) &&
    shortSummary.value.trim().length < 100
  ) {
    return '当总评为 1 或 10 时，短评需至少 100 字'
  }
  return ''
}

const submit = async () => {
  const msg = validate()
  if (msg) return useMessage(msg, 'warn')
  isSubmitting.value = true
  const body = {
    galgameId: props.galgameId,
    recommend: recommend.value,
    overall: overall.value,
    play_status: playStatus.value,
    short_summary: shortSummary.value,
    art: dims.value.art,
    story: dims.value.story,
    music: dims.value.music,
    character: dims.value.character,
    route: dims.value.route,
    system: dims.value.system,
    voice: dims.value.voice,
    replay_value: dims.value.replay_value,
    galgameType: [] as string[]
  }

  const res = await $fetch('/api/galgame-rating', {
    method: 'POST',
    body,
    watch: false,
    ...kungalgameResponseHandler
  })
  isSubmitting.value = false
  if (res) {
    useMessage('发布评分成功', 'success')
    recommend.value = 'neutral'
    playStatus.value = 'not_started'
    overall.value = 1
    shortSummary.value = ''
    dims.value = {
      art: 1,
      story: 1,
      music: 1,
      character: 1,
      route: 1,
      system: 1,
      voice: 1,
      replay_value: 1
    }
    props.onPublished?.()
  }
}
</script>

<template>
  <div class="space-y-3">
    <div class="space-y-1">
      <label class="text-sm">总评(1-10)</label>
      <KunRating v-model="overall" :max="10" aria-label="overall" />
    </div>

    <div class="grid grid-cols-1 gap-3 md:grid-cols-4">
      <KunSelect
        :options="recommendOptions"
        v-model="recommend"
        label="推荐度"
      />
      <KunSelect
        :options="playStatusOptions"
        v-model="playStatus"
        label="游玩状态"
      />
      <div class="flex items-end justify-end gap-2">
        <KunButton variant="light" @click="advancedOpen = true">
          高级评分
        </KunButton>
        <KunButton :loading="isSubmitting" @click="submit">提交</KunButton>
      </div>
    </div>

    <KunTextarea
      v-model="shortSummary"
      label="短评"
      :rows="4"
      placeholder="可选填；当总评为 1 或 10 时需至少 100 字"
      :maxlength="1007"
      :show-char-count="true"
      auto-grow
    />

    <KunModal
      v-model:modal-value="advancedOpen"
      inner-class-name="max-w-[780px] w-[90vw]"
    >
      <KunHeader
        name="高级评分"
        description="补充八维评分，可以更准确地反映你的观感"
        scale="h3"
      />
      <GalgameRatingAdvanced v-model="dims" />
      <div class="mt-4 flex justify-end gap-2">
        <KunButton variant="light" @click="advancedOpen = false">
          关闭
        </KunButton>
        <KunButton :loading="isSubmitting" @click="submit">提交</KunButton>
      </div>
    </KunModal>
  </div>
</template>
