<script setup lang="ts">
import dayjs from 'dayjs'
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
  favorites,
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
  section,
  popularity,
  upvote_time
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
        <div class="top">
          <div class="section">
            <TopicSection :section="section" />
            <TopicTags v-if="tags" :tags="tags" :is-show-icon="true" />
          </div>

          <span class="time">
            {{ dayjs(time).format('YYYY-MM-DD HH:mm:ss') }}
          </span>
        </div>

        <div class="center">
          <TopicKUNGalgamerInfo v-if="user" :user="user">
            <span class="time-mobile">
              {{ dayjs(time).format('YYYY-MM-DD HH:mm:ss') }}
            </span>
          </TopicKUNGalgamerInfo>

          <TopicContent :content="content" />
        </div>

        <div class="bottom">
          <div class="status">
            <span>{{ `${$t('topic.content.status')}:` }}</span>
            <span :class="loliStatus">
              {{ $t(`topic.content.${loliStatus}`) }}
            </span>
          </div>

          <span class="line"></span>

          <span
            v-if="views > 0"
            class="views"
            v-tooltip="{
              message: { en: 'Views', zh: '浏览数' },
              position: 'bottom'
            }"
          >
            <span class="icon"><Icon name="lucide:mouse-pointer-click" /></span>
            {{ views }}
          </span>

          <s
            class="rewrite"
            v-if="edited"
            v-tooltip="{
              message: { en: 'Rewrite Time', zh: 'Rewrite 时间' },
              position: 'bottom'
            }"
          >
            × {{ dayjs(edited).format('YYYY-MM-DD HH:mm:ss') }}
          </s>
        </div>
      </div>

      <TopicFooter
        :info="{
          tid,
          rid: 0,
          likes,
          dislikes,
          upvotes
        }"
        :content="{
          title,
          content,
          tags,
          category,
          section
        }"
        :to-user="{
          uid: user.uid,
          name: user.name
        }"
        :to-floor="0"
      >
        <template #favorite>
          <TopicFooterFavorite
            :tid="tid"
            :favorites="favorites"
            :to-uid="user.uid"
            v-tooltip="{
              message: { en: 'Favorite', zh: '收藏' },
              position: 'bottom'
            }"
          />
        </template>
      </TopicFooter>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  color: var(--kungalgame-font-color-3);
}

.content-container {
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
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

.top {
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: space-between;
  flex-grow: 1;
  padding: 0 17px;

  .section {
    display: flex;
    flex-wrap: wrap;
  }

  .time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: var(--kungalgame-font-color-1);
    margin-left: 17px;
  }
}

.time-mobile {
  display: none;
  font-size: 13px;
  color: var(--kungalgame-font-color-1);
  padding: 0 17px;

  .rewrite-mobile {
    color: var(--kungalgame-blue-5);
  }
}

.center {
  width: 100%;
  display: flex;
}

.bottom {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  .status {
    display: flex;
    flex-shrink: 0;
    font-size: 12px;
    margin: 0 10px;
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

  .line {
    width: 100%;
    height: 1px;
    background-color: var(--kungalgame-blue-5);
  }

  .views {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin: 0 10px;

    span {
      display: flex;
      margin-right: 3px;
    }

    &:nth-child(1) span {
      color: var(--kungalgame-red-4);
    }
  }

  .rewrite {
    white-space: nowrap;
    font-size: small;
    color: var(--kungalgame-blue-5);
    margin-right: 10px;
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
  box-shadow: 0 0 0 2px var(--kungalgame-red-4) inset;
  border-radius: 10px;
  background-color: var(--kungalgame-trans-blue-0);
}

@media (max-width: 1000px) {
  .top {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 700px) {
  .top {
    .time {
      display: none;
    }
  }

  .time-mobile {
    display: block;
  }

  .center {
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
