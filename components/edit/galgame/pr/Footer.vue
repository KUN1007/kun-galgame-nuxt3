<script setup lang="ts">
import { checkGalgamePR } from '../../utils/checkGalgamePR'

const { galgamePR } = storeToRefs(useTempGalgamePRStore())
const localePath = useLocalePath()

const isPublishing = ref(false)

const handlePublishGalgamePR = async () => {
  if (!checkGalgamePR(galgamePR.value[0])) {
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

  const { data } = await useFetch(`/api/galgame/${galgamePR.value[0].gid}/pr`, {
    method: 'POST',
    body: galgamePR.value[0],
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (data.value) {
    navigateTo(localePath(`/galgame/${galgamePR.value[0].gid}`))
    useTempMessageStore().info('AlertInfo.edit.prSuccess')
  }
}
</script>

<template>
  <div class="confirm">
    <KunButton @click="handlePublishGalgamePR"> 确定发布 </KunButton>
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
