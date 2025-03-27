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
    :is-transparent="false"
    :is-hoverable="false"
    class-name="w-52 shrink-0 hidden md:flex"
    content-class="justify-start items-center gap-3"
  >
    <KunAvatar size="lg" :user="user" />

    <KunLink
      underline="hover"
      :aria-label="props.user.name"
      :to="`/user/${user.uid}/info`"
    >
      {{ user.name }}
    </KunLink>

    <p class="text-secondary flex items-center gap-1">
      <KunIcon class="text-inherit" name="lucide:lollipop" />
      {{ user.moemoepoint }}
    </p>
  </KunCard>
</template>
