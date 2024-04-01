<script setup lang="ts">
import type { HomeTopic } from '~/types/api/home'

const props = defineProps<{
  topic: HomeTopic
}>()

const { locale } = useI18n()

const {
  tid,
  title,
  views,
  likes,
  replies,
  comments,
  time,
  content,
  upvotes,
  tags,
  section,
  popularity,
  user
} = props.topic

const getRepliesCount = computed(() => {
  return replies + comments
})
</script>

<template>
  <div class="topic">
    <div class="title">
      <span>{{ title }}</span>
      <span>{{ formatTimeDifferenceHint(time, locale) }}</span>
    </div>

    <div class="info">
      <HomeContentUserPart :user="user">
        <template #section>
          <div class="section">
            <TopicSection :section="section" />
            <TopicTags class="tags" :tags="tags" :is-show-icon="false" />
          </div>
        </template>

        <template #statistic>
          <div class="status">
            <span>
              <Icon class="icon" name="lucide:mouse-pointer-click" />
              <span>{{ views }}</span>
            </span>
            <span>
              <Icon class="icon" name="lucide:thumbs-up" />
              <span>
                {{ likes }}
              </span>
            </span>
            <span>
              <Icon class="icon" name="lucide:reply" />
              <span>{{ getRepliesCount }}</span>
            </span>
          </div>
        </template>
      </HomeContentUserPart>
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
  color: var(--kungalgame-blue-5);
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 7px;

  span:last-child {
    color: var(--kungalgame-font-color-0);
    font-size: small;
    font-weight: initial;
    margin-left: 17px;
    white-space: nowrap;
  }
}

.info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.section {
  display: flex;
  flex-wrap: wrap;
  font-size: small;
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

  .tags {
    display: none;
  }
}
</style>
