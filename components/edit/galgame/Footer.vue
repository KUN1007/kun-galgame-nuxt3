<script setup lang="ts">
import { checkGalgamePublish } from '../utils/checkGalgamePublish'

const { vndbId, name, introduction, aliases } = storeToRefs(
  usePersistEditGalgameStore()
)

const isPublishing = ref(false)

const handlePublishGalgame = async () => {
  const banner = await getImage('kun-galgame-publish-banner')
  if (
    !checkGalgamePublish(vndbId.value, name.value, banner, introduction.value)
  ) {
    return
  }
  const res = await useComponentMessageStore().alert(
    '确定发布 Galgame 吗?',
    '您要发布的是 Galgame。发布后, 您必须到您发布完成的 Galgame 资源详情页, 添加一条该Galgame 资源的获取 / 下载链接。'
  )
  if (!res) {
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
    useMessage(10525, 'info', 7777)
  }

  const formData = new FormData()
  formData.append('vndbId', vndbId.value)
  formData.append('name', JSON.stringify(name.value))
  formData.append('banner', banner!)
  formData.append('introduction', JSON.stringify(introduction.value))
  formData.append('aliases', JSON.stringify(aliases.value.slice(0, 17)))

  const gid = await $fetch('/api/galgame', {
    method: 'POST',
    body: formData,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (gid) {
    await deleteImage('kun-galgame-publish-banner')
    usePersistEditGalgameStore().resetGalgameData()

    navigateTo(`/galgame/${gid}`)
    useComponentMessageStore().info('AlertInfo.edit.publishSuccess')
  }
}
</script>

<template>
  <div class="flex justify-end">
    <KunButton size="lg" @click="handlePublishGalgame">
      确认发布 Galgame
    </KunButton>
  </div>
</template>
