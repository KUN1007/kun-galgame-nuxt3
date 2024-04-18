<script setup lang="ts">
const props = defineProps<{
  tid: number
  toUid: number
  dislikesCount: number
  isDisliked: boolean
}>()

const { uid, moemoeAccessToken } = usePersistUserStore()
const isDisliked = ref(props.isDisliked)
const dislikesCount = ref(props.dislikesCount)

const toggleDislikeTopic = async () => {
  const result = await $fetch(`/api/topic/${props.tid}/dislike`, {
    method: 'PUT',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    dislikesCount.value += isDisliked ? -1 : 1

    if (!isDisliked) {
      useMessage('Like successfully!', '点踩成功！', 'success')
    } else {
      useMessage('Cancel Dislike successfully!', '取消点踩成功！', 'success')
    }

    isDisliked.value = !isDisliked.value
  }
}

const handleClickDislikeThrottled = throttle(toggleDislikeTopic, 1007, () =>
  useMessage(
    'You can only perform one operation within 1007 milliseconds',
    '您在 1007 毫秒内只能进行一次操作',
    'warn'
  )
)

const handleClickDislike = () => {
  if (!moemoeAccessToken) {
    useMessage('You need to login to dislike', '您需要登录以点踩', 'warn', 5000)
    return
  }
  if (uid === props.toUid) {
    useMessage('You cannot dislike yourself', '您不可以给自己点踩', 'warn')
    return
  }
  handleClickDislikeThrottled()
}
</script>

<template>
  <span
    class="dislike"
    :class="isDisliked ? 'active' : ''"
    @click="handleClickDislike"
  >
    <Icon class="icon" name="lucide:thumbs-up" />
    <span v-if="dislikesCount">{{ dislikesCount }}</span>
  </span>
</template>

<style lang="scss" scoped>
.dislike {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0;
  color: var(--kungalgame-font-color-2);

  .icon {
    font-size: 24px;
    margin-right: 3px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}

@media (max-width: 700px) {
  .icon {
    font-size: initial;
  }
}
</style>
