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
    <KunHeader name="引擎列表" description="Galgame 引擎列表">
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
