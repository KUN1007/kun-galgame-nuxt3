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
const gid = computed(() => {
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
  const result = await $fetch(`/api/galgame/${gid.value}/comment`, {
    method: 'POST',
    body: { toUid: commentToUid.value, content: content.value },
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
      placeholder="「恋だよ、恋。私に出来なかったことのひとつを、君に代わりにかなえてもらう」"
      v-model="content"
      name="comment"
      :rows="5"
    />

    <div class="flex items-center justify-between">
      <slot />

      <KunButton
        class="ml-auto"
        @click="handlePublishComment"
        :pending="isPublishing"
      >
        发布评论
      </KunButton>
    </div>
  </div>
</template>
