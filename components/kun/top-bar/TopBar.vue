<script setup lang="ts">
const isVisible = ref(true)
let lastScrollY = 0

const handleScroll = throttle(() => {
  const currentScrollY = window.scrollY
  isVisible.value = currentScrollY < lastScrollY || currentScrollY < 50
  lastScrollY = currentScrollY
}, 100)

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    :class="
      cn(
        'fixed top-0 z-30 mb-3 w-full shrink-0 transition-all duration-300 md:pr-3 md:pl-68',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )
    "
  >
    <div
      class="bg-background border-default-300 mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-b-lg border px-3 shadow"
    >
      <span>占位文本</span>
      <KunTopBarAvatar />
    </div>
  </div>
</template>
