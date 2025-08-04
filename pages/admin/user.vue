<script setup lang="ts">
useKunDisableSeo('用户管理')

const pageData = reactive({
  page: 1,
  limit: 100
})

const { data, status } = await useFetch('/api/admin/user', {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})
</script>

<template>
  <KunCard
    v-if="data"
    :is-hoverable="false"
    :is-pressable="false"
    :is-transparent="false"
  >
    <KunHeader
      name="用户管理"
      description="您可以在此处管理所有的网站用户, 有时会有广告或者发真人色情的用户, 这时直接将该用户删除即可, 目前的管理系统仅临时使用, 非必要请不要删除用户"
      :is-show-divider="false"
    >
    </KunHeader>

    <div class="mt-6 flex flex-col gap-3">
      <AdminUserCard
        v-for="(user, index) in data.users"
        :key="index"
        :user="user"
      />
    </div>

    <KunPagination
      v-if="data.totalCount > pageData.limit"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </KunCard>
</template>
