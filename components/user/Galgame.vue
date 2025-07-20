<script setup lang="ts">
import {
  kunUserGalgameNavItem,
  type KUN_USER_PAGE_GALGAME_TYPE
} from '~/constants/user'

const props = defineProps<{
  uid: number
  type: (typeof KUN_USER_PAGE_GALGAME_TYPE)[number]
}>()

const activeTab = ref(props.type)
const pageData = reactive({
  page: 1,
  limit: 24,
  type: props.type,
  userId: props.uid
})

const { data, status } = await useFetch(`/api/user/${props.uid}/galgames`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="space-y-3">
    <KunHeader
      name="Galgame 列表"
      description="这是您的 Galgame 列表。什么你问我为什么评论还有历史都是 Galgame, 因为我还在咕咕咕! 八嘎!"
    />

    <KunTab
      :items="kunUserGalgameNavItem(uid)"
      :model-value="activeTab"
      size="sm"
    />

    <div class="flex flex-col space-y-3" v-if="data && data.galgames.length">
      <GalgameCard :is-transparent="true" :galgames="data.galgames" />

      <KunPagination
        v-if="data.totalCount > pageData.limit"
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </div>

    <KunNull
      v-if="data && !data.galgames.length"
      description="这只笨蛋萝莉没有发布过任何 Galgame"
    />
  </div>
</template>
