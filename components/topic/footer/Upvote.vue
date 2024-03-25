<script setup lang="ts">
const props = defineProps<{
  uid: number
  tid: number
  rid: number
  upvotes: number[]
  toUid: number
}>()

const { moemoeAccessToken } = useKUNGalgameUserStore()
const isUpvote = ref(props.upvotes.includes(props.uid))
const upvoteCount = ref(props.upvotes.length)

watch(
  () => props.upvotes,
  (newUpvote) => {
    isUpvote.value = props.upvotes.includes(props.uid)
    upvoteCount.value = newUpvote.length
  }
)

const upvoteTopic = async () => {
  const res = await useTempMessageStore().alert(
    'AlertInfo.edit.upvoteTopic',
    true
  )
  if (!res) {
    return
  }

  const queryData = {
    to_uid: props.toUid,
    time: Date.now()
  }
  const { data } = await useFetch(`/api/topic/${props.tid}/upvote`, {
    method: 'PUT',
    query: queryData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (data.value) {
    upvoteCount.value++
    isUpvote.value = true
    useMessage('Topic upvote successfully', '推话题成功', 'success')

    const socket = useSocket()
    socket.emit('upvote', props.toUid)
  }
}

const upvoteReply = async () => {
  const res = await useTempMessageStore().alert(
    'AlertInfo.edit.upvoteReply',
    true
  )
  if (!res) {
    return
  }

  const queryData = {
    to_uid: props.toUid,
    rid: props.rid,
    time: Date.now()
  }
  const { data } = await useFetch(`/api/topic/${props.tid}/reply/upvote`, {
    method: 'PUT',
    query: queryData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (data.value) {
    upvoteCount.value++
    isUpvote.value = true
    useMessage('Reply upvote successfully', '推回复成功', 'success')

    const socket = useSocket()
    socket.emit('upvote', props.toUid)
  }
}

const handleClickUpvote = async () => {
  if (!moemoeAccessToken) {
    useMessage(
      'You need to login to use upvote feature',
      '您需要登录使用推功能',
      'warn',
      5000
    )
    return
  }

  if (props.uid === props.toUid) {
    useMessage(
      'You cannot upvote your own topic',
      '您不可以推自己的话题',
      'warn'
    )
    return
  }

  if (useKUNGalgameUserStore().moemoepoint < 1100) {
    useMessage(
      `Your moemoepoints are less than 1100, so you can't use the upvote topic feature`,
      '您的萌萌点不足 1100, 无法使用推话题功能',
      'warn'
    )
    return
  }

  if (props.rid === 0) {
    await upvoteTopic()
  } else {
    await upvoteReply()
  }
}
</script>

<template>
  <li>
    <span
      class="upvote"
      :class="isUpvote ? 'active' : ''"
      @click="handleClickUpvote"
    >
      <Icon class="icon" name="lucide:cherry" />
    </span>
    <span v-if="upvoteCount">{{ upvoteCount }}</span>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  span {
    display: flex;
    margin-right: 3px;
  }
}

.upvote {
  font-size: 24px;
  color: var(--kungalgame-font-color-2);
  cursor: pointer;
}

.active .icon {
  color: var(--kungalgame-red-4);
}

@media (max-width: 700px) {
  .upvote {
    font-size: initial;
  }
}
</style>
