<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  galgame: GalgameDetail
}>()

provide<GalgameDetail>('galgame', props.galgame)
</script>

<template>
  <div class="galgame">
    <GalgameTitle :galgame="galgame" />

    <GalgameIntroduction :introduction="galgame.introduction" />

    <GalgameInfo :galgame="galgame" />

    <GalgameResource />

    <GalgameLink />

    <GalgamePrContainer />

    <GalgameHistory />

    <GalgameContributor :views="galgame.views" />

    <div class="footer">
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

    <KunDivider />

    <h2>评论</h2>
    <div>发布评论</div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: flex-end;

  span {
    margin-right: 17px;
  }
}
</style>
