<script setup lang="ts">
import { checkGalgamePR } from '../../utils/checkGalgamePR'

const { galgamePR } = storeToRefs(useTempGalgamePRStore())

const isPublishing = ref(false)

const handlePublishGalgamePR = async () => {
  const pullRequest = {
    gid: galgamePR.value[0].id,
    name: galgamePR.value[0].name,
    introduction: galgamePR.value[0].introduction,
    contentLimit: galgamePR.value[0].contentLimit,
    alias: galgamePR.value[0].alias
  }

  if (!checkGalgamePR(pullRequest)) {
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

  const result = await $fetch(`/api/galgame/${pullRequest.gid}/pr`, {
    method: 'POST',
    body: pullRequest,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (result) {
    useKunLoliInfo('创建更新请求成功', 5)
    await navigateTo(`/galgame/${pullRequest.gid}`, {
      replace: true
    })
  }
}
</script>

<template>
  <div class="flex justify-end">
    <KunButton size="lg" @click="handlePublishGalgamePR">确定发布</KunButton>
  </div>
</template>
