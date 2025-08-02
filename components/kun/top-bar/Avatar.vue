<script setup lang="ts">
const { id, name, avatar } = storeToRefs(usePersistUserStore())
const { showKUNGalgamePanel, messageStatus } = storeToRefs(
  useTempSettingStore()
)

const onKeydown = async (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    await navigateTo('/search')
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))

onUnmounted(() => window.removeEventListener('keydown', onKeydown))

const statusClasses = computed(() => {
  if (messageStatus.value === 'admin') {
    return 'bg-danger'
  } else if (messageStatus.value === 'new') {
    return 'bg-secondary'
  } else if (messageStatus.value === 'online') {
    return 'bg-success'
  } else {
    return 'bg-primary'
  }
})
</script>

<template>
  <div class="flex items-center space-x-1">
    <KunTooltip text="Ctrl + K 以快速搜索" position="bottom">
      <KunButton
        :is-icon-only="true"
        variant="light"
        color="default"
        size="xl"
        href="/search"
      >
        <KunIcon name="lucide:search" />
      </KunButton>
    </KunTooltip>

    <KunButton
      :is-icon-only="true"
      variant="light"
      color="default"
      size="xl"
      @click="showKUNGalgamePanel = !showKUNGalgamePanel"
    >
      <KunIcon name="lucide:settings" />
    </KunButton>

    <KunPopover position="bottom-end">
      <template v-if="id" #trigger>
        <div>
          <KunAvatar
            size="lg"
            :is-navigation="false"
            :user="{ id, name, avatar }"
            :disable-floating="true"
          />
          <div
            class="absolute right-0 bottom-0 size-2 rounded-full"
            :class="cn(statusClasses, messageStatus)"
          />
        </div>
      </template>

      <LazyKunTopBarUserInfo />
    </KunPopover>

    <template v-if="!id">
      <KunButton size="lg" variant="light" href="/login">登录</KunButton>
      <KunButton size="lg" href="/register">注册</KunButton>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.new {
  animation: kun-pulse 1s infinite;
}

.admin {
  animation: kun-pulse 1s infinite;
}

@keyframes kun-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
