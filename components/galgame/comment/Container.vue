<script setup lang="ts">
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})
const { locale } = useI18n()

const commentData = reactive({
  toUid: 0,
  content: ''
})
const isPublishing = ref(false)
const pageData = reactive({
  page: 1,
  limit: 10
})

const { data, refresh } = await useFetch(
  `/api/galgame/${gid.value}/comment/all`,
  {
    method: 'GET',
    query: pageData,
    ...kungalgameResponseHandler
  }
)

const handlePublishComment = async () => {
  isPublishing.value = true
  const { data } = await useFetch(`/api/galgame/${gid.value}/comment`, {
    method: 'POST',
    body: commentData,
    watch: false,
    ...kungalgameResponseHandler
  })
  isPublishing.value = false

  if (data.value) {
    commentData.toUid = 0
    commentData.content = ''
    useMessage('Publish comment successfully!', '发布评论成功', 'success')
    refresh()
  }
}
</script>

<template>
  <KunHeader :size="2">
    <template #header>评论</template>
  </KunHeader>
  <div>
    <div class="panel">
      <textarea v-model="commentData.content" name="comment" rows="5" />

      <div class="footer">
        <div>
          <span>评论给</span>
          <KunInput v-model="commentData.toUid" />
        </div>
        <KunButton @click="handlePublishComment">发布评论</KunButton>
      </div>
    </div>

    <div class="comments" v-if="data && data.totalCount">
      <div v-for="(comment, index) in data.commentData" :key="index">
        {{ comment }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  textarea {
    color: var(--kungalgame-font-color-3);
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid var(--kungalgame-trans-blue-2);
    background-color: var(--kungalgame-trans-white-9);
    border-radius: 10px;
    padding: 5px;
    resize: none;

    &:focus {
      border: 1px solid var(--kungalgame-blue-5);
      background-color: var(--kungalgame-trans-blue-0);
    }
  }

  .footer {
    width: 100%;
    display: flex;

    .kun-button {
      margin-left: auto;
    }
  }
}
</style>
