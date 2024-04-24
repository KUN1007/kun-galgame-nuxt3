<script setup lang="ts">
const props = defineProps<{
  uid: number
}>()

const pageData = reactive({
  page: 1,
  limit: 50
})

const { data, pending } = await useFetch(`/api/user/${props.uid}/comments`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="comment" v-if="data && data.comments.length">
    <div
      class="item"
      v-for="(commentData, index) in data.comments"
      :key="index"
    >
      <NuxtLinkLocale :to="`/topic/${commentData.tid}`">
        <div class="title">
          {{ commentData.content }}
        </div>
      </NuxtLinkLocale>
    </div>

    <KunPagination
      class="pagination"
      v-if="data.totalCount > 50"
      :page="pageData.page"
      :limit="pageData.limit"
      :sum="data.totalCount"
      :loading="pending"
      @set-page="(newPage) => (pageData.page = newPage)"
    />
  </div>
</template>

<style lang="scss" scoped>
.item {
  width: 100%;
  margin-top: 17px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  cursor: pointer;

  a {
    border-radius: 10px;
    padding: 10px;
    height: 100%;
    color: var(--kungalgame-font-color-3);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}

.title {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
