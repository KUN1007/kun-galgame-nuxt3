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
    <div class="operation">
      <span class="hint">
        {{ $t('galgame.history.operation') }}
      </span>
      <GalgameLike
        :gid="galgame.gid"
        :to-uid="galgame.user.uid"
        :likes-count="galgame.likes.count"
        :is-liked="galgame.likes.isLiked"
        v-tooltip="{
          message: {
            'en-us': 'Like',
            'ja-jp': 'いいね',
            'zh-cn': '点赞',
            'zh-tw': '點贊'
          },
          position: 'bottom'
        }"
      />

      <GalgameFavorite
        :gid="galgame.gid"
        :to-uid="galgame.user.uid"
        :favorites-count="galgame.favorites.count"
        :is-favorite="galgame.favorites.isFavorite"
        v-tooltip="{
          message: {
            'en-us': 'Favorite',
            'ja-jp': 'お気に入り',
            'zh-cn': '收藏',
            'zh-tw': '收藏'
          },
          position: 'bottom'
        }"
      />

      <GalgameRewrite
        :galgame="galgame"
        v-tooltip="{
          message: 'Rewrite',
          position: 'bottom'
        }"
      />
    </div>
  </div>

  <LazyGalgameHistory v-if="isShowHistory" />
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

  .favorite {
    margin: 0 17px;
  }
}

.operation {
  position: relative;
  margin-right: 17px;
  display: flex;

  .hint {
    user-select: none;
    white-space: nowrap;
    position: absolute;
    font-size: small;
    top: 37px;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--kungalgame-font-color-0);
  }
}
</style>
