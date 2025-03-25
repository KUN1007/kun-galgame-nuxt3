<script setup lang="ts">
import { KunTooltip } from '#components'

const props = defineProps<{
  tid?: number
  rid?: number
  toUid: number
  upvoteCount: number
  isUpvoted: boolean
}>()

const { uid, moemoepoint } = usePersistUserStore()
const isUpvoted = ref(props.isUpvoted)
const upvoteCount = ref(props.upvoteCount)

const upvoteTopic = async () => {
  const res = await useComponentMessageStore().alert(
    '您确定推这个话题吗?',
    '推话题将会消耗您 7 萌萌点, 并给被推者增加 3 萌萌点。'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/topic/${props.tid}/upvote`, {
    method: 'PUT',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    upvoteCount.value++
    isUpvoted.value = true
    useMessage(10238, 'success')
  }
}

const upvoteReply = async () => {
  const res = await useComponentMessageStore().alert(
    '您确定推这个回复吗?',
    '推回复将会消耗您 2 萌萌点, 并给被推者增加 1 萌萌点。'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/topic/${props.tid}/reply/upvote`, {
    method: 'PUT',
    query: { rid: props.rid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    upvoteCount.value++
    isUpvoted.value = true
    useMessage(10239, 'success')
  }
}

const handleClickUpvote = async () => {
  if (!uid) {
    useMessage(10240, 'warn', 5000)
    return
  }

  if (uid === props.toUid) {
    useMessage(10241, 'warn')
    return
  }

  if (moemoepoint < 1100) {
    useMessage(10242, 'warn')
    return
  }

  if (props.rid) {
    await upvoteReply()
  } else {
    await upvoteTopic()
  }
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
