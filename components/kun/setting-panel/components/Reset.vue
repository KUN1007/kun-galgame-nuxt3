<script setup lang="ts">
const localePath = useLocalePath()

const handleRecover = async () => {
  const res = await useTempMessageStore().alert(
    {
      'en-us': 'Are you sure you want to restore all settings?',
      'ja-jp': '',
      'zh-cn': '您确定恢复所有设置吗?'
    },
    {
      'en-us':
        'This will clear all data on the forum, including drafts for topics, drafts for Galgames, etc. After clearing, you will need to log in again. This action cannot be undone.',
      'ja-jp': '',
      'zh-cn':
        '这将清除论坛的一切数据, 包括话题的草稿, Galgame 的草稿等, 清除后需要重新登陆。该操作不可撤销'
    }
  )
  if (!res) {
    return
  }

  await usePersistSettingsStore().setKUNGalgameSettingsRecover()

  useMessage(
    'Restore all settings successfully!',
    '恢复所有设置成功!',
    'success'
  )
  navigateTo(localePath('/login'))
}
</script>

<template>
  <button class="reset" @click="handleRecover">
    {{ $t('header.settings.recover') }}
  </button>
</template>

<style lang="scss" scoped>
.reset {
  font-size: 15px;
  cursor: pointer;
  margin-top: 20px;
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
