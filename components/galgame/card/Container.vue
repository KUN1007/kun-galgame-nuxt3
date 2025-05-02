<script setup lang="ts">
const pageData = storeToRefs(useTempGalgameStore())
const { showKUNGalgameContentLimit } = storeToRefs(usePersistSettingsStore())

const { data, status } = await useFetch(`/api/galgame`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

const isNSFWEnable = computed(
  () =>
    showKUNGalgameContentLimit.value === 'nsfw' ||
    showKUNGalgameContentLimit.value === 'all'
)
const description = isNSFWEnable.value
  ? '网站已启用 NSFW, 杂鱼~♡ 臭杂鱼♡, 请注意您周围没有人'
  : '网站未启用 NSFW, 部分 Galgame 不可见, 要查看所有 Galgame, 请在网站右上角打开 NSFW'
</script>

<template>
  <div v-if="data" class="flex flex-col gap-3">
    <KunCard :is-hoverable="false" :is-transparent="false">
      <KunHeader
        name="Galgame 资源 Wiki"
        description="Galgame 资源页面, 提供各类 Galgame 下载。我们不是资源的提供者, 我们只是资源的指路人。默认仅展示 SFW (内容安全的内容), 您可以打开 NSFW (会显示涩涩等内容, 不适合在公共场合打开)"
        :is-show-divider="false"
      >
        <template #endContent>
          <KunSettingPanelComponentsNSFW />
        </template>
      </KunHeader>
    </KunCard>

    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      :color="isNSFWEnable ? 'danger' : 'warning'"
    >
      <div class="flex items-center gap-2">
        <KunIcon
          :class="
            cn('h-5 w-5', isNSFWEnable ? 'text-danger' : 'text-warning-600')
          "
          :name="isNSFWEnable ? 'lucide:ban' : 'lucide:shield-check'"
        />
        <p>{{ description }}</p>
      </div>
    </KunCard>

    <GalgameCardNav />

    <GalgameCard v-if="data.galgames" :galgames="data.galgames" />

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
