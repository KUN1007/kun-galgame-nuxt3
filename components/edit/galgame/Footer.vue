<script setup lang="ts">
import { checkGalgamePublish } from '../utils/checkGalgamePublish'

const { vndbId, name, introduction } = storeToRefs(usePersistEditGalgameStore())
const localePath = useLocalePath()

const messageStore = useTempMessageStore()
const isPublishing = ref(false)

const handlePublishGalgame = async () => {
  const banner = await getImage('kun-galgame-publish-banner')
  if (
    !checkGalgamePublish(vndbId.value, name.value, banner, introduction.value)
  ) {
    return
  }
  const res = await messageStore.alert('AlertInfo.edit.publish', true)
  if (!res) {
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
    useMessage(
      'Publishing visualnovel => Uploading images may take around 7 seconds...',
      '正在发布 Galgame => 因为需要上传图片，所以这可能会花费 7 秒左右...',
      'info',
      7777
    )
  }

  const formData = new FormData()
  formData.append('vndbId', vndbId.value)
  formData.append('name', JSON.stringify(name.value))
  formData.append('banner', banner!)
  formData.append('introduction', JSON.stringify(introduction.value))

  const { data } = await useFetch('/api/galgame/create', {
    method: 'POST',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (data.value) {
    const gid = data.value

    await deleteImage('kun-galgame-publish-banner')
    usePersistEditGalgameStore().resetGalgameData()

    navigateTo(localePath(`/galgame/${gid}`))
    messageStore.info('AlertInfo.edit.publishSuccess')
  }
}
</script>

<template>
  <div class="confirm">
    <KunButton @click="handlePublishGalgame">
      {{ $t('edit.galgame.confirm') }}
    </KunButton>
  </div>
</template>

<style lang="scss" scoped>
.confirm {
  width: 100%;
  margin-top: 50px;
  display: flex;

  button {
    height: 40px;
    width: 200px;
    font-size: 17px;
    flex-shrink: 0;
    border-radius: 10px;
    margin-left: auto;
  }
}
</style>
