<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TopicPoll } from '~/types/api/topic-poll'
import { usePoll } from '~/composables/topic/usePoll'

const props = defineProps<{
  poll: TopicPoll
  isTopicAdmin: boolean
}>()

const emits = defineEmits<{
  edit: [poll: TopicPoll]
  refresh: []
}>()

const { submitVote, deletePoll } = usePoll(props.poll.topic_id)
const selectedOptions = ref<number[]>([])
const isLoading = ref(false)

const isPollEnded = computed(() => {
  if (props.poll.status === 'closed') {
    return true
  }
  if (!props.poll.deadline) {
    return false
  }
  return new Date(props.poll.deadline) < new Date()
})

const canViewResults = computed(() => {
  if (isPollEnded.value) {
    return true
  }
  const visibility = props.poll.result_visibility
  if (visibility === 'always') {
    return true
  }
  if (visibility === 'after_vote' && props.poll.has_voted) {
    return true
  }
  return false
})

const handleOptionClick = (optionId: number) => {
  if (props.poll.type === 'single') {
    selectedOptions.value = [optionId]
  } else {
    const index = selectedOptions.value.indexOf(optionId)
    if (index > -1) {
      selectedOptions.value.splice(index, 1)
    } else {
      if (
        props.poll.max_choice &&
        selectedOptions.value.length >= props.poll.max_choice
      ) {
        selectedOptions.value.shift()
      }
      selectedOptions.value.push(optionId)
    }
  }
}

const handleVote = async () => {
  if (selectedOptions.value.length === 0) return
  isLoading.value = true
  await submitVote(props.poll.id, selectedOptions.value)
  isLoading.value = false
  emits('refresh')
}

const handleDelete = async () => {
  await deletePoll(props.poll.id)
  emits('refresh')
}
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-pressable="false"
    :is-transparent="false"
    dark-border
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <KunIcon name="lucide:bar-chart-3" class="text-primary text-xl" />
        <h3 class="text-lg font-bold">{{ poll.title }}</h3>
      </div>
      <KunBadge :color="isPollEnded ? 'default' : 'success'">
        {{ isPollEnded ? '已结束' : '进行中' }}
      </KunBadge>
    </div>

    <p v-if="poll.description" class="text-default-500 mt-2 text-sm">
      {{ poll.description }}
    </p>

    <div class="mt-4 flex flex-col gap-3">
      <div
        v-for="option in poll.option"
        :key="option.id"
        :class="
          cn(
            'relative overflow-hidden rounded-md border p-3 transition-colors',
            !isPollEnded && 'hover:border-primary/50 cursor-pointer',
            selectedOptions.includes(option.id) && 'border-primary'
          )
        "
        @click="handleOptionClick(option.id)"
      >
        <div
          v-if="canViewResults"
          class="bg-primary/20 absolute top-0 left-0 h-full rounded-md transition-all duration-500"
          :style="{
            width: `${((option.vote_count || 0) / (poll.vote_count || 1)) * 100}%`
          }"
        />

        <div class="relative z-10 flex items-center justify-between">
          <div class="flex flex-grow items-center gap-3">
            <KunCheckBox
              v-if="poll.type === 'multiple'"
              :model-value="selectedOptions.includes(option.id)"
              :disabled="isPollEnded"
              @click.stop
              @change="handleOptionClick(option.id)"
            />
            <div v-else class="flex h-5 w-5 items-center">
              <div
                :class="[
                  'h-4 w-4 rounded-full border-2',
                  selectedOptions.includes(option.id)
                    ? 'border-primary bg-primary'
                    : 'border-default-300'
                ]"
              />
            </div>

            <span class="font-medium">{{ option.text }}</span>
            <KunIcon
              v-if="option.is_voted"
              name="lucide:check-circle-2"
              class="text-primary"
            />
          </div>

          <div v-if="canViewResults" class="flex items-center gap-2 text-sm">
            <span class="font-semibold">{{ option.vote_count || 0 }} 票</span>
            <span class="text-default-500">
              ({{
                (
                  ((option.vote_count || 0) / (poll.vote_count || 1)) *
                  100
                ).toFixed(1)
              }}%)
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-2">
      <div class="text-default-500 text-sm">
        总 {{ poll.voters_count }} 人参与
        <span v-if="poll.type === 'multiple'">
          ·
          {{
            poll.min_choice === poll.max_choice
              ? `必选 ${poll.max_choice} 项`
              : `可选 ${poll.min_choice}-${poll.max_choice} 项`
          }}
        </span>
        <span v-if="!poll.is_anonymous">· 公开投票人</span>
        <span v-if="poll.can_change_vote">· 可改票</span>
      </div>

      <div class="flex gap-2">
        <KunButton
          v-if="!isPollEnded && (!poll.has_voted || poll.can_change_vote)"
          color="primary"
          :loading="isLoading"
          :disabled="selectedOptions.length === 0"
          @click="handleVote"
        >
          {{ poll.has_voted ? '修改投票' : '投票' }}
        </KunButton>
        <KunButton
          v-if="!canViewResults && !isPollEnded"
          variant="light"
          @click="emits('refresh')"
        >
          我已投，刷新看结果
        </KunButton>
      </div>
    </div>

    <div
      v-if="canViewResults"
      class="border-t-default-200 mt-4 flex items-center justify-end gap-2 border-t pt-3"
    >
      <KunTooltip text="查看投票日志">
        <KunButton variant="light" :is-icon-only="true">
          <KunIcon name="lucide:history" />
        </KunButton>
      </KunTooltip>
      <KunTooltip text="编辑投票">
        <KunButton
          variant="light"
          :is-icon-only="true"
          @click="emits('edit', poll)"
        >
          <KunIcon name="lucide:pencil" />
        </KunButton>
      </KunTooltip>
      <KunTooltip text="删除投票">
        <KunButton
          variant="light"
          color="danger"
          :is-icon-only="true"
          @click="handleDelete"
        >
          <KunIcon name="lucide:trash-2" />
        </KunButton>
      </KunTooltip>
    </div>
  </KunCard>
</template>
