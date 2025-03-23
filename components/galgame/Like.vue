<script setup lang="ts">
const props = defineProps<{
  gid: number
  toUid: number
  likesCount: number
  isLiked: boolean
}>()

const { uid } = usePersistUserStore()
const isLiked = ref(props.isLiked)
const likesCount = ref(props.likesCount)

const toggleLikeGalgame = async () => {
  const result = await $fetch(`/api/galgame/${props.gid}/like`, {
    method: 'PUT',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    likesCount.value += isLiked.value ? -1 : 1

    if (!isLiked.value) {
      useMessage(10530, 'success')
    } else {
      useMessage(10531, 'success')
    }

    isLiked.value = !isLiked.value
  }
}

const handleClickLikeThrottled = throttle(toggleLikeGalgame, 1007, () =>
  useMessage(10528, 'warn')
)

const handleClickLike = () => {
  if (!uid) {
    useMessage(10532, 'warn', 5000)
    return
  }
  if (uid === props.toUid) {
    useMessage(10533, 'warn')
    return
  }
  handleClickLikeThrottled()
}
</script>

<template>
  <KunTooltip text="点赞">
    <KunButton
      :is-icon-only="true"
      :variant="isLiked ? 'flat' : 'light'"
      :color="isLiked ? 'secondary' : 'default'"
      :size="likesCount ? 'md' : 'lg'"
      class-name="gap-1"
      @click="handleClickLike"
    >
      <Icon name="lucide:thumbs-up" />
      <span v-if="likesCount">{{ likesCount }}</span>
    </KunButton>
  </KunTooltip>
</template>
