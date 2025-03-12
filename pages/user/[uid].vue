<script setup lang="ts">
import { navBarRoute } from '~/components/user/utils/routeName'
import type { UserInfo } from '~/types/api/user'

const user = ref<UserInfo>()
const isBanned = ref(false)

const route = useRoute()

const uid = computed(() => {
  return parseInt((route.params as { uid: string }).uid)
})
const {
  uid: currentUserUid,
  avatar,
  avatarMin,
  moemoepoint
} = storeToRefs(usePersistUserStore())

const { data, refresh } = await useFetch(`/api/user/${uid.value}`, {
  method: 'GET',
  ...kungalgameResponseHandler
})

if (data.value === 'banned') {
  isBanned.value = true
} else {
  user.value = data.value ?? undefined
}

provide('refresh', refresh)

onMounted(() => {
  if (!user.value || currentUserUid.value !== uid.value) {
    return
  }
  if (user.value.avatar) {
    avatar.value = user.value.avatar
    avatarMin.value = avatar.value.replace(/\.webp$/, '-100.webp')
  }
  moemoepoint.value = user.value.moemoepoint
})

useHead({
  title: `${user.value?.name} - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: user.value?.bio ? user.value?.bio : user.value?.name
    }
  ]
})
</script>

<template>
  <div class="root">
    <div class="container">
      <UserHeader
        v-if="user"
        :uid="user.uid"
        :name="user.name"
        :avatar="user.avatar"
        :moemoepoint="user.moemoepoint"
      />

      <div class="content">
        <UserNavBar :uid="uid" :nav="navBarRoute" />
        <NuxtPage :user="user" />
      </div>
    </div>

    <KunNull :condition="!user && !isBanned" type="404" />

    <KunBlank v-if="isBanned">此用户已被封禁</KunBlank>

    <KunFooter />
  </div>
</template>

<style lang="scss" scoped>
.root {
  margin: 0 auto;
  min-height: 800px;
  max-width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 100%;
  margin: auto;
}

.content {
  min-height: 700px;
  display: flex;
}

.kun-footer {
  margin: 16px 0;
}

@media (max-width: 700px) {
  .root {
    padding: 0 5px;
  }
}
</style>
