<script setup lang="ts">
import { checkGalgamePublish } from '../utils/checkGalgamePublish'

const {
  vndbId,
  name,
  contentLimit,
  introduction,
  series,
  aliases,
  official,
  engine,
  tags
} = storeToRefs(usePersistEditGalgameStore())

const isPublishing = ref(false)

const handlePublishGalgame = async () => {
  const banner = await getImage('kun-galgame-publish-banner')
  const isValid = checkGalgamePublish(
    vndbId.value,
    name.value,
    banner,
    introduction.value,
    series.value,
    aliases.value,
    official.value,
    engine.value,
    tags.value
  )
  if (!isValid) {
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
  formData.append('contentLimit', contentLimit.value)
  formData.append('name', JSON.stringify(name.value))
  formData.append('banner', banner!)
  formData.append('introduction', JSON.stringify(introduction.value))
  formData.append('series', JSON.stringify(series.value.slice(0, 17)))
  formData.append('aliases', JSON.stringify(aliases.value.slice(0, 17)))
  formData.append('official', JSON.stringify(official.value.slice(0, 17)))
  formData.append('engine', JSON.stringify(engine.value.slice(0, 17)))
  formData.append('tags', JSON.stringify(tags.value.slice(0, 17)))

  const gid = await $fetch('/api/galgame', {
    method: 'POST',
    body: formData,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (gid) {
    await deleteImage('kun-galgame-publish-banner')
    usePersistEditGalgameStore().$reset()

    navigateTo(`/galgame/${gid}`)
    useKunLoliInfo('发布 Galgame 成功', 5)
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
