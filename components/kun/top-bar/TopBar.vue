<script setup lang="ts">
withDefaults(
  defineProps<{
    className?: string
  }>(),
  { className: '' }
)

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

const { showKUNGalgameSidebarCollapsed } = storeToRefs(
  usePersistSettingsStore()
)

const offsetClass = computed(() =>
  showKUNGalgameSidebarCollapsed.value
    ? 'md:left-[80px] md:w-[calc(100%-88px)]'
    : 'md:left-[260px] md:w-[calc(100%-268px)]'
)
</script>

<template>
  <div
    :class="
      cn(
        'fixed top-0 z-30 mb-3 ml-0 shrink-0 px-1 transition-all duration-300',
        'left-0 w-full',
        offsetClass,
        isVisible ? 'translate-y-0' : '-translate-y-full',
        className
      )
    "
  >
    <div
      class="bg-background border-default/20 mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-b-lg border px-3 backdrop-blur-[var(--kun-background-blur)]"
    >
      <KunTopBarNav />
      <KunTopBarAvatar />
    </div>
  </div>
</template>
