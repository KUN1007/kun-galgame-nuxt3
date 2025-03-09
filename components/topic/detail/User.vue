<script setup lang="ts">
const props = defineProps<{
  user: {
    uid: number
    name: string
    avatar: string
    moemoepoint: number
  }
}>()

const user = computed(() => props.user)
</script>

<template>
  <KunCard
    class="w-64"
    :is-hoverable="false"
    content-class="justify-start items-center"
  >
    <KunAvatar size="lg" :user="user" />

    <NuxtLink
      :aria-label="props.user.name"
      :to="`/kungalgamer/${user.uid}/info`"
    >
      {{ user.name }}
    </NuxtLink>

    <p class="text-secondary">
      <Icon class="text-inherit" name="lucide:lollipop" />
      {{ user.moemoepoint }}
    </p>
  </KunCard>
</template>
