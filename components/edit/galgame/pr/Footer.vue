<script setup lang="ts">
import { checkGalgamePR } from '../../utils/checkGalgamePR'

const { galgamePR } = storeToRefs(useTempGalgamePRStore())
const localePath = useLocalePath()

const isPublishing = ref(false)

const handlePublishGalgamePR = async () => {
  const officialArray = galgamePR.value[0].official
    .toString()
    .split(',')
    .map((o) => o.trim())
  const engineArray = galgamePR.value[0].engine
    .toString()
    .split(',')
    .map((e) => e.trim())
  const tagsArray = galgamePR.value[0].tags
    .toString()
    .split(',')
    .map((t) => t.trim())
  const pullRequest = {
    ...galgamePR.value[0],
    official: officialArray,
    engine: engineArray,
    tags: tagsArray
  }

  if (!checkGalgamePR(pullRequest)) {
    return
  }
  const res = await useTempMessageStore().alert({
    'en-us': 'Confirm to publish visualnovel info update request?',
    'ja-jp': '',
    'zh-cn': '确定发布 Galgame 信息更新请求吗?'
  })
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
    navigateTo(localePath(`/galgame/${pullRequest.gid}`), {
      replace: true
    })
    useTempMessageStore().info('AlertInfo.edit.prSuccess')
  }
}
</script>

<template>
  <div class="confirm">
    <KunButton @click="handlePublishGalgamePR">
      {{ $t('edit.pr.confirm') }}
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
