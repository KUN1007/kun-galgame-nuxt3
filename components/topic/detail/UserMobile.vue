<script setup lang="ts">
defineProps<{
  user: KunUser & { moemoepoint: number }
}>()
</script>

<template>
  <div class="flex items-center gap-2 sm:hidden">
    <KunAvatar :user="user" />
    <NuxtLink class="text-primary" :to="`/user/${user.uid}/info`">
      {{ user.name }}
    </NuxtLink>
    <p class="text-secondary flex items-center gap-1">
      <Icon class="text-inherit" name="lucide:lollipop" />
      {{ user.moemoepoint }}
    </p>
  </div>
</template>
