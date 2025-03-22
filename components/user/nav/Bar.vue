<script setup lang="ts">
import { navBarRoute } from '~/components/user/utils/routeName'

defineProps<{
  user: KunUser
}>()
</script>

<template>
  <div class="flex h-full flex-col gap-3">
    <KunAvatar
      class-name="cursor-default relative hidden sm:block"
      :is-navigation="false"
      size="original"
      :user="user"
    />

    <KunAvatar
      class-name="cursor-default relative block sm:hidden"
      :is-navigation="false"
      size="md"
      :user="user"
    />

    <UserNavItem :uid="user.uid" :nav="navBarRoute" />
  </div>
</template>
