<script setup lang="ts">
import type { TopicPollVoteLog } from '~/types/api/topic-poll'

const props = defineProps<{
  modelValue: boolean
  pollId: number
  topicId: number
}>()

const pageData = reactive({
  poll_id: props.pollId,
  page: 1,
  limit: 50
})

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const logs = ref<TopicPollVoteLog[]>([])
const totalCount = ref(0)
const isLoading = ref(false)

const fetchLogs = async () => {
  if (!props.pollId) return
  isLoading.value = true
  const res = await $fetch(`/api/topic/${props.topicId}/poll/log`, {
    query: pageData,
    ...kungalgameResponseHandler
  })
  isLoading.value = false
  logs.value = res.logs
  totalCount.value = res.totalCount
}

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      fetchLogs()
    }
  }
)
</script>

<template>
  <KunModal
    :modal-value="modelValue"
    @update:modal-value="(value) => emits('update:modelValue', value)"
    inner-class-name="max-w-md"
  >
    <h2 class="mb-4 text-xl font-bold">投票记录</h2>

    <KunLoading
      v-if="isLoading"
      description="正在加载记录..."
      class="text-center"
    />

    <KunNull v-else-if="logs.length === 0" description="无记录或匿名投票" />

    <div v-else class="max-h-[60vh] overflow-y-auto">
      <div class="flex flex-col gap-6">
        <div
          v-for="log in logs"
          :key="log.id"
          class="flex flex-col justify-between gap-2"
        >
          <div class="flex items-center gap-3">
            <KunUser :disable-floating="true" :user="log.user" />
            <div class="text-default-500 text-sm">
              {{
                formatDate(log.created, { isPrecise: true, isShowYear: true })
              }}
            </div>
          </div>
          <span class="text-default-700 text-sm">
            投给了「{{ log.option }}」
          </span>
        </div>
      </div>
    </div>
  </KunModal>
</template>
