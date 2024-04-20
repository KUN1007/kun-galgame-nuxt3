<script setup lang="ts">
import type { HomePinnedTopic } from '~/types/api/home'

const { locale } = useI18n()

const props = defineProps<{
  topics: HomePinnedTopic[]
}>()
</script>

<template>
  <div class="pinned">
    <NuxtLinkLocale
      v-for="(topic, index) in props.topics"
      :key="index"
      :to="`/topic/${topic.tid}`"
    >
      <Icon name="lucide:pin" />
      <span>{{ topic.title }}</span>
      <span>{{ formatTimeDifferenceHint(topic.time, locale) }}</span>
    </NuxtLinkLocale>
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
    }
  }
}
</style>
