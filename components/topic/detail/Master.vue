<script setup lang="ts">
import { KUN_TOPIC_DETAIL_STATUS } from '~/constants/topic'
import type { TopicDetail } from '~/types/api/topic'

const props = defineProps<{
  topic: TopicDetail
}>()

const loliStatus = computed(() => {
  if (hourDiff(props.topic.upvoteTime, 10)) {
    return 'featured'
  }

  const statusMap: Record<number, string> = {
    0: 'normal',
    1: 'banned',
    2: 'pinned',
    3: 'essential'
  }
  return statusMap[props.topic.status]
})
</script>

<template>
  <div class="master" id="k0">
    <div class="header">
      <h1 class="title">
        {{ topic.title }}
      </h1>
    </div>

    <div class="content">
      <div class="top">
        <div class="section">
          <TopicSection :section="topic.section" />
          <TopicTags
            v-if="topic.tags"
            :tags="topic.tags"
            :is-show-icon="true"
          />
        </div>

        <span class="time">
          {{
            formatDate(topic.time, {
              isShowYear: true,
              isPrecise: true
            })
          }}
        </span>
      </div>

      <div class="center">
        <TopicKUNGalgamerInfo v-if="topic.user" :user="topic.user">
          <span class="time-mobile">
            {{
              formatDate(topic.time, {
                isShowYear: true,
                isPrecise: true
              })
            }}
          </span>
        </TopicKUNGalgamerInfo>

        <KunContent :content="topic.content" />
      </div>

      <div class="bottom">
        <div class="status">
          <span>话题状态</span>
          <span :class="loliStatus">
            {{ KUN_TOPIC_DETAIL_STATUS[loliStatus] }}
          </span>
        </div>

        <span class="line"></span>

        <span
          v-if="topic.views > 0"
          class="views"
          v-tooltip="{
            message: '浏览数',
            position: 'bottom'
          }"
        >
          <Icon class="icon" name="lucide:eye" />
          {{ topic.views }}
        </span>

        <s
          class="rewrite"
          v-if="topic.edited"
          v-tooltip="{
            message: '重新编辑时间',
            position: 'bottom'
          }"
        >
          ×
          {{
            formatDate(topic.edited, {
              isShowYear: true,
              isPrecise: true
            })
          }}
        </s>
      </div>
    </div>

    <TopicFooter :topic="topic" />
  </div>
</template>

<style lang="scss" scoped>
.master {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 17px;
}

.header {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--kungalgame-font-color-3);
  font-size: 17px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;

  &::before {
    content: '';
    margin: 0;
  }
}

.content {
  width: 100%;
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
        padding: 1px 4px;
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
    background-color: var(--kungalgame-trans-blue-2);
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

.pinned {
  background-color: var(--kungalgame-red-4);
}

.essential {
  background-color: var(--kungalgame-yellow-2);
}

.featured {
  background-color: var(--kungalgame-pink-4);
}

.active {
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
  .master {
    margin-bottom: 7px;
  }

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
