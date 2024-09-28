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
        'You are about to publish a visualnovel. After publishing, you must go to the resource details page of the visualnovel you published and add a link for obtaining/downloading that visualnovel resource.',
      'ja-jp':
        'あなたはギャルゲームを公開しようとしています。公開後は、公開したギャルゲームのリソース詳細ページに移動し、そのギャルゲームリソースの取得/ダウンロードリンクを追加する必要があります。',
      'zh-cn':
        '您要发布的是 Galgame。发布后, 您必须到您发布完成的 Galgame 资源详情页, 添加一条该Galgame 资源的获取 / 下载链接。',
      'zh-tw':
        '您要發佈的是 Galgame。發佈後, 您必須到您發佈完成的 Galgame 資源詳情頁, 添加一條該Galgame 資源的獲取 / 下載鏈接。'
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
