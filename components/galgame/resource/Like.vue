<script setup lang="ts">
const props = defineProps<{
  galgameId: number
  galgameResourceId: number
  targetUserId: number
  isLiked: boolean
  likeCount: number
}>()

const { id } = usePersistUserStore()
const isLiked = ref(id && props.isLiked)
const likeCount = ref(props.likeCount)

const likeResource = async () => {
  const result = await $fetch(`/api/galgame/${props.galgameId}/resource/like`, {
    method: 'PUT',
    body: { galgameResourceId: props.galgameResourceId },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    likeCount.value += isLiked.value ? -1 : 1

    if (!isLiked.value) {
      useMessage('点赞资源成功', 'success')
    } else {
      useMessage('取消点赞成功', 'success')
    }

    isLiked.value = !isLiked.value
  }
}

const handleClickLike = async () => {
  if (!id) {
    useMessage(10532, 'warn', 5000)
    return
  }

  if (id === props.targetUserId) {
    useMessage('您不能给自己点赞', 'warn')
    return
  }
  await likeResource()
}
</script>

<template>
  <KunTooltip text="点赞">
    <KunButton
      :is-icon-only="true"
      :variant="isLiked ? 'flat' : 'light'"
      :color="isLiked ? 'secondary' : 'default'"
      :size="likeCount ? 'sm' : 'md'"
      class-name="gap-1"
      @click="handleClickLike"
    >
      <KunIcon name="lucide:thumbs-up" />
      <span v-if="likeCount">{{ likeCount }}</span>
    </KunButton>
  </KunTooltip>
</template>
