<script setup lang="ts">
const route = useRoute()

const { showKUNGalgameHamburger, messageStatus } = storeToRefs(
  useTempSettingStore()
)
const { moemoepoint, isCheckIn } = storeToRefs(usePersistUserStore())

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
  const result = await $fetch('/api/user/status', {
    method: 'GET'
  })
  if (result) {
    isCheckIn.value = result.isCheckIn
    moemoepoint.value = result.moemoepoints
    messageStatus.value = result.hasNewMessage ? 'new' : 'online'
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
      <KunIcon name="lucide:menu" />
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
        <KunIcon name="lucide:arrow-left" />
      </KunButton>
      <KunButton
        v-else
        :is-icon-only="true"
        color="default"
        size="xl"
        variant="light"
        @click="() => navigateTo('/')"
      >
        <KunIcon name="lucide:home" />
      </KunButton>
    </div>

    <LazyKunTopBarHamburger />
  </div>
</template>
