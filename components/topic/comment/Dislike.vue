<script setup lang="ts">
const props = defineProps<{
  tid: number
  cid: number
  uid: number
  toUid: number

  dislikes: number[]
}>()

const { moemoeAccessToken } = useKUNGalgameUserStore()
const isDisliked = ref(props.dislikes.includes(props.uid))
const dislikesCount = ref(props.dislikes.length)

watch(
  () => props.dislikes,
  (newLikes) => {
    isDisliked.value = newLikes.includes(props.uid)
    dislikesCount.value = newLikes.length
  }
)

const throttleCallback = () => {
  useMessage(
    'You can only perform one operation within 1007 milliseconds',
    '您在 1007 毫秒内只能进行一次操作',
    'warn'
  )
}

const dislikeComment = async () => {
  if (isDisliked.value) {
    useMessage(`You've already disliked it`, '您已经点过踩了', 'warn')
    return
  }

  if (props.uid === props.toUid) {
    useMessage('You cannot dislike yourself', '您不可以给自己点踩', 'warn')
    return
  }

  const queryData = {
    cid: props.cid,
    to_uid: props.toUid
  }
  const { data } = await useFetch(`/api/topic/${props.tid}/comment/dislike`, {
    method: 'PUT',
    query: queryData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (data.value) {
    dislikesCount.value++
    isDisliked.value = true
    useMessage('Dislike successfully!', '点踩成功', 'success')
  }
}

const handleClickDislikeThrottled = throttle(
  dislikeComment,
  1007,
  throttleCallback
)

const handleClickDislike = () => {
  if (!moemoeAccessToken) {
    useMessage('You need to login to dislike', '您需要登录以点踩', 'warn', 5000)
    return
  }
  handleClickDislikeThrottled()
}
</script>

<template>
  <li :class="isDisliked ? 'active' : ''" @click="handleClickDislike">
    <Icon class="icon" name="line-md:thumbs-down-twotone" />
    {{ dislikesCount }}
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
    margin-right: 2px;
  }
}

.active .icon {
  color: var(--kungalgame-blue-5);
}
</style>
