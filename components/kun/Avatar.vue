<script setup lang="ts">
const props = defineProps<{
  user: {
    uid: number
    avatar: string
    name: string
  }
  size: string
}>()

const localePath = useLocalePath()
const user = computed(() => props.user)

const handleClickAvatar = (event: MouseEvent) => {
  event.preventDefault()
  navigateTo(localePath(`/kungalgamer/${user.value.uid}/info`))
}
</script>

<template>
  <div class="kun-avatar" @click="handleClickAvatar($event)">
    <NuxtImg
      :height="size"
      :width="size"
      v-if="user.avatar"
      :src="user.avatar.replace(/\.webp$/, '-100.webp')"
      :alt="user.name"
    />
    <span v-if="!user.avatar">
      {{ user.name.slice(0, 1).toUpperCase() }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.kun-avatar {
  display: flex;
  justify-content: center;

  img {
    border-radius: 50%;
    display: inline-block;
  }

  span {
    height: v-bind(size);
    width: v-bind(size);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--kungalgame-blue-5);
    font-weight: bold;
  }
}
</style>
