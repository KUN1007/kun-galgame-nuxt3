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
  <KunHeader :size="1">
    <template #header>
      {{ galgame.name['zh-cn'] }}
    </template>
  </KunHeader>
  <div class="banner">
    <NuxtImg :src="galgame.banner" loading="lazy" />

    <div class="upload" v-if="isShowUpload && hasPermission">
      <span class="close" @click="isShowUpload = false">
        <Icon class="icon" name="lucide:x" />
      </span>
      <KunUpload
        width="300px"
        :initial-image="initialImageUrl"
        :size="1920"
        :aspect="16 / 9"
        placeholder="预览图不可包含 R18 等敏感内容\n宽度大于高度为好"
        @set-image="(img) => saveImage(img, `kun-galgame-rewrite-banner`)"
      />
      <span class="confirm" @click="handleChangeBanner">确定更改</span>
    </div>
    <span
      v-if="hasPermission"
      class="change"
      @click="isShowUpload = !isShowUpload"
    >
      更改图片 >
    </span>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  display: flex;
  margin-bottom: 17px;
  position: relative;
  color: var(--kungalgame-font-color-0);
  user-select: none;

  img {
    max-width: 100%;
    margin: 0 auto;
  }

  .upload {
    position: absolute;
    bottom: 0;
    right: 0;

    .close {
      position: absolute;
      top: 3px;
      right: 10px;
      font-size: 24px;
      cursor: pointer;
    }

    .confirm {
      position: absolute;
      bottom: 3px;
      left: 10px;
      font-size: small;
      cursor: pointer;
    }
  }
}

.change {
  position: absolute;
  bottom: 3px;
  right: 10px;
  cursor: pointer;
  font-size: small;
}
</style>
