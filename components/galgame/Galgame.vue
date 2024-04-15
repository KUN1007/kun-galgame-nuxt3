<script setup lang="ts">
import type { GalgameDetail } from '~/types/api/galgame'

const props = defineProps<{
  galgame: GalgameDetail
}>()

const localePath = useLocalePath()

const { galgamePR } = storeToRefs(useTempGalgamePRStore())

const handleRewriteGalgame = (galgame: GalgameDetail) => {
  const { gid, name, introduction, alias, official } = galgame
  galgamePR.value[0] = {
    gid,
    name,
    introduction,
    alias,
    official
  }
  navigateTo(localePath(`/edit/galgame?type=pr&gid=${galgame.gid}`))
}

provide<GalgameDetail>('galgame', props.galgame)
</script>

<template>
  <div class="galgame">
    <GalgameTitle :galgame="galgame" />

    <GalgameIntroduction :introduction="galgame.introduction" />

    <GalgameInfo :galgame="galgame" />

    <GalgameResource />

    <GalgameLink />

    <GalgameHistory />

    <GalgamePrContainer :galgame="galgame" />

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

      <span class="rewrite" @click="handleRewriteGalgame(galgame)">
        <Icon name="lucide:pencil" />
      </span>
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

.rewrite {
  color: var(--kungalgame-font-color-2);
  cursor: pointer;

  .icon {
    font-size: 24px;
  }
}
</style>
