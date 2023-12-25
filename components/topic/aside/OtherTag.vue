<script setup lang="ts">
import type { TopicAside } from '~/types/api/topic'

const props = defineProps<{
  tags: string[]
}>()

const tags = toRaw(props.tags)
const route = useRoute()
const tid = computed(() => {
  return parseInt((route.params as { tid: string }).tid)
})
const isEmpty = ref(false)

const { data } = await useFetch(`/api/topic/${tid.value}/related`, {
  method: 'GET',
  query: { tags },
  watch: false,
  onResponse({ request, response, options }) {
    if (response.status === 233) {
      kungalgameErrorHandler(response.statusText)
      return
    }
  },
})

isEmpty.value = !data.value?.length
</script>

<template>
  <div class="other">
    <div class="title">
      {{ $t('topic.aside.tags') }}
    </div>

    <KunSkeletonTopicAside v-if="!data" />

    <div class="topic" v-for="(kun, index) in data" :key="index">
      <RouterLink :to="`/topic/${kun.tid}`">{{ kun.title }}</RouterLink>
    </div>

    <span class="empty" v-if="isEmpty">
      {{ $t('topic.aside.tagsEmpty') }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.other {
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: var(--shadow);
  border: 1px solid var(--kungalgame-blue-1);
  background-color: var(--kungalgame-trans-blue-0);
  height: 340px;
  display: flex;
  flex-direction: column;

  .title {
    border-left: 0;
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    color: var(--kungalgame-font-color-2);
    background-color: var(--kungalgame-trans-blue-1);
    border-bottom: 1px solid var(--kungalgame-blue-1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .topic {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 4px solid transparent;

    &:hover {
      border-left: 4px solid var(--kungalgame-pink-3);
      background-color: var(--kungalgame-trans-blue-1);
      transition: 0.2s;
    }

    a {
      width: 100%;
      height: 100%;
      margin: 0 17px;
      color: var(--kungalgame-font-color-3);
      overflow: hidden; /* Hide the overflow */
      text-overflow: ellipsis; /* Display ellipsis (three dots) for overflowed text */
      display: -webkit-box; /* Convert the text box into a flexible box */
      -webkit-box-orient: vertical; /* Set it to arrange vertically */
      -webkit-line-clamp: 2; /* Display two lines of text */
      font-size: small;
      display: flex;
      align-items: center;
    }
  }
}

.empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 17px;
  font-size: 14px;
  font-style: oblique;
}
</style>
