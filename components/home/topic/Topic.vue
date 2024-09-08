<script setup lang="ts">
import type { HomeTopic } from '~/types/api/home'

const { locale } = useI18n()

const topic = defineProps<HomeTopic>()
</script>

<template>
  <NuxtLinkLocale class="topic" :to="`/topic/${topic.tid}`" v-kun-gradient>
    <div class="title">
      <span>{{ topic.title }}</span>
      <span>{{ formatTimeDifferenceHint(topic.time, locale) }}</span>
    </div>

    <div class="info">
      <div class="section">
        <span class="username">{{ topic.user.name }}</span>
        <HomeTopicSection :section="topic.section" />
        <TopicTags class="tags" :tags="topic.tags" :is-show-icon="false" />
      </div>

      <div class="status">
        <span>
          <Icon class="icon" name="lucide:mouse-pointer-click" />
          <span>{{ topic.views }}</span>
        </span>
        <span>
          <Icon class="icon" name="lucide:thumbs-up" />
          <span>
            {{ topic.likes }}
          </span>
        </span>
        <span>
          <Icon class="icon" name="lucide:reply" />
          <span>{{ topic.replies + topic.comments }}</span>
        </span>
      </div>
    </div>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.topic {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  padding: 10px;
  padding-bottom: 0;
  border-radius: 10px;
}

.title {
  width: 100%;
  font-size: 18px;
  margin-bottom: 7px;

  span {
    &:first-child {
      border-bottom: 2px solid transparent;
    }

    &:last-child {
      color: var(--kungalgame-font-color-0);
      font-size: small;
      font-weight: initial;
      margin-left: 17px;
      white-space: nowrap;
    }
  }
}

.info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
  margin-bottom: 10px;
  font-size: small;
}

.section {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .username {
    color: var(--kungalgame-font-color-0);
    font-size: 15px;

    &::after {
      content: '|';
      color: var(--kungalgame-gray-4);
      margin-left: 10px;
    }
  }
}

.status {
  display: flex;

  .icon {
    margin-right: 3px;
  }

  span {
    display: flex;
    align-items: center;
    margin-right: 7px;
  }
}

@media (max-width: 700px) {
  .tags {
    display: none;
  }
}
</style>
