<script setup lang="ts">
import { navBarRoute } from '~/components/user/utils/routeName'

defineProps<{
  user: KunUser
}>()
</script>

<template>
  <div class="flex h-[calc(100dvh-300px)] flex-col">
    <KunAvatar
      class-name="cursor-default mb-3 relative hidden sm:block"
      :is-navigation="false"
      size="original"
      :user="user"
      :disable-floating="true"
    />

    <KunAvatar
      class-name="cursor-default mb-3 relative block sm:hidden"
      :is-navigation="false"
      size="md"
      :user="user"
      :disable-floating="true"
    />

    <UserNavItem :uid="user.id" :nav="navBarRoute" />
  </div>
</template>
