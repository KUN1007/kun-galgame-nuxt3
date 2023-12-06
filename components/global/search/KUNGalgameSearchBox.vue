<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import SearchBox from './SearchBox.vue'
import SearchHistory from './SearchHistory.vue'
import SearchResult from './SearchResult.vue'

import { useTempHomeStore } from '@/store/temp/home'
import { storeToRefs } from 'pinia'

import { HomeSearchTopic } from '@/api'

const { search, isShowSearch } = storeToRefs(useTempHomeStore())

const topics = ref<HomeSearchTopic[]>([])
const container = ref<HTMLElement>()

const searchTopics = async () => {
  return (await useTempHomeStore().searchTopic()).data
}

watch(
  () => search.value.keywords,
  async () => {
    if (search.value.keywords) {
      topics.value = await searchTopics()
    } else {
      topics.value = []
      useTempHomeStore().resetSearchStatus()
    }
  }
)

watch(
  () => container.value,
  () => {
    const element = container.value
    if (element) {
      element.addEventListener('scroll', scrollHandler)
    }
  }
)

const scrollHandler = async () => {
  if (isScrollAtBottom() && search.value.isLoading && search.value.keywords) {
    search.value.page++

    const lazyLoadTopics = await searchTopics()

    if (!lazyLoadTopics.length) {
      search.value.isLoading = false
    }

    topics.value = [...topics.value, ...lazyLoadTopics]
  }
}

const isScrollAtBottom = () => {
  if (container.value) {
    const scrollHeight = container.value.scrollHeight
    const scrollTop = container.value.scrollTop
    const clientHeight = container.value.clientHeight

    const errorMargin = 1.007
    return Math.abs(scrollHeight - scrollTop - clientHeight) < errorMargin
  }
}

onBeforeUnmount(() => {
  const element = container.value
  if (element) {
    element.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<template>
  <Teleport to="body" :disabled="isShowSearch">
    <Transition name="search">
      <div class="mask" v-if="isShowSearch" @click="isShowSearch = false">
        <div ref="container" class="container" @click.stop>
          <SearchBox />

          <SearchHistory v-if="!search.keywords" />

          <SearchResult :topics="topics" v-if="topics.length" />

          <span class="empty" v-if="!topics.length && search.keywords">
            {{ $tm('mainPage.header.emptyResult') }}
          </span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--kungalgame-mask-color-0);
  display: flex;
  transition: opacity 0.3s ease;
  justify-content: center;
  align-items: center;
  color: var(--kungalgame-font-color-3);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  position: relative;
  color: var(--kungalgame-font-color-3);
  background-color: var(--kungalgame-trans-white-2);
  box-shadow: var(--kungalgame-shadow-0);
  border-radius: 17px;
  padding: 10px;
  width: 40vw;
  max-width: 500px;
  min-height: 200px;
  max-height: 600px;
  overflow-y: scroll;
}

.empty {
  display: flex;
  justify-content: center;
  color: var(--kungalgame-blue-2);
  font-style: oblique;
  margin-top: 20px;
}

.search-enter-from {
  opacity: 0;
}

.search-leave-to {
  opacity: 0;
}

.search-enter-from .container,
.search-leave-to .container {
  transition: all 0.3s ease;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media (max-width: 1000px) {
  .container {
    width: 60vw;
  }
}

@media (max-width: 700px) {
  .container {
    width: 90vw;
  }
}
</style>
