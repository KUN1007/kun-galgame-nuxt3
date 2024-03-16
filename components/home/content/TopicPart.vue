<script setup lang="ts">
import type { HomeTopic } from '~/types/api/home'

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
  popularity
} = props.topic

const getRepliesCount = computed(() => {
  return repliesCount + comments
})
</script>

<template>
  <div class="topic">
    <div class="title">
      <span>{{ title }}</span>
    </div>

    <div class="info">
      <HomeContentUserPart :user="props.topic.user" :time="time" />

      <div>
        <TopicTags :tags="tags.slice(0, 2)" :is-show-icon="false" />

        <div class="status">
          <span>
            <Icon class="icon" name="lucide:mouse-pointer-click" />
            <span>{{ views }}</span>
          </span>
          <span>
            <Icon class="icon" name="lucide:thumbs-up" />
            <span>
              {{ likesCount }}
            </span>
          </span>
          <span>
            <Icon class="icon" name="lucide:reply" />
            <span>{{ getRepliesCount }}</span>
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
.topic {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
}

.title {
  width: 100%;
  display: flex;
  color: var(--kungalgame-blue-5);
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 7px;
}

.info {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.status {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .icon {
    margin-right: 3px;
  }

  span {
    display: flex;
    align-items: center;
    margin-right: 7px;
  }
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
