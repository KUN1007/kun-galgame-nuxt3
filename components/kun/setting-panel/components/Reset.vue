<script setup lang="ts">
const handleRecover = async () => {
  const res = await useComponentMessageStore().alert(
    {
      'en-us': 'Are you sure you want to restore all settings?',
      'ja-jp': 'すべての設定を復元しますか？',
      'zh-cn': '您确定恢复所有设置吗?',
      'zh-tw': '您確定恢復所有設置嗎？'
    },
    {
      'en-us':
        'This will clear all data on the forum, including drafts for topics, drafts for Galgames, etc. After clearing, you will need to log in again. This action cannot be undone.',
      'ja-jp':
        'これにより、フォーラムのすべてのデータがクリアされます。トピックの下書きやGalgameの下書きなどが含まれます。クリア後、再度ログインが必要です。この操作は元に戻せません。',
      'zh-cn':
        '这将清除论坛的一切数据, 包括话题的草稿, Galgame 的草稿等, 清除后需要重新登陆。该操作不可撤销。',
      'zh-tw':
        '這將清除論壇的一切數據, 包括話題的草稿、Galgame 的草稿等。清除後需要重新登錄，該操作不可撤銷。'
    }
  )
  if (!res) {
    return
  }

  await usePersistSettingsStore().setKUNGalgameSettingsRecover()

  useMessage(10109, 'success')
  navigateTo('/login')
}
</script>

<template>
  <button class="reset" @click="handleRecover">恢复所有设置为默认</button>
</template>

<style lang="scss" scoped>
.reset {
  font-size: 15px;
  cursor: pointer;
  color: var(--kungalgame-red-5);
  border: 1px solid var(--kungalgame-red-5);
  background-color: transparent;
  width: 100%;
  height: 30px;

  &:hover {
    background-color: var(--kungalgame-red-5);
    color: var(--kungalgame-white);
  }
}
</style>
