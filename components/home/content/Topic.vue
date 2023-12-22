<script setup lang="ts">
import type { HomeHotTopic, HomeNewTopic } from '~/types/api/home'

const { locale, setLocale } = useI18n()

const navHotTopic = ref<HomeHotTopic[]>()
const navNewTopic = ref<HomeNewTopic[]>()

// onMounted(async () => {
//   const responseHotData = await getHomeNavHotTopicApi()
//   navHotTopic.value = responseHotData.data

//   const responseNewData = await getHomeNavNewTopicApi()
//   navNewTopic.value = responseNewData.data
// })
</script>

<template>
  <div class="topic-wrap">
    <div class="title-hot">
      {{ $t(`mainPage.asideActive.hot`) }}
    </div>
    <span
      class="topic-content hot-bg"
      v-if="navHotTopic"
      v-for="kun in navHotTopic"
    >
      <RouterLink :to="{ path: `/topic/${kun.tid}` }">
        <div class="topic">
          <div class="title">{{ kun.title }}</div>
          <div class="hot">
            <Icon name="bi:fire" />
            <span>{{ Math.ceil(kun.popularity) }}</span>
          </div>
        </div>
      </RouterLink>
    </span>

    <KunSkeletonHomeAside v-if="!navHotTopic" />

    <div class="title-new">
      {{ $t(`mainPage.asideActive.new`) }}
    </div>
    <span
      class="topic-content new-bg"
      v-if="navNewTopic"
      v-for="kun in navNewTopic"
    >
      <RouterLink :to="{ path: `/topic/${kun.tid}` }">
        <div class="topic">
          <div class="title">{{ kun.title }}</div>
          <div class="new">
            <Icon name="eos-icons:hourglass" />
            <span>{{ formatTimeDifference(kun.time, locale) }}</span>
          </div>
        </div>
      </RouterLink>
    </span>

    <KunSkeletonHomeAside v-if="!navNewTopic" />
  </div>
</template>

<style lang="scss" scoped>
.topic-wrap {
  display: flex;
  flex-direction: column;
}

.title-new,
.title-hot {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--kungalgame-font-color-3);
  overflow: hidden;
  white-space: nowrap;
}

.topic-content {
  height: 43px;
  display: flex;
  flex-direction: column;

  a {
    display: block;
    height: 100%;
    width: 100%;
  }
}

.title-hot {
  border: 3px dashed var(--kungalgame-trans-blue-1);
  border-radius: 5px 5px 0 0;
  border-bottom: none;
}

.title-new {
  border: 3px dashed var(--kungalgame-trans-pink-1);
  border-radius: 5px 5px 0 0;
  border-bottom: none;
  margin-top: 5px;
}

.hot-bg {
  background-color: var(--kungalgame-trans-blue-1);
}

.new-bg {
  background-color: var(--kungalgame-trans-pink-1);
}

.topic {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  color: var(--kungalgame-font-color-3);
  align-items: center;
  cursor: pointer;

  &:hover {
    box-shadow: var(--kungalgame-shadow-1);
  }

  &:active {
    box-shadow: var(--kungalgame-shadow-2);
  }
}

.title {
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: smaller;
}

.new {
  margin-right: 10px;
  display: flex;
  white-space: nowrap;
  align-items: center;
  color: var(--kungalgame-purple-4);

  span {
    font-size: xx-small;
    margin-left: 5px;
    color: var(--kungalgame-font-color-3);
  }
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
</style>
