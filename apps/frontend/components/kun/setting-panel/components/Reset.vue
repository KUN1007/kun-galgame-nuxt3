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
  await navigateTo('/login')
}
</script>

<template>
  <KunButton
    full-width
    color="danger"
    variant="faded"
    class-name="p-2"
    @click="handleRecover"
  >
    恢复所有设置为默认
  </KunButton>
</template>
