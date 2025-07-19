<script setup lang="ts">
defineProps<{
  replyCount: number
  status: 'idle' | 'pending' | 'success' | 'error'
  sortOrder: 'asc' | 'desc'
}>()

const emits = defineEmits<{
  setSortOrder: [value: 'asc' | 'desc']
}>()

const router = useRouter()
const toolRef = useTemplateRef('toolRef')

const initialTop = ref(0)
const isVisible = ref(true)
const isSticky = ref(false)
let lastScrollY = 0

const canGoBack = ref(false)

const handleScroll = throttle(() => {
  if (!toolRef.value) {
    return
  }

  const currentScrollY = window.scrollY
  const stickyTriggerPoint = initialTop.value - 64
  isSticky.value = currentScrollY > stickyTriggerPoint

  if (isSticky.value) {
    isVisible.value = currentScrollY < lastScrollY
  } else {
    isVisible.value = true
  }

  lastScrollY = currentScrollY
}, 100)

const handleBackOrHomeClick = () => {
  if (canGoBack.value) {
    router.back()
  } else {
    router.push('/')
  }
}

onMounted(() => {
  canGoBack.value = window.history.length > 2

  nextTick(() => {
    if (toolRef.value) {
      const element = toolRef.value.$el || toolRef.value
      initialTop.value = element.offsetTop
    }
  })
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <KunCard
    v-if="replyCount > 0"
    ref="toolRef"
    :is-transparent="false"
    :is-hoverable="false"
    :class-name="
      cn(
        'sticky top-16 transition-transform duration-300',
        isVisible ? 'translate-y-0' : '-translate-y-full z-10'
      )
    "
  >
    <div class="flex h-full items-center justify-between">
      <div class="flex items-center gap-4">
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 -translate-x-full scale-50"
          enter-to-class="opacity-100 translate-x-0 scale-100"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-x-0 scale-100"
          leave-to-class="opacity-0 -translate-x-full scale-50"
        >
          <KunButton
            v-if="isSticky"
            is-icon-only
            size="sm"
            variant="light"
            @click="handleBackOrHomeClick"
            class-name="text-lg"
          >
            <KunIcon
              v-if="canGoBack"
              name="lucide:arrow-left"
              class="transition-transform group-hover:-translate-x-1"
            />
            <KunIcon
              v-else
              name="lucide:home"
              class="transition-transform group-hover:scale-125 group-hover:rotate-12"
            />
          </KunButton>
        </Transition>

        <p class="text-default-700 text-sm font-bold">
          {{ replyCount }} 条回复
        </p>
      </div>

      <div class="flex items-center gap-1">
        <KunButton
          size="sm"
          :variant="sortOrder === 'asc' ? 'flat' : 'light'"
          :is-disabled="status === 'pending'"
          @click="emits('setSortOrder', 'asc')"
        >
          <template #startContent>
            <KunIcon name="lucide:arrow-up" />
          </template>
          最早
        </KunButton>
        <KunButton
          size="sm"
          :variant="sortOrder === 'desc' ? 'flat' : 'light'"
          :is-disabled="status === 'pending'"
          @click="emits('setSortOrder', 'desc')"
        >
          <template #startContent>
            <KunIcon name="lucide:arrow-down" />
          </template>
          最新
        </KunButton>
      </div>
    </div>
  </KunCard>
</template>
