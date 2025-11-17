<script setup lang="ts">
import { usePersistKUNGalgameAdvancedFilterStore } from '~/store/modules/galgame'

const pageData = storeToRefs(useTempGalgameStore())
const { includeProviders, excludeOnlyProviders } = storeToRefs(
  usePersistKUNGalgameAdvancedFilterStore()
)

const { data, status } = await useFetch(`/api/galgame`, {
  method: 'GET',
  query: {
    ...pageData,
    includeProviders: includeProviders.value,
    excludeOnlyProviders: excludeOnlyProviders.value
  },
  ...kungalgameResponseHandler
})
</script>

<template>
  <div v-if="data" class="flex flex-col gap-3">
    <KunCard class-name="z-10" :is-hoverable="false" :is-transparent="false">
      <KunHeader
        name="Galgame 资源 Wiki"
        description="Galgame 资源页面, 提供各类 Galgame 下载。我们不是资源的提供者, 我们只是资源的指路人。默认仅展示 SFW (内容安全的内容), 您可以打开 NSFW (会显示涩涩等内容, 不适合在公共场合打开)"
      >
        <template #endContent>
          <GalgameCardNSFWHint />
          <GalgameCardNav :is-show-advanced="true" />
        </template>
      </KunHeader>
    </KunCard>

    <KunLoading :loading="status === 'pending'">
      <GalgameCard v-if="data.galgames" :galgames="data.galgames" />
    </KunLoading>

    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      content-class="gap-3"
    >
      <KunPagination
        v-model:current-page="pageData.page.value"
        :total-page="Math.ceil(data.totalCount / pageData.limit.value)"
        :is-loading="status === 'pending'"
      />
    </KunCard>
  </div>
</template>
