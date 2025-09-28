<script setup lang="ts">
import {
  KUN_UPDATE_LOG_STATUS_MAP,
  kunTodoTypeOptions
} from '~/constants/update'
import { createTodoSchema, updateTodoSchema } from '~/validations/todo'
import type { UpdateTodoPayload } from './types'

const props = defineProps<{
  modelValue: boolean
  initialData?: UpdateTodoPayload
}>()

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [data: UpdateTodoPayload]
}>()

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

const isEditing = computed(() => !!props.initialData?.todoId)
const isSubmitting = ref(false)

const todoStatusOptions = Object.entries(KUN_UPDATE_LOG_STATUS_MAP).map(
  (todo) => ({
    label: todo[1],
    value: Number(todo[0])
  })
)

const getInitialFormData = (): UpdateTodoPayload => ({
  todoId: 0,
  type: 'forum',
  status: 0,
  content_en_us: '',
  content_zh_cn: '',
  ...(props.initialData || {})
})

const formData = reactive<UpdateTodoPayload>(getInitialFormData())

watch(
  () => isModalOpen.value,
  (isOpen) => {
    if (isOpen) {
      isSubmitting.value = false
      Object.assign(formData, getInitialFormData())
    }
  }
)

const handleSubmit = () => {
  isSubmitting.value = true
  const schema = isEditing.value ? updateTodoSchema : createTodoSchema

  const result = schema.safeParse(formData)

  if (!result.success) {
    const message = JSON.parse(result.error.message)[0]
    useMessage(
      `位置: ${message.path[0]} - 错误提示: ${message.message}`,
      'warn'
    )
    isSubmitting.value = false
    return
  }

  emits('submit', { todoId: formData.todoId, ...result.data })
  isSubmitting.value = false
  isModalOpen.value = false
}
</script>

<template>
  <KunModal
    :is-dismissable="false"
    v-model:modal-value="isModalOpen"
    inner-class-name="max-w-xl"
  >
    <form @submit.prevent>
      <h2 class="mb-6 text-xl font-bold">
        {{ isEditing ? '编辑更新日志' : '创建新更新日志' }}
      </h2>

      <div class="space-y-4">
        <KunSelect
          v-model="formData.status"
          :options="todoStatusOptions"
          label="待办状态"
          required
        />
        <KunSelect
          v-model="formData.type"
          :options="kunTodoTypeOptions"
          label="待办类型"
          required
        />
        <KunTextarea
          v-model="formData.content_zh_cn"
          label="中文内容 (1000 字符之内)"
          :rows="5"
        />
        <KunTextarea
          v-model="formData.content_en_us"
          label="英文内容 (1000 字符之内)"
          :rows="5"
        />
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <KunButton variant="light" color="danger" @click="isModalOpen = false">
          取消
        </KunButton>
        <KunButton
          @click="handleSubmit"
          color="primary"
          :loading="isSubmitting"
        >
          {{ isEditing ? '保存更改' : '创建' }}
        </KunButton>
      </div>
    </form>
  </KunModal>
</template>
