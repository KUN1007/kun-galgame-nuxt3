<script setup lang="ts">
const props = defineProps<{
  uid: number
  tid: number
  rid: number
  dislikes: number[]
  toUid: number
}>()

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

const dislikeOperation = async (
  tid: number,
  rid: number,
  toUid: number,
  isPush: boolean
) => {
  const isMasterTopic = rid === 0
  // if (isMasterTopic) {
  //   return await useTempTopicStore().updateTopicDislike(tid, toUid, isPush)
  // } else {
  //   return await useTempReplyStore().updateReplyDislike(tid, toUid, rid, isPush)
  // }
}

const toggleDislike = async () => {
  if (props.uid === props.toUid) {
    useMessage('You cannot dislike yourself', '您不可以给自己点踩', 'warn')
    return
  }

  const { tid, rid, toUid } = props
  const isPush = !isDisliked.value

  const res = await dislikeOperation(tid, rid, toUid, isPush)

  // if (res.code === 200) {
  //   isDisliked.value = isPush
  //   dislikesCount.value += isPush ? 1 : -1

  //   if (isPush) {
  //     useMessage('Dislike successfully!', '点踩成功！', 'success')
  //   } else {
  //     useMessage('Cancel dislike successfully!', '取消点踩成功！', 'success')
  //   }
  // } else {
  //   if (isPush) {
  //     useMessage('Dislike failed!', '点踩失败！', 'error')
  //   } else {
  //     useMessage('Cancel dislike failed!', '取消点踩失败！', 'error')
  //   }
  // }
}

const handleClickDislikeThrottled = throttle(
  toggleDislike,
  1007,
  throttleCallback
)

const handleClickDislike = () => {
  handleClickDislikeThrottled()
}
</script>

<template>
  <li>
    <span
      class="dislike"
      :class="isDisliked ? 'active' : ''"
      @click="handleClickDislike"
    >
      <Icon class="icon" name="line-md:thumbs-down-twotone" />
    </span>
    {{ dislikesCount }}
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

.dislike {
  font-size: 24px;
  color: var(--kungalgame-font-color-2);
  cursor: pointer;
}

.active .icon {
  color: var(--kungalgame-blue-4);
}
</style>
