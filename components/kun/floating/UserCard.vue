<script setup lang="ts">
import type { UserFloatingCard } from '~/types/api/user'

const props = withDefaults(
  defineProps<{
    userId: number
    disabled?: boolean
    position?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  {
    disabled: false,
    position: 'top'
  }
)

const currentUserUid = usePersistUserStore().id
const showCard = ref(false)
const userData = ref<UserFloatingCard | null>(null)
const isLoading = ref(false)

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

const positionClasses = computed(() => {
  switch (props.position) {
    case 'bottom':
      return 'top-full left-1/2 -translate-x-1/2 mt-3'
    case 'left':
      return 'right-full top-1/2 -translate-y-1/2 mr-3'
    case 'right':
      return 'left-full top-1/2 -translate-y-1/2 ml-3'
    case 'top':
    default:
      return 'bottom-full left-1/2 -translate-x-1/2 mb-3'
  }
})

const fetchUserData = async () => {
  if (isLoading.value || userData.value) {
    return
  }

  isLoading.value = true

  const data = await $fetch<UserFloatingCard>(
    `/api/user/${props.userId}/floating`,
    {
      method: 'GET',
      query: { userId: props.userId },
      ...kungalgameResponseHandler
    }
  )
  userData.value = data

  isLoading.value = false
}

const handleMouseEnter = () => {
  if (props.disabled) {
    return
  }

  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }

  showTimer = setTimeout(() => {
    showCard.value = true

    fetchUserData()
  }, 300)
}

const handleMouseLeave = () => {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }

  hideTimer = setTimeout(() => {
    showCard.value = false
  }, 200)
}

const stats = computed(() => {
  if (!userData.value) return []
  return [
    { label: '话题', value: userData.value.topicCount },
    { label: '回复', value: userData.value.topicReplyCount },
    { label: '评论', value: userData.value.topicCommentCount },
    { label: 'Galgame', value: userData.value.galgameCount },
    { label: 'Galgame 资源', value: userData.value.galgameResourceCount },
    { label: 'Galgame 贡献', value: userData.value.galgameContributeCount }
  ]
})

onUnmounted(() => {
  if (showTimer) {
    clearTimeout(showTimer)
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
  }
})
</script>

<template>
  <div
    class="relative"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot name="trigger" />

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="showCard"
        :class="
          cn(
            'border-default-200 absolute z-20 hidden w-72 rounded-xl border bg-white p-4 sm:block dark:bg-black',
            positionClasses
          )
        "
      >
        <KunLoading v-if="isLoading" description="正在加载..." />

        <div v-else-if="userData" class="flex flex-col gap-3">
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-3">
              <KunAvatar
                :user="{
                  id: userData.id,
                  name: userData.name,
                  avatar: userData.avatar
                }"
                size="xl"
                :disable-floating="true"
              />
              <div>
                <p class="text-default-900 font-bold">
                  {{ userData.name }}
                </p>
                <p class="flex items-center gap-1 font-bold">
                  <KunIcon class="icon text-secondary" name="lucide:lollipop" />
                  <span class="text-secondary">{{ userData.moemoepoint }}</span>
                </p>
              </div>
            </div>
            <KunButton
              v-if="currentUserUid !== userData.id"
              class-name="shrink-0"
              :href="`/message/user/${userData.id}`"
            >
              发消息
            </KunButton>
          </div>

          <div class="grid grid-cols-3 gap-y-3 text-center">
            <div v-for="stat in stats" :key="stat.label">
              <p class="text-default-900 font-bold">
                {{ stat.value }}
              </p>
              <p class="text-default-500 text-xs">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
