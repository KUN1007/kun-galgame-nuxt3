<script setup lang="ts">
import {
  KUN_GALGAME_RATING_RECOMMEND_CONST,
  KUN_GALGAME_RATING_RECOMMEND_MAP,
  KUN_GALGAME_RATING_PLAY_STATUS_CONST,
  KUN_GALGAME_RATING_PLAY_STATUS_MAP,
  KUN_GALGAME_RATING_SPOILER_CONST,
  KUN_GALGAME_RATING_SPOILER_MAP
} from '~/constants/galgame-rating'
import {
  createGalgameRatingSchema,
  updateGalgameRatingSchema
} from '~/validations/galgame-rating'
import type { GalgamePageRatingCard } from '~/types/api/galgame-rating'

type RatingInitialData = {
  galgameRatingId: number
  recommend: (typeof KUN_GALGAME_RATING_RECOMMEND_CONST)[number]
  overall: number
  play_status: (typeof KUN_GALGAME_RATING_PLAY_STATUS_CONST)[number]
  spoiler_level: (typeof KUN_GALGAME_RATING_SPOILER_CONST)[number]
  short_summary: string
  art: number
  story: number
  music: number
  character: number
  route: number
  system: number
  voice: number
  replay_value: number
  galgameType?: string[]
}

const props = defineProps<{
  galgameId: number
  modalValue: boolean
  initialData?: RatingInitialData
}>()

const emits = defineEmits<{
  'update:modalValue': [value: boolean]
  onUpdated: []
  onPublished: [GalgamePageRatingCard]
}>()

const recommend =
  ref<(typeof KUN_GALGAME_RATING_RECOMMEND_CONST)[number]>('neutral')
const playStatus =
  ref<(typeof KUN_GALGAME_RATING_PLAY_STATUS_CONST)[number]>('not_started')
const spoilerLevel =
  ref<(typeof KUN_GALGAME_RATING_SPOILER_CONST)[number]>('none')
const overall = ref(1)
const shortSummary = ref('')

const showAdvanced = ref(false)
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
  if (val <= 0) return
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
const spoilerOptions = computed(() =>
  (KUN_GALGAME_RATING_SPOILER_CONST as readonly string[]).map((v) => ({
    value: v,
    label: KUN_GALGAME_RATING_SPOILER_MAP[v] || v
  }))
)

const close = () => emits('update:modalValue', false)
const isEditing = computed(() => !!props.initialData?.galgameRatingId)

watch(
  () => props.modalValue,
  (open) => {
    if (open && props.initialData) {
      recommend.value = props.initialData.recommend
      playStatus.value = props.initialData.play_status
      spoilerLevel.value = props.initialData.spoiler_level
      overall.value = props.initialData.overall
      shortSummary.value = props.initialData.short_summary || ''
      dims.value = {
        art: props.initialData.art,
        story: props.initialData.story,
        music: props.initialData.music,
        character: props.initialData.character,
        route: props.initialData.route,
        system: props.initialData.system,
        voice: props.initialData.voice,
        replay_value: props.initialData.replay_value
      }
      showAdvanced.value = true
    }
  }
)

const resetForm = () => {
  recommend.value = 'neutral'
  playStatus.value = 'not_started'
  spoilerLevel.value = 'none'
  overall.value = 1
  shortSummary.value = ''
  showAdvanced.value = false
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
}

