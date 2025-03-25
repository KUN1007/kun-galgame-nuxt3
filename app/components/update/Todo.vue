<script setup lang="ts">
import { KUN_UPDATE_LOG_STATUS_MAP } from '~/constants/update'
import type { KunUIColor } from '~/components/kun/ui/type'

const iconMap: Record<number, string> = {
  0: 'lucide:circle-divide',
  1: 'lucide:loader',
  2: 'lucide:check',
  3: 'lucide:x'
}

const colorMap: Record<number, KunUIColor | 'background'> = {
  0: 'background',
  1: 'primary',
  2: 'success',
  3: 'danger'
}

const pageData = ref({
  page: 1,
  limit: 10,
  language: 'zh-cn'
})

const { data, status } = await useFetch(`/api/update/todo`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

watch(
  () => status.value,
  () => {
    if (status.value === 'success') {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
)
</script>

<template>
  <div v-if="data" class="w-full space-y-3">
    <KunCard
      :is-hoverable="false"
      :is-transparent="false"
      v-for="todo in data.todos"
      :key="todo.todoId"
      :color="colorMap[todo.status]"
    >
      <pre class="mb-4 font-mono whitespace-pre-line">
        {{ todo.content['zh-cn'] }}
      </pre>

      <div
        class="flex flex-col items-start gap-2 text-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <span class="text-default-600">
          {{ formatDate(todo.time, { isPrecise: true }) }}
        </span>

        <div class="flex items-center gap-2">
          <span v-if="todo.completedTime" class="text-default-500">
            {{ formatDate(todo.completedTime, { isPrecise: true }) }}
          </span>
          <Icon
            :name="iconMap[todo.status]"
            class="h-4 w-4"
            :class="{
              'text-default': todo.status === 0,
              'text-primary animate-spin': todo.status === 1,
              'text-success': todo.status === 2,
              'text-danger': todo.status === 3
            }"
          />
          <span
            :class="{
              'text-default': todo.status === 0,
              'text-primary': todo.status === 1,
              'text-success': todo.status === 2,
              'text-danger': todo.status === 3
            }"
          >
            {{ KUN_UPDATE_LOG_STATUS_MAP[todo.status] }}
          </span>
        </div>
      </div>
    </KunCard>
  </div>

  <KunCard :is-hoverable="false" :is-transparent="false">
    <KunPagination
      v-if="data"
      v-model:current-page="pageData.page"
      :total-page="Math.ceil(data.totalCount / pageData.limit)"
      :is-loading="status === 'pending'"
    />
  </KunCard>
</template>
