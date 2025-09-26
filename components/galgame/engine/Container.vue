<script setup lang="ts">
const { data } = await useFetch(`/api/galgame-engine`, {
  method: 'GET',
  ...kungalgameResponseHandler
})
</script>

<template>
  <KunCard
    :is-transparent="false"
    :is-hoverable="false"
    :is-pressable="false"
    content-class="space-y-6"
  >
    <KunHeader
      name="Galgame 引擎 Wiki"
      description="Galgame 引擎 Wiki, 这里展示了世界上大多数常见的 Galgame 制作引擎, 例如 KRKR 引擎, YU-RIS 引擎, 椎名理绪引擎等"
    >
      <template #endContent>
        <span>
          {{ `总计 ${data?.length || 0} 个引擎` }}
        </span>
      </template>
    </KunHeader>

    <div
      class="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4"
    >
      <GalgameEngineCard
        v-for="engine in data"
        :key="engine.id"
        :engine="engine"
      />
    </div>

    <KunNull v-if="data && !data.length" />
  </KunCard>
</template>