const submit = async () => {
  if (isEditing.value) {
    const body = {
      galgameRatingId: props.initialData!.galgameRatingId,
      recommend: recommend.value,
      overall: overall.value,
      play_status: playStatus.value,
      spoiler_level: spoilerLevel.value,
      short_summary: shortSummary.value,
      art: dims.value.art,
      story: dims.value.story,
      music: dims.value.music,
      character: dims.value.character,
      route: dims.value.route,
      system: dims.value.system,
      voice: dims.value.voice,
      replay_value: dims.value.replay_value,
      galgameType: props.initialData?.galgameType ?? []
    }
    const valid = useKunSchemaValidator(updateGalgameRatingSchema, body)
    if (!valid) {
      return
    }

    isSubmitting.value = true
    const res = await $fetch(
      `/api/galgame-rating/${props.initialData!.galgameRatingId}`,
      {
        method: 'PUT',
        body,
        watch: false,
        ...kungalgameResponseHandler
      }
    )
    isSubmitting.value = false
    if (res) {
      useMessage('更新成功', 'success')
      emits('onUpdated')
      close()
    }
  } else {
    const body = {
      galgameId: props.galgameId,
      recommend: recommend.value,
      overall: overall.value,
      play_status: playStatus.value,
      spoiler_level: spoilerLevel.value,
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
    const valid = useKunSchemaValidator(createGalgameRatingSchema, body)
    if (!valid) return

    isSubmitting.value = true
    const res = await $fetch('/api/galgame-rating', {
      method: 'POST',
      body,
      watch: false,
      ...kungalgameResponseHandler
    })
    isSubmitting.value = false
    if (res) {
      useMessage('发布成功', 'success')
      resetForm()
      close()
      emits('onPublished', res)
    }
  }
}
</script>

<template>
  <KunModal
    :modal-value="modalValue"
    @update:modal-value="(v) => emits('update:modalValue', v)"
    inner-class-name="max-w-[780px] w-[90vw]"
    :is-dismissable="false"
  >
    <div class="space-y-3">
      <KunHeader
        :name="isEditing ? '编辑评分' : '发布评分'"
        description="发布对本作的评分与短评，支持高级维度评分。"
        scale="h3"
      />

      <div class="flex items-end gap-6">
        <div class="flex flex-col gap-1">
          <label class="text-sm">总体评分 (1-10)</label>
          <KunRating v-model="overall" :max="10" aria-label="overall" />
        </div>

        <span class="text-warning-500 text-4xl font-bold">{{ overall }}</span>
      </div>

      <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
        <KunSelect
          :options="recommendOptions"
          v-model="recommend"
          label="推荐程度"
        />
        <KunSelect
          :options="playStatusOptions"
          v-model="playStatus"
          label="游玩状态"
        />
        <KunSelect
          :options="spoilerOptions"
          v-model="spoilerLevel"
          label="剧透程度"
        />
      </div>

      <KunTextarea
        v-model="shortSummary"
        label="短评（请勿包含 R18 内容）"
        :rows="4"
        placeholder="「 枯れない世界と終わる花 」莲真的是我遇见最好的女孩子, 想和她结婚天长地久恩恩爱爱百年好合, 想和她翻云覆雨、干湿分离、水乳交融、干柴烈火, 日日夜夜每时每刻每个开心难过七滋八味苦辣麻香咸的日子里都在想念、挚爱、铭记着莲, 你们懂这种心情吗！！！这已经不是爱了, 这种东西叫本能, 我只是本能的爱着这个孩子而已, 我无法控制自己的本能, 我已经病入膏肓了, 病名为莲。"
        :maxlength="1314"
        :show-char-count="true"
        auto-grow
      />

      <div class="flex items-center justify-between">
        <KunButton variant="flat" @click="showAdvanced = !showAdvanced">
          {{ showAdvanced ? '收起高级评分' : '展开高级评分' }}
        </KunButton>
        <div class="flex items-center gap-2">
          <KunButton variant="light" color="default" @click="close">
            取消
          </KunButton>
          <KunButton :loading="isSubmitting" @click="submit">
            {{ isEditing ? '更新' : '提交' }}
          </KunButton>
        </div>
      </div>

      <p class="text-default-500 text-sm">
        如需长评，建议前往主题区发布主题贴。
      </p>

      <div v-if="showAdvanced" class="pt-2">
        <GalgameRatingAdvanced v-model="dims" />
      </div>
    </div>
  </KunModal>
</template>
