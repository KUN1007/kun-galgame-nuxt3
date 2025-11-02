<script setup lang="ts">
const route = useRoute()

const uid = computed(() => {
  return parseInt((route.params as { uid: string }).uid)
})

const { data } = await useFetch(`/api/user/${uid.value}`, {
  method: 'GET',
  query: { userId: uid },
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
  <div class="contents">
    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      class-name="m-auto"
      content-class="h-[calc(100dvh-120px)]"
      v-if="data !== 'banned'"
    >
      <div v-if="data" class="flex h-full w-full">
        <UserNavBar
          :user="{ id: data.id, name: data.name, avatar: data.avatar }"
        />

        <div class="scrollbar-hide h-full w-full overflow-y-auto pl-3">
          <NuxtPage :user="data" />
        </div>
      </div>

      <KunNull v-if="!data" description="未找到该用户" />
    </KunCard>

    <KunCard
      v-if="data === 'banned'"
      :is-hoverable="false"
      :is-transparent="false"
      content-class="h-[calc(100dvh-120px)]"
    >
      <KunNull description="此用户已被封禁" />
    </KunCard>
  </div>
</template>
