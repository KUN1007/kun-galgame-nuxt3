<script setup lang="ts">
const props = defineProps<{
  topicId?: number
  targetUserId: number
  upvoteCount: number
  isUpvoted: boolean
}>()

const { id, moemoepoint } = usePersistUserStore()
const isUpvoted = ref(id && props.isUpvoted)
const upvoteCount = ref(props.upvoteCount)

const upvoteTopic = async () => {
  const res = await useComponentMessageStore().alert(
    '您确定推这个话题吗?',
    '推话题将会消耗您 7 萌萌点, 并给被推者增加 3 萌萌点。'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/topic/${props.topicId}/upvote`, {
    method: 'PUT',
    watch: false,
    body: { topicId: props.topicId },
    ...kungalgameResponseHandler
  })

  if (result) {
    upvoteCount.value++
    isUpvoted.value = true
    useMessage(10238, 'success')
  }
}

const handleClickUpvote = async () => {
  if (!id) {
    useMessage(10240, 'warn', 5000)
    return
  }

  if (id === props.targetUserId) {
    useMessage(10241, 'warn')
    return
  }

  if (moemoepoint < 50) {
    useMessage(10242, 'warn')
    return
  }

  await upvoteTopic()
}
</script>

<template>
  <KunTooltip text="推！">
    <KunButton
      :is-icon-only="true"
      :variant="isUpvoted ? 'flat' : 'light'"
      :color="isUpvoted ? 'secondary' : 'default'"
      :size="upvoteCount ? 'md' : 'lg'"
      class-name="gap-1"
      @click="handleClickUpvote"
    >
      <KunIcon class="icon" name="lucide:sparkles" />
      <span v-if="upvoteCount">{{ upvoteCount }}</span>
    </KunButton>
  </KunTooltip>
</template>
