<script setup lang="ts">
import type { HomeTopic } from '~/types/api/home'

const props = defineProps<{
  topic: HomeTopic
}>()

const { locale } = useI18n()

const getRepliesCount = computed(() => {
  return props.topic.replies + props.topic.comments
})
</script>

<template>
  <NuxtLinkLocale class="container" :to="`/topic/${topic.tid}`">
    <div class="topic">
      <div class="title">
        <span>{{ topic.title }}</span>
        <span>{{ formatTimeDifferenceHint(topic.time, locale) }}</span>
      </div>

      <div class="info">
        <HomeContentUser :user="topic.user">
          <template #section>
            <div class="section">
              <TopicSection :section="topic.section" />
              <TopicTags
                class="tags"
                :tags="topic.tags"
                :is-show-icon="false"
              />
            </div>
          </template>

          <template #statistic>
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
                <span>{{ getRepliesCount }}</span>
              </span>
            </div>
          </template>
        </HomeContentUser>
      </div>

      <div class="introduction">
        <p>
          {{ markdownToText(topic.content) }}
        </p>
      </div>
    </div>
  </NuxtLinkLocale>

  <KunDivider margin="7px" />
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.2s;

  &:hover {
    box-shadow: var(--shadow);
    transform: scale(1.01);
    background-color: var(--kungalgame-trans-blue-0);
  }
}

.topic {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
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
