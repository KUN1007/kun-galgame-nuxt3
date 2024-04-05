<script setup lang="ts">
import { checkGalgamePublish } from '../utils/checkGalgamePublish'

const { vndbId, name, introduction } = storeToRefs(usePersistGalgameStore())
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
    useMessage('Publishing visualnovel...', '正在发布 Galgame...', 'info')
  }
  // const { data } = await useFetch('/api/galgame/create', {
  //   method: 'POST',
  //   body: {
  //     vndbId: vndbId.value,
  //     name: name.value,
  //     banner,
  //     introduction: introduction.value
  //   },
  //   watch: false,
  //   ...kungalgameResponseHandler
  // })
  // isPublishing.value = false

  // if (data.value) {
  //   const tid = data.value
  //   navigateTo(localePath(`/topic/${tid}`))
  //   messageStore.info('AlertInfo.edit.publishSuccess')
  //   useKUNGalgameEditStore().resetTopicData()
  // }
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
