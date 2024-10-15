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
  <div class="panel">
    <KunTextarea
      placeholder="「恋だよ、恋。私に出来なかったことのひとつを、君に代わりにかなえてもらう」"
      v-model="content"
      name="comment"
      rows="5"
    />

    <div class="footer">
      <slot />

      <KunButton @click="handlePublishComment" :pending="isPublishing">
        {{ $t('galgame.comment.publish') }}
      </KunButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  margin-bottom: 17px;

  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .kun-button {
      margin-left: auto;
    }
  }
}
</style>
