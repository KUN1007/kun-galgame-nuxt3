<script setup lang="ts">
const props = defineProps<{
  topicId?: number
  replyId?: number
  targetUserId: number
  dislikeCount: number
  isDisliked: boolean
}>()

const { uid } = usePersistUserStore()
const isDisliked = ref(props.isDisliked)
const dislikeCount = ref(props.dislikeCount)

const toggleDislike = async () => {
  let res = ''
  if (props.topicId) {
    const result = await $fetch(`/api/topic/${props.topicId}/dislike`, {
      method: 'PUT',
      watch: false,
      ...kungalgameResponseHandler
    })
    res = result ?? ''
  } else {
    const result = await $fetch(`/api/topic/${props.topicId}/reply/dislike`, {
      method: 'PUT',
      query: { rid: props.replyId },
      watch: false,
      ...kungalgameResponseHandler
    })
    res = result ?? ''
  }

  if (res) {
    dislikeCount.value += isDisliked.value ? -1 : 1

    if (!isDisliked.value) {
      useMessage(10225, 'success')
    } else {
      useMessage(10227, 'success')
    }

    isDisliked.value = !isDisliked.value
  }
}

const handleClickDislikeThrottled = throttle(toggleDislike, 1007, () =>
  useMessage(10227, 'warn')
)

const handleClickDislike = () => {
  if (!uid) {
    useMessage(10228, 'warn', 5000)
    return
  }
  if (uid === props.targetUserId) {
    useMessage(10229, 'warn')
    return
  }
  handleClickDislikeThrottled()
}
</script>

<template>
  <KunTooltip text="点踩">
    <KunButton
      :is-icon-only="true"
      :variant="isDisliked ? 'flat' : 'light'"
      :color="isDisliked ? 'secondary' : 'default'"
      :size="dislikeCount ? 'md' : 'lg'"
      class-name="gap-1"
      @click="handleClickDislike"
    >
      <KunIcon class="icon" name="lucide:thumbs-down" />
      <span v-if="dislikeCount">{{ dislikeCount }}</span>
    </KunButton>
  </KunTooltip>
</template>
