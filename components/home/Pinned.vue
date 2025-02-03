<script setup lang="ts">
const { locale } = useI18n()

const { data } = await useLazyFetch(`/api/home/pin`, {
  method: 'GET'
})
</script>

<template>
  <div class="pinned">
    <NuxtLink
      v-for="(topic, index) in data"
      :key="index"
      :to="`/topic/${topic.tid}`"
    >
      <Icon class="icon" name="lucide:pin" />
      <span>{{ topic.title }}</span>
      <span>{{ formatTimeDifference(topic.time, locale) }}</span>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.pinned {
  display: flex;
  flex-wrap: wrap;

  a {
    color: var(--kungalgame-blue-5);
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 7px;
    margin-right: 17px;

    span:last-child {
      color: var(--kungalgame-font-color-0);
      font-size: small;
      font-weight: initial;
      margin-left: 17px;
    }
  }
}

.icon {
  color: var(--kungalgame-red-5);
  font-size: 17px;
  margin-right: 10px;
}

@media (max-width: 700px) {
  .pinned {
    padding-right: 17px;

    a {
      margin-right: 0;
      font-size: 15px;
    }
  }
}
</style>
