<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  galgame: GalgameDetail
}>()

const { uid, roles } = usePersistUserStore()

const initialImageUrl = ref('')
const isShowUpload = ref(false)
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})
const hasPermission = computed(
  () => props.galgame.user.uid === uid || roles >= 2
)

const handleChangeBanner = async () => {
  const imageBlob = await getImage('kun-galgame-rewrite-banner')
  if (!imageBlob) {
    useMessage(10535, 'warn')
    return
  }

  const res = await useComponentMessageStore().alert(
    '确定更新预览图吗?',
    '由于网络缓存, 您的新图片可能需要一段时间才会生效, 可以使用 Ctrl + F5 刷新页面缓存。'
  )
  if (!res) {
    return
  }

  const formData = new FormData()
  formData.append('avatar', imageBlob)

  useMessage(10536, 'info')

  const result = await $fetch(`/api/galgame/${gid.value}/banner`, {
    method: 'PUT',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
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
  <KunHeader
    :is-show-divider="false"
    :name="getPreferredLanguageText(galgame.name)"
  >
    <template #endContent>
      <div class="space-y-3">
        <div class="flex flex-wrap gap-2">
          <template v-for="(alias, index) in galgame.name" :key="index">
            <KunBadge v-if="alias">{{ alias }}</KunBadge>
          </template>
        </div>

        <KunDivider />

        <GalgameFooter />
      </div>
    </template>
  </KunHeader>

  <div class="flex flex-wrap items-start justify-between gap-3 lg:flex-nowrap">
    <div class="relative flex min-w-88 items-end justify-center">
      <NuxtImg class="rounded-lg" :src="galgame.banner" loading="lazy" />

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
            <KunButton @click="handleChangeBanner">确定更改</KunButton>
          </div>
        </div>
      </KunModal>

      <KunButton
        class-name="absolute top-0 right-0"
        v-if="hasPermission"
        @click="isShowUpload = !isShowUpload"
      >
        更改图片 >
      </KunButton>
    </div>

    <GalgameInfo :galgame="galgame" />
  </div>
</template>
