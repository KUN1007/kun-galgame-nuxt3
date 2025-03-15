<script setup lang="ts">
import { friendArray } from '~/config/friend'

useHead({
  title: '友情链接',
  meta: [
    {
      name: 'description',
      content: friendArray
        .flatMap((group) => group.value.map((friend) => friend.name))
        .join(' | ')
    }
  ]
})
</script>

<template>
  <FriendLinksContainer />
</template>
