<script setup lang="ts">
const props = defineProps<{
  user: {
    uid: number
    avatar: string
    name: string
  }
  size: string
}>()

const user = computed(() => props.user)

const handleClickAvatar = (event: MouseEvent) => {
  event.preventDefault()
  navigateTo(`/kungalgamer/${user.value.uid}/info`)
}
</script>

<template>
  <div class="flex justify-center shrink-0" @click="handleClickAvatar($event)">
    <NuxtImg
      class="inline-block rounded-full"
      :height="size"
      :width="size"
      v-if="user.avatar"
      :src="user.avatar.replace(/\.webp$/, '-100.webp')"
      :alt="user.name"
    />
    <span
      :style="{ height: size, width: size }"
      class="bg-primary flex shrink-0 items-center justify-center rounded-full text-white"
      v-if="!user.avatar"
    >
      {{ user.name.slice(0, 1).toUpperCase() }}
    </span>
  </div>
</template>
