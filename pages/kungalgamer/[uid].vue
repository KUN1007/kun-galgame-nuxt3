<script setup lang="ts">
const route = useRoute()

const uid = computed(() => {
  return parseInt((route.params as { uid: string }).uid)
})
const {
  uid: currentUserUid,
  avatar,
  avatarMin,
  moemoepoint,
} = storeToRefs(useKUNGalgameUserStore())

const { data: user, refresh } = await useFetch(`/api/user/${uid.value}`, {
  method: 'GET',
  ...kungalgameResponseHandler,
})

provide('refresh', refresh)

onMounted(async () => {
  if (!user.value || currentUserUid.value !== uid.value) {
    return
  }
  if (user.value.avatar) {
    avatar.value = user.value.avatar
    avatarMin.value = avatar.value.replace(/\.webp$/, '-100.webp')
  }
  moemoepoint.value = user.value.moemoepoint
})
</script>

<template>
  <div class="root">
    <div class="container">
      <KungalgamerHeader
        :name="user?.name"
        :avatar="user?.avatar"
        :moemoepoint="user?.moemoepoint"
      />

      <div class="content">
        <KungalgamerNavBar :uid="uid" />
        <NuxtPage :user="user" />
      </div>
    </div>

    <KunFooter style="margin: 0 auto; padding-bottom: 17px" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100vh - 65px);
  min-height: 800px;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.container {
  width: 60%;
  height: 70%;
  min-height: 700px;
  max-width: 1350px;
  max-width: 1200px;
  background-color: var(--kungalgame-trans-white-2);
  border: 1px solid var(--kungalgame-blue-4);
  box-shadow: var(--shadow);
  border-radius: 7px;
  margin: auto;
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  transition: all 0.2s;
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
