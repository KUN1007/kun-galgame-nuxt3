<script setup lang="ts">
const props = defineProps<{
  tid: number
  cid: number
  uid: number
  toUid: number

  likes: number[]
}>()

const { moemoeAccessToken } = usePersistUserStore()
const isLiked = ref(props.likes.includes(props.uid))
const likesCount = ref(props.likes.length)

watch(
  () => props.likes,
  (newLikes) => {
    isLiked.value = newLikes.includes(props.uid)
    likesCount.value = newLikes.length
  }
)

const throttleCallback = () => {
  useMessage(
    'You can only perform one operation within 1007 milliseconds',
    '您在 1007 毫秒内只能进行一次操作',
    'warn'
  )
}

const likeComment = async () => {
  if (isLiked.value) {
    useMessage(`You've already liked it`, '您已经点过赞了', 'warn')
    return
  }

  if (props.uid === props.toUid) {
    useMessage('You cannot like yourself', '您不可以给自己点赞', 'warn')
    return
  }

  const queryData = {
    cid: props.cid,
    to_uid: props.toUid
  }
  const { data } = await useFetch(`/api/topic/${props.tid}/comment/like`, {
    method: 'PUT',
    query: queryData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (data.value) {
    likesCount.value++
    isLiked.value = true
    useMessage('Like successfully!', '点赞成功', 'success')

    const socket = useSocket()
    socket.emit('like', props.toUid)
  }
}

const handleClickLikeThrottled = throttle(likeComment, 1007, throttleCallback)

const handleClickLike = () => {
  if (!moemoeAccessToken) {
    useMessage('You need to login to like', '您需要登录以点赞', 'warn', 5000)
    return
  }
  handleClickLikeThrottled()
}
</script>

<template>
  <li :class="isLiked ? 'active' : ''" @click="handleClickLike">
    <Icon class="icon" name="lucide:thumbs-up" />
    <span v-if="likesCount">{{ likesCount }}</span>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  .icon {
    cursor: pointer;
    color: var(--kungalgame-font-color-2);
    margin-right: 10px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}
</style>
