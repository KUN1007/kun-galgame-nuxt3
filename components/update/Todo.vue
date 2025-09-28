<script setup lang="ts">
import {
  KUN_TODO_TYPE_MAP,
  KUN_UPDATE_LOG_STATUS_MAP
} from '~/constants/update'
import type { Todo } from '~/types/api/update-log'
import type { UpdateTodoPayload } from './types'

const { role } = usePersistUserStore()

const iconMap: Record<number, string> = {
  0: 'lucide:circle-divide',
  1: 'lucide:loader',
  2: 'lucide:check',
  3: 'lucide:x'
}

const textMap: Record<number, string> = {
  0: 'text-default',
  1: 'text-primary',
  2: 'text-success',
  3: 'text-danger'
}

const pageData = ref({
  page: 1,
  limit: 30,
  language: 'zh-cn'
})

const { data, status, refresh } = await useFetch(`/api/update/todo`, {
  method: 'GET',
  query: pageData,
  ...kungalgameResponseHandler
})

const showTodoModal = ref(false)
const editingTodo = ref<UpdateTodoPayload>({} as UpdateTodoPayload)

const openEditTodoModal = (log: Todo) => {
  if (!data.value) {
    return
  }
  editingTodo.value = {
    status: log.status,
    type: 'forum',
    content_en_us: log.content['en-us'],
    content_zh_cn: log.content['zh-cn'],
    todoId: log.id
  } satisfies UpdateTodoPayload
  showTodoModal.value = true
}

const handleTodoAction = async (data: UpdateTodoPayload) => {
  const result = await $fetch(`/api/update/todo`, {
    method: data.todoId ? 'PUT' : 'POST',
    watch: false,
    body: data,
    ...kungalgameResponseHandler
  })

  if (result) {
    useMessage(data.todoId ? '更新成功' : '发布待办成功', 'success')
    refresh()
  }
}
</script>

<template>
  <div class="space-y-6" v-if="data">
    <KunHeader
      name="待办列表"
      description="这里记录了网站将会实现的功能, 以及更改的功能, 包括 Galgame 以及话题, 以及网站所有方向可能发生的各种更新等等"
    >
      <template #endContent>
        <div v-if="role > 2" class="flex justify-end">
          <KunButton @click="showTodoModal = true">创建待办</KunButton>
        </div>
      </template>
    </KunHeader>

    <KunCard
      :is-hoverable="false"
      :is-transparent="true"
      :dark-border="true"
      v-for="todo in data.todos"
      :key="todo.id"
      content-class="space-y-3"
    >
      <div class="flex items-center gap-3">
        <KunBadge color="primary">
          {{ KUN_TODO_TYPE_MAP[todo.type] }}
        </KunBadge>

        <span class="text-default-600 text-sm">
          {{ `该企划创建于 ${formatDate(todo.created, { isPrecise: true })}` }}
        </span>
      </div>

      <pre class="font-mono break-all whitespace-pre-line">
        {{ todo.content['zh-cn'] }}
      </pre>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-sm">
          <span v-if="todo.completedTime" class="text-default-500">
            {{ formatDate(todo.completedTime, { isPrecise: true }) }}
          </span>
          <KunIcon
            :name="iconMap[todo.status]"
            :class="cn('h-4 w-4', textMap[todo.status])"
          />
          <span :class="cn(textMap[todo.status])">
            {{ KUN_UPDATE_LOG_STATUS_MAP[todo.status] }}
          </span>
        </div>

        <KunButton
          variant="flat"
          size="sm"
          v-if="role > 2"
          @click="openEditTodoModal(todo)"
        >
          编辑
        </KunButton>
      </div>
    </KunCard>

    <UpdateTodoModal
      v-model="showTodoModal"
      :initial-data="editingTodo"
      @submit="handleTodoAction"
    />

    <KunCard :is-hoverable="false" :is-transparent="true">
      <KunPagination
        v-if="data"
        v-model:current-page="pageData.page"
        :total-page="Math.ceil(data.totalCount / pageData.limit)"
        :is-loading="status === 'pending'"
      />
    </KunCard>
  </div>
</template>
