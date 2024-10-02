<script setup lang="ts">
import { navBarRoute } from '~/components/kungalgamer/utils/routeName'
import type { UserInfo } from '~/types/api/user'

const user = ref<UserInfo>()
const isBanned = ref(false)

const route = useRoute()
const { t } = useI18n()

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
  title: `${user.value?.name} - ${t('head.title')}`,
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
        :uid="user.uid"
        :name="user.name"
        :avatar="user.avatar"
        :moemoepoint="user.moemoepoint"
      />

      <div class="content">
        <KungalgamerNavBar :uid="uid" :nav="navBarRoute" />
        <NuxtPage :user="user" />
      </div>
    </div>

    <KunNull :condition="!user && !isBanned" type="404" />

    <KunBlank v-if="isBanned">
      {{ $t('user.banned') }}
    </KunBlank>

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
  margin: auto;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;

  @include kun-blur;
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
