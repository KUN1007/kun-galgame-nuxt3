<script setup lang="ts">
defineProps<{
  user: KunUser & { moemoepoint: number }
}>()
</script>

<template>
  <div class="flex items-center gap-2 sm:hidden">
    <KunAvatar :user="user" />
    <KunLink underline="none" :to="`/user/${user.uid}/info`">
      {{ user.name }}
    </KunLink>
    <p class="text-secondary flex items-center gap-1">
      <KunIcon class="text-inherit" name="lucide:lollipop" />
      {{ user.moemoepoint }}
    </p>
  </div>
</template>
