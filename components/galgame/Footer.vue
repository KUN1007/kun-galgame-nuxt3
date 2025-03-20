<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const galgame = inject<GalgameDetail>('galgame')
</script>

<template>
  <div v-if="galgame" class="flex items-center justify-end gap-1">
    <KunBadge size="md">
      <Icon name="lucide:eye" />
      <span>{{ formatNumber(galgame.views) }}</span>
    </KunBadge>

    <GalgameLike
      :gid="galgame.gid"
      :to-uid="galgame.user.uid"
      :likes-count="galgame.likes.count"
      :is-liked="galgame.likes.isLiked"
    />

    <GalgameFavorite
      :gid="galgame.gid"
      :to-uid="galgame.user.uid"
      :favorites-count="galgame.favorites.count"
      :is-favorite="galgame.favorites.isFavorite"
    />

    <GalgameRewrite :galgame="galgame" />
  </div>
</template>
