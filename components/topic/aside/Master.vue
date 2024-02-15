<script setup lang="ts">
const props = defineProps<{
  uid: number
}>()

const localePath = useLocalePath()
const route = useRoute()
const tid = computed(() => {
  return parseInt((route.params as { tid: string }).tid)
})
const isEmpty = ref(false)

const { data } = await useFetch(`/api/topic/${tid.value}/popular`, {
  method: 'GET',
  query: { uid: props.uid },
  watch: false,
  ...kungalgameResponseHandler,
})

isEmpty.value = !data.value?.length
</script>

<template>
  <div class="master">
    <div class="title">
      {{ $t('topic.aside.master') }}
    </div>

    <KunSkeletonTopicAside v-if="!data" />

    <div class="topic" v-for="(kun, index) in data" :key="index">
      <NuxtLink :to="localePath(`/topic/${kun.tid}`)">{{ kun.title }}</NuxtLink>
    </div>

    <span class="empty" v-if="isEmpty">
      {{ $t('topic.aside.masterEmpty') }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.master {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  .title {
    flex-shrink: 0;
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 20px;
    border: 2px solid var(--kungalgame-trans-pink-2);
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .topic {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 4px solid var(--kungalgame-trans-pink-2);
    margin-bottom: 5px;

    &:hover {
      border-left: 4px solid var(--kungalgame-pink-4);
      background-color: var(--kungalgame-trans-pink-2);
    }

    a {
      width: 100%;
      height: 100%;
      margin: 0 17px;
      color: var(--kungalgame-font-color-3);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
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
