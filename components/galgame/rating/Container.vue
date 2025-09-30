<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'
import type { GalgamePageRatingCard } from '~/types/api/galgame-rating'

const galgame = inject<GalgameDetail>('galgame')!
const route = useRoute()
const gid = computed(() => parseInt((route.params as { gid: string }).gid))

const ratings = ref<GalgamePageRatingCard[]>(galgame.ratings || [])

const refresh = async () => {
  const res = await $fetch(`/api/galgame/${gid.value}`, {
    method: 'GET',
    query: { galgameId: gid.value },
    watch: false,
    ...kungalgameResponseHandler
  })
  if (res && res !== 'banned') {
    ratings.value = res.ratings || []
  }
}
</script>

<template>
  <div class="space-y-3">
    <KunHeader
      name="游戏评分"
      description="发布你的游玩感受，并查看其他人的评价"
      scale="h3"
    />
    <GalgameRatingPublish :galgame-id="galgame.id" :on-published="refresh" />
  </div>
</template>
