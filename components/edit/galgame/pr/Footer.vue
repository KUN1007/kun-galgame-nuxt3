<script setup lang="ts">
import { checkGalgamePR } from '../../utils/checkGalgamePR'

const { galgamePR } = storeToRefs(useTempGalgamePRStore())

const isPublishing = ref(false)

const handlePublishGalgamePR = async () => {
  const seriesArray = galgamePR.value[0].series
    .toString()
    .split(',')
    .map((o: string) => o.trim())
    .filter((str: string) => str !== '')
  const officialArray = galgamePR.value[0].official
    .toString()
    .split(',')
    .map((o: string) => o.trim())
    .filter((str: string) => str !== '')
  const engineArray = galgamePR.value[0].engine
    .toString()
    .split(',')
    .map((e: string) => e.trim())
    .filter((str: string) => str !== '')
  const tagsArray = galgamePR.value[0].tags
    .toString()
    .split(',')
    .map((t: string) => t.trim())
    .filter((str: string) => str !== '')
  const pullRequest = {
    gid: galgamePR.value[0].gid,
    name: galgamePR.value[0].name,
    introduction: galgamePR.value[0].introduction,
    alias: galgamePR.value[0].alias,
    official: officialArray,
    engine: engineArray,
    tags: tagsArray,
    series: seriesArray
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
    navigateTo(`/galgame/${pullRequest.gid}`, {
      replace: true
    })
    useComponentMessageStore().info('创建更新请求成功')
  }
}
</script>

<template>
  <div class="confirm">
    <KunButton @click="handlePublishGalgamePR">确定发布</KunButton>
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
