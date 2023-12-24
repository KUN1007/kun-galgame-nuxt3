<script setup lang="ts">
import type { TopicDetail } from '~/types/api/topic'

const topicData = defineProps<{
  topicData: TopicDetail
}>()

const {
  tid,
  title,
  views,
  likes,
  dislikes,
  time,
  content,
  upvotes,
  tags,
  edited,
  user,
  replies,
  status,
  share,
  category,
  popularity,
  upvote_time,
} = topicData.topicData

const loliStatus = computed(() => {
  if (hourDiff(upvote_time, 10)) {
    return 'featured'
  }

  if (status === 0) {
    return 'normal'
  } else if (status === 1) {
    return 'banned'
  } else {
    return ''
  }
})
</script>

<template>
  <div class="container" :id="`kungalgame-reply-0`">
    <div class="content-container">
      <div class="header">
        <div class="title">
          {{ title }}
        </div>
      </div>

      <div class="content">
        <div class="content-top">
          <TopicTags v-if="tags" :tags="tags" />
          <TopicTime v-if="time" :time="time" />
        </div>

        <div class="content-center">
          <TopicKUNGalgamerInfo v-if="user" :user="user" />

          <TopicContent :content="content" />
        </div>

        <div class="content-bottom">
          <div class="status">
            <span>{{ `${$t('topic.content.status')}:` }}</span>
            <span :class="loliStatus">
              {{ $t(`topic.content.${loliStatus}`) }}
            </span>
          </div>

          <TopicRewrite v-if="edited" :time="edited" />
        </div>
      </div>

      <TopicFooter
        :info="{
          tid,
          rid: 0,
          views,
          likes,
          dislikes,
          upvotes,
        }"
        :content="{
          title,
          content,
          tags,
          category,
        }"
        :to-user="{
          uid: user.uid,
          name: user.name,
        }"
        :to-floor="0"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.content-container {
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border: 1px solid var(--kungalgame-blue-1);
  border-radius: 5px;
  box-shadow: var(--shadow);
  background-color: var(--kungalgame-trans-white-5);
  transition: width 0.5s;
}

.header {
  width: 100%;
  min-height: 70px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--kungalgame-font-color-3);
  font-size: 17px;
  border-bottom: 1px solid var(--kungalgame-blue-1);
}

.title {
  font-size: 17px;
  font-weight: bold;
  letter-spacing: 1px;
}

.content {
  display: flex;
  flex-direction: column;
}

.content-top {
  width: 100%;
  max-height: 100px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--kungalgame-blue-1);
  flex-grow: 1;
}

.content-center {
  width: 100%;
  display: flex;
  border-bottom: 1px solid var(--kungalgame-blue-1);
}

.content-bottom {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--kungalgame-blue-1);
}

.status {
  display: flex;
  font-size: 12px;
  margin-left: 10px;
  color: var(--kungalgame-font-color-3);
  span {
    &:nth-child(1) {
      margin-right: 5px;
    }
    &:nth-child(2) {
      width: 50px;
      padding: 1px;
      color: var(--kungalgame-white);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.normal {
  background-color: var(--kungalgame-green-4);
}

.banned {
  background-color: var(--kungalgame-gray-4);
}

.featured {
  background-color: var(--kungalgame-pink-3);
}

.active .content-container {
  border: 1px solid var(--kungalgame-red-3);
  background-color: var(--kungalgame-trans-red-1);
}

@media (max-width: 1000px) {
  .content-top {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 700px) {
  .content-center {
    flex-direction: column;
  }

  .status {
    span {
      &:nth-child(1) {
        display: none;
      }
    }
  }
}
</style>
