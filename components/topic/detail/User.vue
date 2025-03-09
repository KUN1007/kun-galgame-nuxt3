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
    class-name="w-52 shrink-0"
    :is-hoverable="false"
    content-class="justify-start items-center gap-3"
  >
    <KunAvatar size="lg" :user="user" />

    <NuxtLink
      :aria-label="props.user.name"
      :to="`/kungalgamer/${user.uid}/info`"
    >
      {{ user.name }}
    </NuxtLink>

    <p class="text-secondary flex items-center gap-1">
      <Icon class="text-inherit" name="lucide:lollipop" />
      {{ user.moemoepoint }}
    </p>
  </KunCard>
</template>
