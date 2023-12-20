<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

import { formatTimeDifference } from '@/utils/formatTime'
import { markdownToText } from '@/utils/markdownToText'

import { useKUNGalgameSettingsStore } from '@/store/modules/settings'
import { storeToRefs } from 'pinia'
const settingsStore = storeToRefs(useKUNGalgameSettingsStore())

import { HomeTopic } from '@/api'

const props = defineProps<{
  topic: HomeTopic
}>()

const {
  tid,
  title,
  views,
  likesCount,
  repliesCount,
  comments,
  time,
  content,
  upvotesCount,
  tags,
  category,
  popularity,
} = props.topic

const getRepliesCount = computed(() => {
  return repliesCount + comments
})
</script>

<template>
  <div class="topic-info">
    <div class="summary">
      <div class="title">
        <span>{{ title }}</span>
      </div>

      <div class="status">
        <ul>
          <li>
            <Icon icon="ic:outline-remove-red-eye" /><span>{{ views }}</span>
          </li>
          <li>
            <Icon icon="line-md:thumbs-up-twotone" /><span>
              {{ likesCount }}
            </span>
          </li>
          <li>
            <Icon icon="ri:reply-line" /><span>{{ getRepliesCount }}</span>
          </li>
        </ul>

        <div class="time">
          <span>
            {{
              formatTimeDifference(
                time,
                settingsStore.showKUNGalgameLanguage.value
              )
            }}
          </span>
        </div>
      </div>
    </div>

    <div class="introduction">
      <p>
        {{ markdownToText(content) }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topic-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
}

.summary {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.title {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--kungalgame-blue-5);
}

.status {
  display: flex;
  align-items: center;
  white-space: nowrap;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    display: flex;
    color: var(--kungalgame-font-color-2);
    font-size: smaller;

    li {
      margin-right: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        margin-left: 3px;
      }
    }
  }
}

.time {
  width: 77px;
  font-size: x-small;
  color: var(--kungalgame-font-color-0);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
}

.introduction {
  width: 100%;
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
  cursor: pointer;

  p {
    width: 100%;
    font-size: 14px;
    color: var(--kungalgame-font-color-2);
  }
}

@media (max-width: 700px) {
  .time {
    display: none;
  }
}
</style>
