<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const galgame = inject<GalgameDetail>('galgame')
</script>

<template>
  <div v-if="galgame" class="flex items-center justify-between">
    <div class="flex gap-1">
      <KunTooltip :text="`浏览量: ${galgame.view}`">
        <KunBadge size="md">
          <KunIcon name="lucide:eye" />
          <span>{{ formatNumber(galgame.view) }}</span>
        </KunBadge>
      </KunTooltip>

      <GalgameLike
        :galgame-id="galgame.id"
        :target-user-id="galgame.user.id"
        :like-count="galgame.likeCount"
        :is-liked="galgame.isLiked"
      />

      <GalgameFavorite
        :galgame-id="galgame.id"
        :target-user-id="galgame.user.id"
        :favorite-count="galgame.favoriteCount"
        :is-favorited="galgame.isFavorited"
      />

      <GalgameRewrite :galgame="galgame" />
    </div>
  </div>
</template>
