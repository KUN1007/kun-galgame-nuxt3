<script setup lang="ts">
const getLink = (link: 'galgame' | 'topic') =>
  `${useRuntimeConfig().public.KUN_GALGAME_URL}/rss/${link}.xml`
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="space-y-6"
    class-name="min-h-[calc(100dvh-6rem)]"
  >
    <KunHeader
      name="RSS 订阅"
      description="论坛目前支持话题与 Galgame 资源 RSS 订阅, RSS 数据源每 17 分钟更新一次"
    />

    <KunCard :is-hoverable="false">
      <h2 class="text-xl">话题 RSS</h2>

      <div class="flex flex-wrap items-center gap-2">
        <KunLink :to="getLink('topic')" target="_blank">
          {{ getLink('topic') }}
        </KunLink>
        <KunCopy :text="getLink('topic')" name="复制 RSS 链接" />
      </div>
    </KunCard>

    <KunCard :is-hoverable="false">
      <h2 class="text-xl">Galgame RSS</h2>

      <div class="flex flex-wrap items-center gap-2">
        <KunLink :to="getLink('galgame')" target="_blank">
          {{ getLink('galgame') }}
        </KunLink>
        <KunCopy :text="getLink('galgame')" name="复制 RSS 链接" />
      </div>
    </KunCard>
  </KunCard>
</template>
