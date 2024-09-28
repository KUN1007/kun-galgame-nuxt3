<script setup lang="ts">
import type { PoolTopic } from '~/types/api/pool'

const props = defineProps<{
  topic: PoolTopic
}>()

const { isSimpleMode } = storeToRefs(usePersistPoolStore())

const actionsCount = computed(() => props.topic.replies + props.topic.comments)

const iconMap: Record<string, string> = {
  g: 'lucide:gamepad-2',
  t: 'lucide:drafting-compass',
  o: 'lucide:circle-ellipsis'
}
</script>

<template>
  <NuxtLinkLocale
    class="topic"
    :to="`/topic/${props.topic.tid}`"
    v-kun-gradient="{
      color: '--kungalgame-trans-blue-0',
      radius: 70
    }"
  >
    <div class="title">
      <template v-if="isSimpleMode">
        <span
          class="section"
          v-for="(sec, index) in props.topic.section"
          :key="index"
          :class="sec.toLowerCase()[0]"
        >
          <Icon class="icon" :name="iconMap[sec[0]]" />
        </span>
      </template>
      <span>{{ topic.title }}</span>
    </div>

    <PoolUser
      v-if="!isSimpleMode"
      :user="props.topic.user"
      :time="props.topic.time"
    />

    <PoolIntroduction
      v-if="!isSimpleMode"
      :section="props.topic.section"
      :tags="props.topic.tags"
    />

    <div class="status">
      <span>
        <Icon class="icon" name="lucide:mouse-pointer-click" />
        <span>{{ props.topic.views }}</span>
      </span>

      <span>
        <Icon class="icon" name="lucide:thumbs-up" />
        <span v-if="props.topic.likes">{{ props.topic.likes }}</span>
      </span>

      <span>
        <Icon class="icon" name="lucide:reply" />
        <span v-if="actionsCount">{{ actionsCount }}</span>
      </span>
    </div>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.topic {
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  cursor: pointer;
  max-width: 300px;
  padding: 10px;
  transition: all 0.2s;
  border-radius: 10px;

  &:hover {
    box-shadow: var(--shadow);

    .title {
      color: var(--kungalgame-blue-5);
    }
  }
}

.title {
  color: var(--kungalgame-font-color-3);

  .section {
    margin-right: 5px;

    .icon {
      font-size: 17px;
    }
  }

  .g {
    color: var(--kungalgame-blue-5);
  }

  .t {
    color: var(--kungalgame-green-4);
  }

  .o {
    color: var(--kungalgame-pink-4);
  }
}

.status {
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  overflow: hidden;
  flex-wrap: wrap;
  margin-top: 10px;

  span {
    display: flex;
    align-items: center;

    span {
      margin-left: 5px;
    }
  }
}
</style>
