<script setup lang="ts">
import { friendArray } from '~/config/friend'

const description = friendArray
  .flatMap((group) => group.value.map((friend) => friend.name))
  .join(' 网站, ')

useKunSeoMeta({
  title: '友情链接网站',
  description,
  articleAuthor: friendArray.flatMap((group) =>
    group.value.map((friend) => friend.link)
  )
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${kungal.domain.main}/friend-links`
    }
  ]
})
</script>

<template>
  <FriendLinksContainer />
</template>
