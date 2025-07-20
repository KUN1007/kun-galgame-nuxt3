<script setup lang="ts">
import { updateGalgameSchema } from '~/validations/galgame'

const { galgamePR } = storeToRefs(useTempGalgamePRStore())

const isPublishing = ref(false)

const handlePublishGalgamePR = async () => {
  const galgame = galgamePR.value[0]
  const data: Record<string, number | string | string[]> = {
    vndbId: galgame.vndbId,
    name_en_us: galgame.name['en-us'],
    name_ja_jp: galgame.name['ja-jp'],
    name_zh_cn: galgame.name['zh-cn'],
    name_zh_tw: galgame.name['zh-tw'],
    intro_en_us: galgame.introduction['en-us'],
    intro_ja_jp: galgame.introduction['ja-jp'],
    intro_zh_cn: galgame.introduction['zh-cn'],
    intro_zh_tw: galgame.introduction['zh-tw'],
    contentLimit: galgame.contentLimit,
    aliases: String(galgame.alias)
  }

  const result = updateGalgameSchema.safeParse(data)
  if (!result.success) {
    const message = JSON.parse(result.error.message)[0]
    useMessage(
      `位置: ${message.path[0]} - 错误提示: ${message.message}`,
      'warn'
    )
    return
  }
  const res = await useComponentMessageStore().alert(
    '确定发布 Galgame 信息更新请求吗?'
  )
  if (!res) {
    return
  }

  if (isPublishing.value) {
    return
  } else {
    isPublishing.value = true
  }

  const response = await $fetch(`/api/galgame/${galgame.id}/pr`, {
    method: 'POST',
    body: data,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (response) {
    useKunLoliInfo('创建更新请求成功', 5)
    await navigateTo(`/galgame/${galgame.id}`, {
      replace: true
    })
  }
}
</script>

<template>
  <div class="flex justify-end">
    <KunButton
      :disabled="isPublishing"
      :loading="isPublishing"
      size="lg"
      @click="handlePublishGalgamePR"
    >
      确定发布
    </KunButton>
  </div>
</template>
