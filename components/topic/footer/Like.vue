<script setup lang="ts">
const props = defineProps<{
  tid?: number
  rid?: number
  toUid: number
  likesCount: number
  isLiked: boolean
}>()

const { uid, moemoeAccessToken } = usePersistUserStore()
const isLiked = ref(props.isLiked)
const likesCount = ref(props.likesCount)

const toggleLike = async () => {
  let res = ''
  if (props.tid) {
    const result = await $fetch(`/api/topic/${props.tid}/like`, {
      method: 'PUT',
      watch: false,
      ...kungalgameResponseHandler
    })
    res = result ?? ''
  } else {
    const result = await $fetch(`/api/topic/${props.tid}/reply/like`, {
      method: 'PUT',
      query: { rid: props.rid },
      watch: false,
      ...kungalgameResponseHandler
    })
    res = result ?? ''
  }

  if (res) {
    likesCount.value += isLiked.value ? -1 : 1

    if (!isLiked.value) {
      useMessage(10233, 'success')
    } else {
      useMessage(10234, 'success')
    }

    isLiked.value = !isLiked.value
  }
}

const handleClickLikeThrottled = throttle(toggleLike, 1007, () =>
  useMessage(10227, 'warn')
)

const handleClickLike = () => {
  if (!moemoeAccessToken) {
    useMessage(10235, 'warn', 5000)
    return
  }
  if (uid === props.toUid) {
    useMessage(10236, 'warn')
    return
  }
  handleClickLikeThrottled()
}
</script>

<template>
  <span class="like" :class="isLiked ? 'active' : ''" @click="handleClickLike">
    <Icon class="icon" name="lucide:thumbs-up" />
    <span v-if="likesCount">{{ likesCount }}</span>
  </span>
</template>

<style lang="scss" scoped>
.like {
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
  .like {
    .icon {
      font-size: initial;
    }
  }
}
</style>
