<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const isShowHistory = ref(false)

const galgame = inject<GalgameDetail>('galgame')
</script>

<template>
  <div class="footer" v-if="galgame">
    <span class="history" @click="isShowHistory = !isShowHistory">
      {{ $t('galgame.history.name') }}
    </span>
    <div>
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

  <GalgameHistory v-if="isShowHistory" />
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 17px;

  .history {
    cursor: pointer;
    font-style: oblique;
    color: var(--kungalgame-blue-5);
  }

  span {
    margin-right: 17px;
  }
}
</style>
