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
      useMessage(10225, 'success')
    } else {
      useMessage(10227, 'success')
    }

    isDisliked.value = !isDisliked.value
  }
}

const handleClickDislikeThrottled = throttle(toggleDislike, 1007, () =>
  useMessage(10227, 'warn')
)

const handleClickDislike = () => {
  if (!moemoeAccessToken) {
    useMessage(10228, 'warn', 5000)
    return
  }
  if (uid === props.toUid) {
    useMessage(10229, 'warn')
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
