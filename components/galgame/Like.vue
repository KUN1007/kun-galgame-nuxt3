<script setup lang="ts">
const props = defineProps<{
  gid: number
  toUid: number
  likesCount: number
  isLiked: boolean
}>()

const { uid, moemoeAccessToken } = usePersistUserStore()
const isLiked = ref(props.isLiked)
const likesCount = ref(props.likesCount)

const toggleLikeGalgame = async () => {
  const { data } = await useFetch(`/api/galgame/${props.gid}/like`, {
    method: 'PUT',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (data.value) {
    likesCount.value += isLiked.value ? -1 : 1

    if (!isLiked.value) {
      useMessage('Like successfully!', '点赞成功！', 'success')
    } else {
      useMessage('Unlike successfully!', '取消点赞成功！', 'success')
    }

    isLiked.value = !isLiked.value
  }
}

const handleClickLikeThrottled = throttle(toggleLikeGalgame, 1007, () =>
  useMessage(
    'You can only perform one operation within 1007 milliseconds',
    '您在 1007 毫秒内只能进行一次操作',
    'warn'
  )
)

const handleClickLike = () => {
  if (!moemoeAccessToken) {
    useMessage('You need to login to like', '您需要登录以点赞', 'warn', 5000)
    return
  }
  if (uid === props.toUid) {
    useMessage('You cannot like yourself', '您不可以给自己点赞', 'warn')
    return
  }
  handleClickLikeThrottled()
}
</script>

<template>
  <span class="like" :class="isLiked ? 'active' : ''" @click="handleClickLike">
    <Icon name="lucide:thumbs-up" />
    <span v-if="likesCount">{{ likesCount }}</span>
  </span>
</template>

<style lang="scss" scoped>
.like {
  color: var(--kungalgame-font-color-2);
  cursor: pointer;

  .icon {
    font-size: 24px;
    margin-right: 3px;
  }
}

.active .icon {
  color: var(--kungalgame-red-4);
}
</style>
