<script setup lang="ts">
import { createGalgameSchema } from '~/validations/galgame'

const { vndbId, name, contentLimit, introduction, aliases } = storeToRefs(
  usePersistEditGalgameStore()
)

const isPublishing = ref(false)

const handlePublishGalgame = async () => {
  const banner = await getImage('kun-galgame-publish-banner')
  const data: Record<string, number | string | string[] | Blob | null> = {
    vndbId: vndbId.value,
    name_en_us: name.value['en-us'],
    name_ja_jp: name.value['ja-jp'],
    name_zh_cn: name.value['zh-cn'],
    name_zh_tw: name.value['zh-tw'],
    intro_en_us: introduction.value['en-us'],
    intro_ja_jp: introduction.value['ja-jp'],
    intro_zh_cn: introduction.value['zh-cn'],
    intro_zh_tw: introduction.value['zh-tw'],
    contentLimit: contentLimit.value,
    banner,
    aliases: String(aliases.value)
  }
  const result = createGalgameSchema.safeParse(data)
  if (!result.success) {
    const message = JSON.parse(result.error.message)[0]
    useMessage(
      `位置: ${message.path[0]} - 错误提示: ${message.message}`,
      'warn'
    )
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
  for (const key in data) {
    const value = data[key]
    if (value !== null && value !== undefined) {
      if (value instanceof Blob) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    }
  }
  const gid = await $fetch('/api/galgame', {
    method: 'POST',
    body: formData,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (gid) {
    await deleteImage('kun-galgame-publish-banner')

    useKunLoliInfo('发布 Galgame 成功', 5)
    await navigateTo(`/galgame/${gid}`)
    usePersistEditGalgameStore().$reset()
  }
}
</script>

<template>
  <div class="flex justify-end">
    <KunButton
      :disabled="isPublishing"
      :loading="isPublishing"
      size="lg"
      @click="handlePublishGalgame"
    >
      确认发布 Galgame
    </KunButton>
  </div>
</template>
