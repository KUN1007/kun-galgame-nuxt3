<script setup lang="ts">
import dayjs from 'dayjs'

const props = defineProps<{
  user: {
    uid: number
    name: string
    avatar: string
  }
  time: number
}>()
const user = computed(() => props.user)

const { locale } = useI18n()
const localePath = useLocalePath()

const time = computed(() => {
  if (locale.value === 'zh-cn') {
    return dayjs(props.time).format('MM/D - HH:mm')
  }
  return dayjs(props.time).format('MM/D - HH:mm')
})

const handleClickAvatar = (event: MouseEvent) => {
  event.preventDefault()
  navigateTo(localePath(`/kungalgamer/${user.value.uid}/info`))
}
</script>

<template>
  <div class="user">
    <div class="avatar" @click="handleClickAvatar($event)">
      <NuxtImg
        height="50"
        width="50"
        v-if="user.avatar"
        :src="user.avatar.replace(/\.webp$/, '-100.webp')"
        :alt="user.name"
      />
      <span v-if="!user.avatar">
        {{ user.name.slice(0, 1).toUpperCase() }}
      </span>
    </div>

    <div class="info">
      <span>{{ user.name }}</span>
      <span class="time">{{ time }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.avatar {
  display: flex;
  justify-content: center;

  img {
    border-radius: 50%;
    display: inline-block;
  }

  span {
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--kungalgame-blue-5);
    font-weight: bold;
  }
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .time {
    font-size: small;
    color: var(--kungalgame-font-color-1);
  }
}
</style>
