<script setup lang="ts">
const props = defineProps<{
  tid?: number
  rid?: number
  toUid: number
  likesCount: number
  isLiked: boolean
}>()

const { uid } = usePersistUserStore()
const isLiked = ref(props.isLiked)
const likesCount = ref(props.likesCount)

const toggleLike = async () => {
  let res = ''
  if (props.tid) {
    const result = await $fetch(`/api/topic/${props.tid}/like`, {
      method: 'PUT',
      watch: false,
      ...kungalgameResponseHandler
    })
    res = result ?? ''
  } else {
    const result = await $fetch(`/api/topic/${props.tid}/reply/like`, {
      method: 'PUT',
      query: { rid: props.rid },
      watch: false,
      ...kungalgameResponseHandler
    })
    res = result ?? ''
  }

  if (res) {
    likesCount.value += isLiked.value ? -1 : 1

    if (!isLiked.value) {
      useMessage(10233, 'success')
    } else {
      useMessage(10234, 'success')
    }

    isLiked.value = !isLiked.value
  }
}

const handleClickLikeThrottled = throttle(toggleLike, 1007, () =>
  useMessage(10227, 'warn')
)

const handleClickLike = () => {
  if (!uid) {
    useMessage(10235, 'warn', 5000)
    return
  }
  if (uid === props.toUid) {
    useMessage(10236, 'warn')
    return
  }
  handleClickLikeThrottled()
}
</script>

<template>
  <KunTooltip text="点赞">
    <KunButton
      :is-icon-only="true"
      :variant="isLiked ? 'flat' : 'light'"
      :color="isLiked ? 'secondary' : 'default'"
      :size="likesCount ? 'md' : 'lg'"
      class-name="gap-1"
      @click="handleClickLike"
    >
      <KunIcon name="lucide:thumbs-up" />
      <span v-if="likesCount">{{ likesCount }}</span>
    </KunButton>
  </KunTooltip>
</template>
