<script setup lang="ts">
const route = useRoute()

const { showKUNGalgameHamburger, messageStatus } = storeToRefs(
  useTempSettingStore()
)

const router = useRouter()
const canGoBack = ref(false)

const updateCanGoBack = () => {
  canGoBack.value = window.history.length > 2
}

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

  updateCanGoBack()

  router.afterEach(() => {
    updateCanGoBack()
  })
})
</script>

<template>
  <div class="cursor-pointer">
    <KunButton
      :is-icon-only="true"
      color="default"
      size="xl"
      variant="light"
      @click="showKUNGalgameHamburger = true"
      class-name="flex sm:hidden"
    >
      <Icon name="lucide:menu" />
    </KunButton>

    <div class="hidden sm:block">
      <KunButton
        v-if="canGoBack"
        :is-icon-only="true"
        color="default"
        size="xl"
        variant="light"
        @click="router.back()"
      >
        <Icon name="lucide:arrow-left" />
      </KunButton>
      <KunButton
        v-else
        :is-icon-only="true"
        color="default"
        size="xl"
        variant="light"
        @click="() => navigateTo('/')"
      >
        <Icon name="lucide:home" />
      </KunButton>
    </div>

    <LazyKunTopBarHamburger />
  </div>
</template>
