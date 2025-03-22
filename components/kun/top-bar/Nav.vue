<script setup lang="ts">
const route = useRoute()

const { showKUNGalgameHamburger, messageStatus } = storeToRefs(
  useTempSettingStore()
)

watch(
  () => route.name,
  () => {
    useTempSettingStore().reset()
  }
)

onMounted(async () => {
  const result = await $fetch(`/api/message/unread`, {
    method: 'GET'
  })
  if (result === 'Moe loli online!') {
    messageStatus.value = 'online'
  } else {
    messageStatus.value = 'new'
  }
})
</script>

<template>
  <div class="cursor-pointer">
    <Icon
      class="icon"
      name="lucide:menu"
      @click="showKUNGalgameHamburger = true"
    />

    <LazyKunTopBarHamburger />
  </div>
</template>
