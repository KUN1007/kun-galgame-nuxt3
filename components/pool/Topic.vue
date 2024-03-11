<script setup lang="ts">
import dayjs from 'dayjs'
import type { PoolTopic } from '~/types/api/pool'

const props = defineProps<{
  topic: PoolTopic
}>()
const user = computed(() => props.topic.user)

const { locale } = useI18n()
const localePath = useLocalePath()

const time = computed(() => {
  if (locale.value === 'zh-cn') {
    return dayjs(props.topic.time).format('MM/D - HH:mm')
  }
  return dayjs(props.topic.time).format('MM/D - HH:mm')
})

const actionsCount = computed(() => props.topic.replies + props.topic.comments)

const handleClickAvatar = (event: MouseEvent) => {
  event.preventDefault()
  navigateTo(localePath(`/kungalgamer/${user.value.uid}/info`))
}
</script>

<template>
  <NuxtLinkLocale class="topic" :to="`/topic/${props.topic.tid}`">
    <div class="title">
      {{ topic.title }}
    </div>

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

    <div class="introduction">
      <span
        class="category"
        v-for="(category, index) in props.topic.category"
        :key="index"
        :class="category.toLowerCase()"
      >
        {{ category }}
      </span>

      <span class="tags" v-for="(tag, index) in props.topic.tags" :key="index">
        {{ tag }}
      </span>
    </div>

    <div class="status">
      <span>
        <Icon name="ic:outline-remove-red-eye" />
        {{ props.topic.views }}
      </span>

      <span>
        <Icon name="ic:outline-remove-red-eye" />
        {{ props.topic.views }}
      </span>

      <span>
        <Icon name="ri:reply-line" />
        {{ actionsCount }}
      </span>
    </div>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: space-around;
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
}

.introduction {
  display: flex;
  flex-wrap: wrap;
  font-size: small;

  .category {
    margin: 3px;
    display: flex;
    align-items: center;
    color: var(--kungalgame-white);
    padding: 3px 10px;
    border-radius: 7px;
    margin-right: 5px;
  }

  .tags {
    margin: 3px;
    padding: 3px 17px;
    background-color: var(--kungalgame-trans-blue-0);
    border: 1px solid var(--kungalgame-blue-5);
    border-radius: 14px;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}

.galgame {
  background-color: var(--kungalgame-blue-5);
}

.technique {
  background-color: var(--kungalgame-green-4);
}

.others {
  background-color: var(--kungalgame-yellow-3);
}

.topic {
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  box-shadow: var(--shadow);
  cursor: pointer;
  max-width: 300px;
  padding: 10px;
  border: 2px solid var(--kungalgame-trans-blue-2);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  background-color: var(--kungalgame-trans-white-5);

  &:hover {
    border: 2px solid var(--kungalgame-blue-5);
  }
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 auto;
  margin-bottom: 10px;
  font-weight: bold;
  color: var(--kungalgame-blue-5);
  flex-shrink: 0;
}

.content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-family: inherit;
  font-size: 14px;
  padding: 0 10px;
  margin-bottom: 10px;
}

.status {
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  overflow: hidden;
  flex-wrap: wrap;
  margin: 10px 0;

  span {
    display: flex;
    align-items: center;
  }
}

.time {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;
  letter-spacing: 1px;
  overflow: hidden;

  .hourglass {
    flex-shrink: 0;
    color: var(--kungalgame-purple-4);
  }
}
</style>
