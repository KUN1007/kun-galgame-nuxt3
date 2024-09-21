<script setup lang="ts">
import { checkGalgamePR } from '../../utils/checkGalgamePR'

const { galgamePR } = storeToRefs(useTempGalgamePRStore())
const localePath = useLocalePath()

const isPublishing = ref(false)

const handlePublishGalgamePR = async () => {
  const seriesArray = galgamePR.value[0].series
    .toString()
    .split(',')
    .map((o) => o.trim())
    .filter((str) => str !== '')
  const officialArray = galgamePR.value[0].official
    .toString()
    .split(',')
    .map((o) => o.trim())
    .filter((str) => str !== '')
  const engineArray = galgamePR.value[0].engine
    .toString()
    .split(',')
    .map((e) => e.trim())
    .filter((str) => str !== '')
  const tagsArray = galgamePR.value[0].tags
    .toString()
    .split(',')
    .map((t) => t.trim())
    .filter((str) => str !== '')
  const pullRequest = {
    ...galgamePR.value[0],
    official: officialArray,
    engine: engineArray,
    tags: tagsArray,
    series: seriesArray
  }

  if (!checkGalgamePR(pullRequest)) {
    return
  }
  const res = await useComponentMessageStore().alert({
    'en-us': 'Confirm to publish visualnovel info update request?',
    'ja-jp': 'ギャルゲームの情報更新リクエストを公開しますか？',
    'zh-cn': '确定发布 Galgame 信息更新请求吗?',
    'zh-tw': '確定發布 Galgame 信息更新請求嗎？'
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
    useComponentMessageStore().info('AlertInfo.edit.prSuccess')
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
