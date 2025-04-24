<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const galgame = inject<GalgameDetail>('galgame')
</script>

<template>
  <div v-if="galgame" class="flex items-center justify-between">
    <KunBadge
      size="md"
      :color="galgame.contentLimit === 'sfw' ? 'success' : 'danger'"
    >
      {{ galgame.contentLimit.toLocaleUpperCase() }}
    </KunBadge>

    <div class="flex gap-1">
      <KunTooltip :text="`浏览量: ${galgame.views}`">
        <KunBadge size="md">
          <KunIcon name="lucide:eye" />
          <span>{{ formatNumber(galgame.views) }}</span>
        </KunBadge>
      </KunTooltip>

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
  </div>
</template>
