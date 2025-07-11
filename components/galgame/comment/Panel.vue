<script setup lang="ts">
const props = defineProps<{
  refresh: () => void
}>()

const emits = defineEmits<{
  close: []
}>()

const { commentToUid } = storeToRefs(useTempGalgameResourceStore())
const route = useRoute()

const content = ref('')
const galgameId = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})
const isPublishing = ref(false)

const handlePublishComment = async () => {
  if (!content.value.trim()) {
    useMessage(10540, 'warn')
    return
  }
  if (content.value.trim().length > 1007) {
    useMessage(10541, 'warn')
    return
  }

  isPublishing.value = true
  const result = await $fetch(`/api/galgame/${galgameId.value}/comment`, {
    method: 'POST',
    body: {
      galgameId: galgameId.value,
      targetUserId: commentToUid.value,
      content: content.value
    },
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (result) {
    content.value = ''
    useMessage(10542, 'success')
    emits('close')
    props.refresh()
  }
}
</script>

<template>
  <div class="space-y-3">
    <KunTextarea
      placeholder="请注意您 “评论给” 的用户, 只有被评论的用户才会收到您的评论通知, 因此您需要在 “评论给” 的用户中选择一位资源发布者或贡献者"
      v-model="content"
      name="comment"
      :rows="5"
    />

    <div class="flex items-center justify-between">
      <slot />

      <KunButton
        class="ml-auto"
        @click="handlePublishComment"
        :loading="isPublishing"
      >
        发布评论
      </KunButton>
    </div>
  </div>
</template>
