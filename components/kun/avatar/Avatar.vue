<script setup lang="ts">
import type { KunAvatarProps } from './type'

const props = withDefaults(defineProps<KunAvatarProps>(), {
  size: 'md',
  isNavigation: true
})

const handleClickAvatar = (event: MouseEvent) => {
  event.preventDefault()
  if (props.isNavigation) {
    navigateTo(`/user/${props.user.uid}/info`)
  }
}

const sizeClasses = computed(() => {
  if (props.size === 'xs') {
    return 'size-4'
  } else if (props.size === 'sm') {
    return 'size-6'
  } else if (props.size === 'md') {
    return 'size-8'
  } else if (props.size === 'lg') {
    return 'size-10'
  } else if (props.size === 'xl') {
    return 'size-12'
  } else {
    return 'size-8'
  }
})
</script>

<template>
  <div
    class="flex shrink-0 cursor-pointer justify-center"
    @click="handleClickAvatar($event)"
  >
    <NuxtImg
      :class="cn('inline-block rounded-full', sizeClasses)"
      v-if="user.avatar"
      :src="user.avatar.replace(/\.webp$/, '-100.webp')"
      :alt="user.name"
    />
    <span
      :style="{ height: size, width: size }"
      :class="
        cn(
          'bg-default flex shrink-0 items-center justify-center rounded-full text-white',
          sizeClasses
        )
      "
      v-if="!user.avatar"
    >
      {{ user.name.slice(0, 1).toUpperCase() }}
    </span>
  </div>
</template>
