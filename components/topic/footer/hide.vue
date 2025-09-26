<script setup lang="ts">
const props = defineProps<{
  topicId: number
}>()

const { id, role } = usePersistUserStore()
const topicUserId = inject<number>('topicUserId')

const isDisabled = role < 2 && topicUserId !== id

const handleUpdateTopicHideStatus = async () => {
  const res = await useComponentMessageStore().alert(
    '八嘎杂鱼笨蛋萝莉, 你要隐藏该话题吗, 隐藏后此话题任何人都不可见, 您可以在您的主页重新启用被隐藏的话题'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/topic/${props.topicId}/hide`, {
    method: 'PUT',
    watch: false,
    body: { topicId: props.topicId },
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage('隐藏话题成功', 'success')
  }
}
</script>

<template>
  <KunButton
    variant="light"
    color="danger"
    size="sm"
    :disabled="isDisabled"
    @click="handleUpdateTopicHideStatus"
    class-name="whitespace-nowrap gap-2 justify-start"
  >
    <KunIcon class-name="text-lg" name="lucide:ban" />
    隐藏该话题
  </KunButton>
</template>
