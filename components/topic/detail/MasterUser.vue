<script setup lang="ts">
const props = defineProps<{
  user: {
    id: number
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
    class-name="w-36 shrink-0 hidden lg:flex"
    content-class="justify-start items-center gap-3"
  >
    <KunAvatar size="original-sm" :user="user" />

    <KunLink
      underline="hover"
      :aria-label="props.user.name"
      :to="`/user/${user.id}/info`"
    >
      {{ user.name }}
    </KunLink>

    <p class="text-secondary flex items-center gap-1">
      <KunIcon class="text-inherit" name="lucide:lollipop" />
      {{ user.moemoepoint }}
    </p>
  </KunCard>
</template>
