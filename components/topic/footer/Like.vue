<script setup lang="ts">
const props = defineProps<{
  uid: number
  tid: number
  rid: number
  likes: number[]
  toUid: number
}>()

const { moemoeAccessToken } = useKUNGalgameUserStore()
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

const likeOperation = async (
  tid: number,
  rid: number,
  toUid: number,
  isPush: boolean
) => {
  const isMasterTopic = rid === 0
  if (isMasterTopic) {
    const queryData = {
      isPush,
      to_uid: toUid
    }
    const { data } = await useFetch(`/api/topic/${tid}/like`, {
      method: 'PUT',
      query: queryData,
      watch: false,
      ...kungalgameResponseHandler
    })
    return data
  } else {
    const queryData = {
      isPush,
      rid: props.rid,
      to_uid: toUid
    }
    const { data } = await useFetch(`/api/topic/${tid}/reply/like`, {
      method: 'PUT',
      query: queryData,
      watch: false,
      ...kungalgameResponseHandler
    })
    return data
  }
}

const toggleLike = async () => {
  if (props.uid === props.toUid) {
    useMessage('You cannot like yourself', '您不可以给自己点赞', 'warn')
    return
  }

  const { tid, rid, toUid } = props
  const isPush = !isLiked.value

  const data = await likeOperation(tid, rid, toUid, isPush)

  if (data.value) {
    isLiked.value = isPush
    likesCount.value += isPush ? 1 : -1

    if (isPush) {
      useMessage('Like successfully!', '点赞成功！', 'success')

      const socket = useSocket()
      socket.emit('like', props.toUid)
    } else {
      useMessage('Unlike successfully!', '取消点赞成功！', 'success')
    }
  }
}

const handleClickLikeThrottled = throttle(toggleLike, 1007, throttleCallback)

const handleClickLike = () => {
  if (!moemoeAccessToken) {
    useMessage('You need to login to like', '您需要登录以点赞', 'warn', 5000)
    return
  }
  handleClickLikeThrottled()
}
</script>

<template>
  <li>
    <span
      class="like"
      :class="isLiked ? 'active' : ''"
      @click="handleClickLike"
    >
      <Icon class="icon" name="lucide:thumbs-up" />
    </span>
    <span v-if="likesCount">{{ likesCount }}</span>
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 17px;
  margin-right: 0;

  span {
    display: flex;
    margin-right: 3px;
  }
}

.like {
  font-size: 24px;
  color: var(--kungalgame-font-color-2);
  cursor: pointer;
}

.active .icon {
  color: var(--kungalgame-red-4);
}

@media (max-width: 700px) {
  .like {
    font-size: initial;
  }
}
</style>
