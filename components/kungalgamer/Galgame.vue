<script setup lang="ts">
import type { GalgameType } from '~/types/api/user'

const props = defineProps<{
  uid: number
  type: GalgameType
}>()

const pageData = reactive({
  page: 1,
  limit: 50,
  type: props.type
})

const { data, status } = await useFetch(`/api/user/${props.uid}/galgames`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="topic" v-if="data && data.galgames.length">
    <div class="item" v-for="(galgame, index) in data.galgames" :key="index">
      <NuxtLink :to="`/galgame/${galgame.gid}`">
        <div class="title">
          {{ galgame.name['zh-cn'] }}
        </div>
        <div class="time">
          {{ formatDate(galgame.time, { isShowYear: true }) }}
        </div>
      </NuxtLink>
    </div>

    <KunPagination
      class="pagination"
      v-if="data.totalCount > 50"
      :page="pageData.page"
      :limit="pageData.limit"
      :sum="data.totalCount"
      :status="status"
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
    transition: all 0.2s;

    &:hover {
      color: var(--kungalgame-blue-5);
      background-color: var(--kungalgame-trans-blue-0);
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
