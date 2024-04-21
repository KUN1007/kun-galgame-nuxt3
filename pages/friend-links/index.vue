<script setup lang="ts">
import { friends } from '~/components/friend-links/friends'

const { t } = useI18n()

useHead({
  title: t('seo.friends.title'),
  meta: [
    {
      name: 'description',
      content: friends.map((friend) => t(`friends.${friend.name}`)).join(' | ')
    }
  ]
})
</script>

<template>
  <div class="root">
    <FriendLinksHeader />
    <FriendLinksCard />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 64rem;
  margin: 0 auto;
  color: var(--kungalgame-font-color-3);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: var(--kungalgame-shadow-0);
}
</style>
