<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

defineProps<{
  galgame: GalgameDetail
}>()

const { locale } = useI18n()

const initialImageUrl = ref('')
const isShowUpload = ref(false)
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const handleChangeBanner = async () => {
  const imageBlob = await getImage('kun-galgame-rewrite-banner')
  if (!imageBlob) {
    useMessage('Please upload the image first', '请先上传图片', 'warn')
    return
  }

  const res = await useTempMessageStore().alert(
    {
      'en-us': 'Confirm to update banner?',
      'ja-jp': '',
      'zh-cn': '确定更新预览图吗?'
    },
    {
      'en-us':
        'Due to network caching, your new image may take some time to take effect. You can use Ctrl + F5 to refresh the page cache',
      'ja-jp': '',
      'zh-cn':
        '由于网络缓存, 您的新图片可能需要一段时间才会生效, 可以使用 Ctrl + F5 刷新页面缓存'
    }
  )
  if (!res) {
    return
  }

  const formData = new FormData()
  formData.append('avatar', imageBlob)

  useMessage('Uploading banner image...', '正在上传预览图片...', 'info')

  const { data } = await useFetch(`/api/galgame/${gid.value}/banner`, {
    method: 'PUT',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (data.value) {
    isShowUpload.value = false
    initialImageUrl.value = ''
    await deleteImage(`kun-galgame-rewrite-banner`)
    useMessage('Upload image successfully!', '上传图片成功!', 'success')
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
  <h1>{{ getPreferredLanguageText(galgame.name, locale as Language) }}</h1>
  <div class="banner">
    <NuxtImg :src="galgame.banner" />

    <div class="upload" v-if="isShowUpload">
      <span class="close" @click="isShowUpload = false">
        <Icon name="lucide:x" />
      </span>
      <KunUpload
        width="300px"
        :initial-image="initialImageUrl"
        :size="1920"
        :aspect="16 / 9"
        hint="预览图不可包含 R18 等敏感内容"
        @set-image="(img) => saveImage(img, `kun-galgame-rewrite-banner`)"
      />
      <span class="confirm" @click="handleChangeBanner">确定更改</span>
    </div>
    <span class="change" @click="isShowUpload = !isShowUpload">更改图片></span>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-bottom: 17px;
}

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
    background-color: var(--kungalgame-trans-white-5);
    backdrop-filter: blur(10px);
    border-radius: 10px;

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
