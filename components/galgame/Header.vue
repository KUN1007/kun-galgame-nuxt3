<script setup lang="ts">
import {
  GALGAME_RESOURCE_TYPE_ICON_MAP,
  GALGAME_RESOURCE_PLATFORM_ICON_MAP
} from '~/constants/galgameResource'
import {
  KUN_GALGAME_RESOURCE_TYPE_MAP,
  KUN_GALGAME_RESOURCE_LANGUAGE_MAP,
  KUN_GALGAME_RESOURCE_PLATFORM_MAP,
  KUN_GALGAME_CONTENT_LIMIT_MAP
} from '~/constants/galgame'
import { updateGalgameBannerSchema } from '~/validations/galgame'
import type { GalgameDetail } from '~/types/api/galgame'
import type { GalgamePageRatingCard } from '~/types/api/galgame-rating'

const props = defineProps<{
  galgame: GalgameDetail
}>()

const emits = defineEmits<{
  onRatingCreated: [GalgamePageRatingCard]
}>()

const { id, role } = usePersistUserStore()

const route = useRoute()
const initialImageUrl = ref('')
const isShowUpload = ref(false)
const isPublishing = ref(false)
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})
const galgameAliasArray = computed(() => {
  const nameArray = Object.entries(props.galgame.name)
    .filter(
      ([_, value]) => value !== getPreferredLanguageText(props.galgame.name)
    )
    .map(([_, value]) => value)
  return nameArray.concat(props.galgame.alias)
})
const hasPermission = computed(() => props.galgame.user.id === id || role >= 2)

const isRatingOpen = ref(false)

const handleChangeBanner = async () => {
  const imageBlob = await getImage('kun-galgame-rewrite-banner')
  if (!imageBlob) {
    useMessage(10535, 'warn')
    return
  }

  const result = updateGalgameBannerSchema.safeParse({
    banner: imageBlob,
    galgameId: gid.value
  })
  if (!result.success) {
    const message = JSON.parse(result.error.message)[0]
    useMessage(
      `位置: ${message.path[0]} - 错误提示: ${message.message}`,
      'warn'
    )
    return
  }

  const res = await useComponentMessageStore().alert(
    '确定更新预览图吗?',
    '更改后使用 Ctrl + F5 刷新页面缓存, 即可看到更新后的图片'
  )
  if (!res) {
    return
  }

  const formData = new FormData()
  formData.append('banner', imageBlob)
  formData.append('galgameId', gid.value.toString())

  isPublishing.value = true
  const response = await $fetch(`/api/galgame/${gid.value}/banner`, {
    method: 'PUT',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (response) {
    isShowUpload.value = false
    initialImageUrl.value = ''
    await deleteImage(`kun-galgame-rewrite-banner`)
    useMessage(10537, 'success')
  }
}

onMounted(async () => {
  const imageBlob = await getImage('kun-galgame-rewrite-banner')
  if (imageBlob) {
    initialImageUrl.value = URL.createObjectURL(imageBlob)
  }
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="grid grid-cols-1 gap-3 md:grid-cols-3"
  >
    <div
      className="relative rounded-lg w-full h-full overflow-hidden md:col-span-1 aspect-video md:rounded-l-xl"
    >
      <KunImage
        data-kun-lazy-image="true"
        class="size-full cursor-pointer object-cover"
        :src="galgame.banner"
        loading="lazy"
        :alt="getPreferredLanguageText(galgame.name)"
      />

      <KunModal
        :modal-value="isShowUpload"
        @update:modal-value="(value) => (isShowUpload = value)"
      >
        <div class="flex flex-col space-y-3">
          <h2>更改 Galgame 预览图</h2>

          <KunUpload
            :initial-image="initialImageUrl"
            :size="1920"
            :aspect="16 / 9"
            hint="预览图不可包含 R18 等敏感内容"
            @set-image="(img) => saveImage(img, `kun-galgame-rewrite-banner`)"
            class-name="w-96"
          />

          <div class="flex justify-end gap-1">
            <KunButton
              color="danger"
              variant="light"
              @click="isShowUpload = false"
            >
              取消
            </KunButton>
            <KunButton
              :disabled="isPublishing"
              :loading="isPublishing"
              @click="handleChangeBanner"
            >
              确定更改
            </KunButton>
          </div>
        </div>
      </KunModal>

      <KunBadge
        variant="solid"
        class="absolute top-2 left-2"
        :color="galgame.contentLimit === 'sfw' ? 'success' : 'danger'"
      >
        <KunTooltip
          position="right"
          :text="KUN_GALGAME_CONTENT_LIMIT_MAP[galgame.contentLimit]"
        >
          {{ galgame.contentLimit.toLocaleUpperCase() }}
        </KunTooltip>
      </KunBadge>

      <KunButton
        class-name="absolute bottom-2 right-2"
        v-if="hasPermission"
        @click="isShowUpload = !isShowUpload"
      >
        更改图片 >
      </KunButton>
    </div>

    <div className="flex flex-col gap-3 md:col-span-2">
      <div class="flex flex-wrap items-center gap-2">
        <h1 class="text-3xl">
          {{ getPreferredLanguageText(galgame.name) }}
        </h1>
      </div>

      <div class="space-y-3">
        <div class="flex flex-wrap gap-2">
          <template v-for="(alias, index) in galgameAliasArray" :key="index">
            <KunBadge v-if="alias">{{ alias }}</KunBadge>
          </template>
        </div>

        <KunDivider />

        <div class="space-y-1 space-x-1">
          <KunBadge
            v-for="(t, index) in galgame.type"
            :key="index"
            color="primary"
          >
            <KunIcon :name="GALGAME_RESOURCE_TYPE_ICON_MAP[t]" />
            {{ KUN_GALGAME_RESOURCE_TYPE_MAP[t] }}
          </KunBadge>

          <KunBadge
            v-for="(lang, index) in galgame.language"
            :key="index"
            color="secondary"
          >
            <KunIcon class="icon" name="lucide:globe" />
            {{ KUN_GALGAME_RESOURCE_LANGUAGE_MAP[lang] }}
          </KunBadge>

          <KunBadge
            v-for="(platform, index) in galgame.platform"
            :key="index"
            color="success"
          >
            <KunIcon
              class="icon"
              :name="GALGAME_RESOURCE_PLATFORM_ICON_MAP[platform]"
            />
            {{ KUN_GALGAME_RESOURCE_PLATFORM_MAP[platform] }}
          </KunBadge>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1">
            <KunTooltip :text="`浏览量: ${galgame.view}`">
              <KunBadge size="md">
                <KunIcon name="lucide:eye" />
                <span>{{ formatNumber(galgame.view) }}</span>
              </KunBadge>
            </KunTooltip>

            <GalgameLike
              :galgame-id="galgame.id"
              :target-user-id="galgame.user.id"
              :like-count="galgame.likeCount"
              :is-liked="galgame.isLiked"
            />

            <GalgameFavorite
              :galgame-id="galgame.id"
              :target-user-id="galgame.user.id"
              :favorite-count="galgame.favoriteCount"
              :is-favorited="galgame.isFavorited"
            />
          </div>

          <div class="flex gap-1">
            <KunButton
              variant="shadow"
              color="primary"
              @click="isRatingOpen = true"
            >
              添加评分
            </KunButton>

            <GalgameRewrite :galgame="galgame" />

            <GalgameRatingPublish
              v-model:modal-value="isRatingOpen"
              :galgame-id="galgame.id"
              @on-published="(newRating) => emits('onRatingCreated', newRating)"
            />
          </div>
        </div>
      </div>
    </div>
  </KunCard>
</template>
