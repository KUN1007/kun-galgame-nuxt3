<script setup lang="ts">
import type { TypeToGet, HomeNavTopic } from '~/types/api/home'

const { locale } = useI18n()

const { typeToGet } = storeToRefs(usePersistKUNGalgameHomeStore())
const topics = ref<HomeNavTopic[]>()

interface IconItem {
  name: TypeToGet
  icon: string
}

const iconItem: IconItem[] = [
  {
    name: 'time',
    icon: 'eos-icons:hourglass',
  },
  {
    name: 'popularity',
    icon: 'bi:fire',
  },
]

const getTopics = async (type: TypeToGet) => {
  const { data } = await useFetch('/api/home/nav', {
    method: 'GET',
    query: { type },
    watch: false,
  })
  return data.value ?? []
}

topics.value = await getTopics(typeToGet.value)

const handleClickIcon = async (icon: TypeToGet) => {
  topics.value = await getTopics(icon)
  typeToGet.value = icon
}
</script>

<template>
  <div class="topic-wrap">
    <div class="title">
      <span
        v-for="(icon, index) in iconItem"
        :key="index"
        :class="typeToGet === icon.name ? 'active' : ''"
        @click="handleClickIcon(icon.name)"
        v-tooltip="{
          message: $t(`mainPage.asideActive.${icon.name}`),
          position: 'bottom',
        }"
      >
        <Icon :name="icon.icon" />
      </span>
    </div>

    <div class="content" v-if="topics" v-for="kun in topics">
      <NuxtLinkLocale :to="`/topic/${kun.tid}`">
        <div class="topic">
          <div class="name">{{ kun.title }}</div>
          <div class="hot" v-if="typeToGet === 'popularity'">
            <Icon name="bi:fire" />
            <span>{{ Math.ceil(kun.popularity) }}</span>
          </div>

          <div class="new" v-if="typeToGet === 'time'">
            <Icon name="eos-icons:hourglass" />
            <span>{{ formatTimeDifference(kun.time, locale) }}</span>
          </div>
        </div>
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topic-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--kungalgame-trans-white-5);
  box-shadow: var(--kungalgame-shadow-0);
  color: var(--kungalgame-font-color-3);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  padding: 10px;
}

.content {
  display: flex;
  flex-direction: column;
  height: 100%;

  a {
    height: 100%;
    width: 100%;
    border-radius: 10px;

    &:hover {
      background-color: var(--kungalgame-trans-blue-2);
    }
  }
}

.title {
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  padding-bottom: 10px;

  span {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }
}

.active {
  color: var(--kungalgame-blue-5);
  border-bottom: 2px solid var(--kungalgame-blue-5);
}

.topic {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  color: var(--kungalgame-font-color-3);
  align-items: center;
  cursor: pointer;
}

.name {
  display: flex;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
  font-size: 13px;
  padding: 0 10px;
}

.hot {
  margin-right: 10px;
  display: flex;
  white-space: nowrap;
  align-items: center;
  color: var(--kungalgame-red-4);

  span {
    font-size: small;
    margin-left: 5px;
    color: var(--kungalgame-font-color-3);
  }
}

.new {
  margin-right: 10px;
  display: flex;
  white-space: nowrap;
  align-items: center;
  color: var(--kungalgame-purple-4);

  span {
    font-size: x-small;
    margin-left: 5px;
    color: var(--kungalgame-font-color-3);
  }
}
</style>
