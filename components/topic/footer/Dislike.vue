<script setup lang="ts">
const props = defineProps<{
  tid?: number
  rid?: number
  toUid: number
  dislikesCount: number
  isDisliked: boolean
}>()

const { uid, moemoeAccessToken } = usePersistUserStore()
const isDisliked = ref(props.isDisliked)
const dislikesCount = ref(props.dislikesCount)

const toggleDislike = async () => {
  let res = ''
  if (props.tid) {
    const result = await $fetch(`/api/topic/${props.tid}/dislike`, {
      method: 'PUT',
      watch: false,
      ...kungalgameResponseHandler
    })
    res = result ?? ''
  } else {
    const result = await $fetch(`/api/topic/${props.tid}/reply/dislike`, {
      method: 'PUT',
      query: { rid: props.rid },
      watch: false,
      ...kungalgameResponseHandler
    })
    res = result ?? ''
  }

  if (res) {
    dislikesCount.value += isDisliked.value ? -1 : 1

    if (!isDisliked.value) {
      useMessage('Dislike successfully!', '点踩成功！', 'success')
    } else {
      useMessage('Cancel Dislike successfully!', '取消点踩成功！', 'success')
    }

    isDisliked.value = !isDisliked.value
  }
}

const handleClickDislikeThrottled = throttle(toggleDislike, 1007, () =>
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
    <Icon class="icon" name="lucide:thumbs-down" />
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
    cursor: pointer;
    font-size: 24px;
    margin-right: 3px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}

@media (max-width: 700px) {
  .dislike {
    .icon {
      font-size: initial;
    }
  }
}
</style>
