<script setup lang="ts">
const props = defineProps<{
  toUser: KunUser
  refresh: () => {}
}>()

const emits = defineEmits<{
  close: []
}>()

const content = ref('')

const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})
const isPublishing = ref(false)

const handlePublishComment = async () => {
  if (!content.value.trim()) {
    useMessage('Comment cannot be empty!', '评论不能为空', 'warn')
    return
  }
  if (content.value.trim().length > 1007) {
    useMessage(
      'The maximum length of comment is 1007 characters!',
      '评论最大长度为 1007 个字符',
      'warn'
    )
    return
  }

  isPublishing.value = true
  const result = await $fetch(`/api/galgame/${gid.value}/comment`, {
    method: 'POST',
    body: { toUid: props.toUser.uid, content: content.value },
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (result) {
    content.value = ''
    useMessage('Publish comment successfully!', '发布评论成功', 'success')
    emits('close')
    props.refresh()
  }
}
</script>

<template>
  <div class="panel">
    <textarea
      placeholder="「恋だよ、恋。私に出来なかったことのひとつを、君に代わりにかなえてもらう」"
      v-model="content"
      name="comment"
      rows="5"
    />

    <div class="footer">
      <slot />
      <span v-if="toUser">
        <span>{{ $t('galgame.comment.to') }}</span>
        <NuxtLinkLocale :to="`/kungalgamer/${toUser.uid}/info`">
          {{ toUser.name }}
        </NuxtLinkLocale>
      </span>
      <KunButton @click="handlePublishComment" :pending="isPublishing">
        {{ $t('galgame.comment.publish') }}
      </KunButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  margin-bottom: 17px;

  textarea {
    color: var(--kungalgame-font-color-3);
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid var(--kungalgame-trans-blue-2);
    background-color: transparent;
    border-radius: 10px;
    padding: 5px;
    resize: vertical;

    &:focus {
      border: 1px solid var(--kungalgame-blue-5);
      background-color: var(--kungalgame-trans-blue-0);
    }
  }

  .footer {
    width: 100%;
    display: flex;

    a {
      color: var(--kungalgame-blue-5);
    }

    .kun-button {
      margin-left: auto;
    }
  }
}
</style>
