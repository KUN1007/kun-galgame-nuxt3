<script setup lang="ts">
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
} = storeToRefs(useKUNGalgameUserStore())

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
  title: user.value?.name,
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
    <div class="container" v-if="user">
      <KungalgamerHeader
        :name="user.name"
        :avatar="user.avatar"
        :moemoepoint="user.moemoepoint"
      />

      <div class="content">
        <KungalgamerNavBar :uid="uid" />
        <NuxtPage :user="user" />
      </div>
    </div>

    <KunBlank info="user.notFound" v-if="!user && !isBanned"></KunBlank>

    <KunBlank info="user.banned" v-if="isBanned"></KunBlank>

    <KunFooter style="margin: 0 auto; padding-bottom: 17px" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100vh - 75px);
  min-height: 800px;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.container {
  width: 60%;
  height: 70%;
  min-height: 700px;
  width: 100%;
  max-width: 48rem;
  background-color: var(--kungalgame-trans-white-2);
  border: 1px solid var(--kungalgame-blue-5);
  box-shadow: var(--shadow);
  border-radius: 10px;
  margin: auto;
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  transition: all 0.2s;
}

h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--kungalgame-red-5);
}

.content {
  height: 1px;
  flex-grow: 1;
  display: flex;
}

@media (max-width: 1000px) {
  .container {
    width: 90%;
  }
}

@media (max-width: 700px) {
  .container {
    width: 97%;
    height: 90%;
  }
}
</style>
