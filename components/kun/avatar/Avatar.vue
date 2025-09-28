<script setup lang="ts">
import type { KunAvatarProps } from './type'

const props = withDefaults(defineProps<KunAvatarProps>(), {
  size: 'md',
  isNavigation: true,
  className: '',
  imageClassName: '',
  disableFloating: false,
  floatingPosition: 'top'
})

const handleClickAvatar = async (event: MouseEvent) => {
  event.preventDefault()
  if (props.isNavigation) {
    await navigateTo(`/user/${props.user.id}/info`)
  }
}

const sizeClasses = computed(() => {
  if (props.size === 'original') {
    return 'size-40'
  }
  if (props.size === 'original-sm') {
    return 'size-24'
  }

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

const userAvatarSrc = computed(() => {
  if (props.user.avatar) {
    return props.size === 'original' || props.size === 'original-sm'
      ? props.user.avatar
      : props.user.avatar.replace(/\.webp$/, '-100.webp')
  } else {
    return getRandomSticker(props.user.name).value
  }
})
</script>

<template>
  <KunFloatingUserCard
    :position="props.floatingPosition"
    :disabled="props.disableFloating"
    :user-id="user.id"
  >
    <template #trigger>
      <div
        :class="
          cn(
            'flex shrink-0 cursor-pointer justify-center',
            'rounded-full transition duration-150 ease-in-out hover:scale-110',
            sizeClasses,
            className
          )
        "
        @click="handleClickAvatar($event)"
      >
        <!-- <KunImage
          :class="cn('inline-block rounded-full', sizeClasses)"
          v-if="user.avatar"
          :src="userAvatarSrc"
          :alt="user.name"
        /> -->
        <KunImage
          :class="
            cn('inline-block rounded-full', sizeClasses, props.imageClassName)
          "
          :src="userAvatarSrc"
          :alt="user.name"
        />
        <!-- <span
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
        </span> -->
      </div>
    </template>
  </KunFloatingUserCard>
</template>
