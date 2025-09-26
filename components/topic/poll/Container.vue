<script setup lang="ts">
import { ref } from 'vue'
import { usePoll } from '~/composables/topic/usePoll'
import type { TopicPoll } from '~/types/api/topic-poll'

const props = defineProps<{
  topicId: number
  isTopicAdmin: boolean
}>()

const { getPoll } = usePoll(props.topicId)

const isModalOpen = ref(false)
const isShowHelp = ref(false)
const pollToEdit = ref<TopicPoll | undefined>(undefined)

const { data, refresh } = await getPoll()
const polls = computed(() => data.value || [])

const openCreateModal = () => {
  pollToEdit.value = undefined
  isModalOpen.value = true
}

const openEditModal = (pollData: TopicPoll) => {
  pollToEdit.value = pollData
  isModalOpen.value = true
}
</script>

<template>
  <div class="space-y-3">
    <div class="space-y-3">
      <TopicPollList
        v-for="(poll, index) in polls"
        :key="index"
        :poll="poll"
        :is-topic-admin="isTopicAdmin"
        @edit="openEditModal"
        @refresh="refresh"
      />
    </div>

    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      :is-pressable="false"
      v-if="isTopicAdmin"
      content-class="space-y-3"
    >
      <h2>话题小程序</h2>

      <div class="flex items-center gap-3">
        <KunButton
          size="sm"
          variant="bordered"
          class="flex-col px-4"
          @click="openCreateModal"
        >
          <KunIcon name="lucide:bar-chart-3" class="text-2xl" />
          投票
        </KunButton>

        <KunButton
          size="sm"
          variant="light"
          color="default"
          class="flex-col px-4"
          @click="isShowHelp = !isShowHelp"
        >
          <KunIcon name="lucide:circle-help" class="text-2xl" />
          帮助
        </KunButton>
      </div>

      <KunInfo v-if="isShowHelp" title="话题使用帮助">
        <div class="space-y-1 text-sm">
          <h2 class="text-lg"></h2>
          <p>
            1. 作为狗修金, 您有支配话题下方全体萝莉 (回复者) 的权利, 您可以:
          </p>
          <p>2. 自由的对萝莉设精 (设置某条回复为最佳答案)</p>
          <p>3. 自由的进入一条萝莉线路 (置顶回复)</p>
          <p>
            4. 认真回复的萝莉值得被奖励, 请毫不吝啬的、积极的、喂她吃棒棒糖
            (给回复设置最佳答案将会奖励该用户 7 萌萌点)
          </p>
        </div>
      </KunInfo>
    </KunCard>

    <TopicPollModal
      v-if="isTopicAdmin"
      v-model="isModalOpen"
      :topic-id="topicId"
      :initial-data="pollToEdit"
      @refresh="refresh"
    />
  </div>
</template>
