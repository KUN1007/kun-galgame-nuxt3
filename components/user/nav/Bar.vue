<script setup lang="ts">
import { navBarRoute } from '~/components/user/utils/routeName'

defineProps<{
  user: KunUser
}>()

const currentUserUid = usePersistUserStore().uid
</script>

<template>
  <div class="flex h-full flex-col gap-3">
    <div class="relative hidden sm:block">
      <KunAvatar
        class-name="cursor-default"
        :is-navigation="false"
        size="original"
        :user="user"
      />
      <NuxtLink
        class="absolute right-0 bottom-0"
        v-if="currentUserUid !== user.uid"
        :to="`/message/user/${user.uid}`"
      >
        <KunButton rounded="full" size="sm" color="primary">
          <Icon class="mr-1" name="lucide:message-circle" />
          私聊
        </KunButton>
      </NuxtLink>
    </div>

    <div class="relative block sm:hidden">
      <KunAvatar
        class-name="cursor-default"
        :is-navigation="false"
        size="md"
        :user="user"
      />
    </div>

    <UserNavItem :uid="user.uid" :nav="navBarRoute" />
  </div>
</template>
