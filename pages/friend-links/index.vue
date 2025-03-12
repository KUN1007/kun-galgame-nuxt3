<script setup lang="ts">
import { friendArray } from '~/components/friend-links/friends'

useHead({
  title: `友情链接 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: friendArray
        .flatMap((group) =>
          group.value.map((friend) => `friends.${group.key}.${friend.name}`)
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
}

.kun-footer {
  margin-top: 30px;
}
</style>
