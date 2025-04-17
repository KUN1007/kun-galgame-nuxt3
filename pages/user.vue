<script setup lang="ts">
const route = useRoute()

const uid = computed(() => {
  return parseInt((route.params as { uid: string }).uid)
})

const { data } = await useFetch(`/api/user/${uid.value}`, {
  method: 'GET',
  ...kungalgameResponseHandler
})

if (data.value === 'banned') {
  useHead({
    meta: [{ name: 'robots', content: 'noindex, nofollow' }]
  })
  useKunSeoMeta({
    title: '该用户已被封禁',
    description: '该用户已被封禁'
  })
} else {
  useKunSeoMeta({
    title: data.value?.name,
    description: data.value?.bio
  })
}
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    class-name="m-auto"
    content-class="h-[calc(100dvh-120px)]"
    v-if="data !== 'banned'"
  >
    <div class="flex h-full w-full">
      <UserNavBar
        v-if="data"
        :user="{ uid: data.uid, name: data.name, avatar: data.avatar }"
      />

      <div class="scrollbar-hide h-full w-full overflow-y-auto px-3">
        <NuxtPage :user="data" />
      </div>
    </div>

    <KunNull v-if="!data" />
  </KunCard>

  <KunCard
    v-if="data === 'banned'"
    :is-hoverable="false"
    :is-transparent="false"
    content-class="h-[calc(100dvh-120px)]"
  >
    <KunNull description="此用户已被封禁" />
  </KunCard>
</template>
