<script setup lang="ts">
const props = defineProps<{
  tid?: number
  rid?: number
  toUid: number
  upvoteCount: number
  isUpvoted: boolean
}>()

const { uid, moemoeAccessToken, moemoepoint } = usePersistUserStore()
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
  if (!moemoeAccessToken) {
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
  <span
    class="upvote"
    :class="isUpvoted ? 'active' : ''"
    @click="handleClickUpvote"
  >
    <Icon class="icon" name="lucide:sparkles" />
    <span v-if="upvoteCount">{{ upvoteCount }}</span>
  </span>
</template>

<style lang="scss" scoped>
.upvote {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0;
  color: var(--kungalgame-font-color-2);

  .icon {
    cursor: pointer;
    font-size: 24px;
    margin-right: 3px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}

@media (max-width: 700px) {
  .upvote {
    .icon {
      font-size: initial;
    }
  }
}
</style>
