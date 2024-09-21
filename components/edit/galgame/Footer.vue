<script setup lang="ts">
import { checkGalgamePublish } from '../utils/checkGalgamePublish'

const { vndbId, name, introduction, aliases } = storeToRefs(
  usePersistEditGalgameStore()
)
const localePath = useLocalePath()

const isPublishing = ref(false)

const handlePublishGalgame = async () => {
  const banner = await getImage('kun-galgame-publish-banner')
  if (
    !checkGalgamePublish(vndbId.value, name.value, banner, introduction.value)
  ) {
    return
  }
  const res = await useComponentMessageStore().alert(
    {
      'en-us': 'Confirm to Publish Visualnovel?',
      'ja-jp': 'ギャルゲームを公開しますか？',
      'zh-cn': '确定发布 Galgame 吗?',
      'zh-tw': '確定發布 Galgame 嗎？'
    },
    {
      'en-us':
        'You are about to publish a visualnovel. To add visualnovel resources, you can go to the visualnovel details page later to add resource links.',
      'ja-jp':
        'ギャルゲームを公開しようとしています。リソースを追加するには、後でギャルゲームの詳細ページでリソースリンクを追加できます。',
      'zh-cn':
        '您要发布的是 Galgame, 要发布 Galgame 资源, 您可以稍后到 Galgame 详情页面添加资源链接。',
      'zh-tw':
        '您要發布的是 Galgame, 若要發布 Galgame 資源，您可以稍後到 Galgame 詳情頁面添加資源鏈接。'
    }
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

    navigateTo(localePath(`/galgame/${gid}`))
    useComponentMessageStore().info('AlertInfo.edit.publishSuccess')
  }
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
