<script setup lang="ts">
const handleRecover = async () => {
  const res = await useComponentMessageStore().alert(
    '您确定恢复所有设置吗?',
    '这将清除论坛的一切数据, 包括话题的草稿, Galgame 的草稿等, 清除后需要重新登陆。该操作不可撤销。'
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
