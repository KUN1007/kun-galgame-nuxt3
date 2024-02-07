<script setup lang="ts">
const props = defineProps<{
  user: {
    uid: number
    avatar: string
    name: string
  }
  time: number
}>()

const { locale } = useI18n()
const user = computed(() => props.user)
const time = computed(() => props.time)
</script>

<template>
  <div class="kungalgamer">
    <div class="avatar">
      <NuxtLink :to="`/kungalgamer/${user.uid}/info`">
        <img
          v-if="props.user.avatar"
          :src="user.avatar.replace(/\.webp$/, '-100.webp')"
          :alt="user.name"
        />
        <span v-if="!props.user.avatar">{{ props.user.name.slice(0, 1) }}</span>
      </NuxtLink>
    </div>

    <div class="info">
      <span class="name">{{ props.user.name }}</span>

      <span class="time">
        {{ formatTimeDifference(time, locale) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.kungalgamer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  display: flex;
  justify-content: center;

  a {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: inline-block;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--kungalgame-blue-5);
    font-weight: bold;
  }
}

.info {
  height: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .time {
    font-size: 13px;
    color: var(--kungalgame-font-color-1);
  }
}
</style>
