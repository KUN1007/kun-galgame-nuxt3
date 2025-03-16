<script setup lang="ts">
import { navBarRoute } from '~/components/user/utils/routeName'

defineProps<{
  user: KunUser
}>()

const currentUserUid = usePersistUserStore().uid
</script>

<template>
  <div class="flex h-full flex-col gap-3">
    <div class="relative">
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
        <KunButton variant="flat" rounded="full" size="md" color="primary">
          <Icon name="lucide:message-circle" />
          私聊
        </KunButton>
      </NuxtLink>
    </div>

    <UserNavItem :uid="user.uid" :nav="navBarRoute" />
  </div>
</template>
