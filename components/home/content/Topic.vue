<script setup lang="ts">
const { locale } = useI18n()

const { data: hotTopic } = await useFetch('/api/home/nav/hot', {
  method: 'GET',
  watch: false,
})

const { data: newTopic } = await useFetch('/api/home/nav/new', {
  method: 'GET',
  watch: false,
})
</script>

<template>
  <div class="topic-wrap">
    <div class="title">
      <span class="title-hot">
        <Icon name="bi:fire" />
      </span>
      <span class="title-new">
        <Icon name="eos-icons:hourglass" />
      </span>
    </div>

    <div class="content" v-if="hotTopic" v-for="kun in hotTopic">
      <NuxtLink :to="`/topic/${kun.tid}`">
        <div class="topic">
          <div class="name">{{ kun.title }}</div>
          <div class="hot">
            <Icon name="bi:fire" />
            <span>{{ Math.ceil(kun.popularity) }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!--     <div class="title-new">
      {{ $t(`mainPage.asideActive.new`) }}
    </div>
    <span class="topic-content new-bg" v-if="newTopic" v-for="kun in newTopic">
      <NuxtLink :to="{ path: `/topic/${kun.tid}` }">
        <div class="topic">
          <div class="title">{{ kun.title }}</div>
          <div class="new">
            <Icon name="eos-icons:hourglass" />
            <span>{{ formatTimeDifference(kun.time, locale) }}</span>
          </div>
        </div>
      </NuxtLink>
    </span> -->
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
</style>
