<script setup lang="ts">
const route = useRoute()

const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const { data, status } = await useLazyFetch(
  `/api/galgame/${gid.value}/series`,
  {
    method: 'GET',
    watch: false,
    ...kungalgameResponseHandler
  }
)
</script>

<template>
  <div class="space-y-3">
    <KunHeader
      name="游戏系列"
      description="同一部作品的其它 Galgame, 例如 `巧克甜恋 1, 巧克甜恋 2, 巧克甜恋 3` 就是一个系列"
    />

    <KunLoading v-if="status === 'pending'" />

    <div class="flex gap-2" v-if="data && status !== 'pending'">
      <NuxtLink
        v-for="(link, index) in data"
        :key="index"
        :to="`/galgame/${link.gid}`"
      >
        {{ link.name['zh-cn'] }}
      </NuxtLink>
    </div>
  </div>
</template>
