<script setup lang="ts">
import { friendArray } from '~/components/friend-links/friends'

const { t } = useI18n()

useHead({
  title: `${t('seo.friends.title')} - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: friendArray
        .flatMap((group) =>
          group.value.map((friend) => t(`friends.${group.key}.${friend.name}`))
        )
        .join(' | ')
    }
  ]
})
</script>

<template>
  <div class="root">
    <FriendLinksHeader />
    <FriendLinksCard />
    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 17px;

  @include kun-blur;
}

.kun-footer {
  margin-top: 30px;
}
</style>
