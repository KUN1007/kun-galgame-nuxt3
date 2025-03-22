<script setup lang="ts">
const route = useRoute()

const uid = computed(() => {
  return parseInt((route.params as { uid: string }).uid)
})

const { data } = await useFetch(`/api/user/${uid.value}`, {
  method: 'GET',
  ...kungalgameResponseHandler
})

useHead({
  title:
    data.value === 'banned'
      ? '该用户已被封禁'
      : `${data.value?.name} - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: data.value !== 'banned' ? data.value?.bio : '该用户已被封禁'
    }
  ]
})
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    class-name="m-auto"
    content-class="h-[calc(100dvh-120px)]"
    v-if="data !== 'banned'"
  >
    <div class="flex h-full w-full gap-3">
      <UserNavBar
        v-if="data"
        :user="{ uid: data.uid, name: data.name, avatar: data.avatar }"
      />

      <div class="h-full w-full overflow-y-auto">
        <NuxtPage :user="data" />
      </div>
    </div>

    <KunNull v-if="!data" />
  </KunCard>

  <KunCard
    :is-hoverable="false"
    :is-transparent="false"
    content-class="h-[calc(100dvh-120px)]"
  >
    <KunNull v-if="data === 'banned'" description="此用户已被封禁" />
  </KunCard>
</template>
