<script setup lang="ts">
import {
  createWebsiteTagSchema,
  updateWebsiteTagSchema
} from '~/validations/website'
import type { CreateWebsiteTagPayload, UpdateWebsiteTagPayload } from './types'

type TagData = CreateWebsiteTagPayload & { tagId?: number }

const props = defineProps<{
  modelValue: boolean
  initialData?: TagData
}>()

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [data: CreateWebsiteTagPayload | UpdateWebsiteTagPayload]
}>()

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

const isEditing = computed(() => !!props.initialData?.tagId)
const isSubmitting = ref(false)

const getInitialFormData = (): TagData => ({
  name: '',
  label: '',
  level: 1,
  description: '',
  ...(props.initialData || {})
})

const formData = reactive<TagData>(getInitialFormData())

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
  const schema = isEditing.value
    ? updateWebsiteTagSchema
    : createWebsiteTagSchema
  const result = schema.safeParse(formData)

  if (!result.success) {
    const message = JSON.parse(result.error.message)[0]
    useMessage(
      `位置: ${message.path[0]} - 错误提示: ${message.message}`,
      'warn'
    )
    return
  }

  emits('submit', result.data)
  isSubmitting.value = false
  isModalOpen.value = false
}
</script>

<template>
  <KunModal
    :is-dismissable="false"
    v-model:modal-value="isModalOpen"
    inner-class-name="max-w-md"
  >
    <form @submit.prevent>
      <h2 class="mb-6 text-xl font-bold">
        {{ isEditing ? '编辑标签' : '创建新标签' }}
      </h2>

      <div class="space-y-4">
        <KunInput v-model="formData.name" label="标签名称" required />
        <KunInput
          v-model="formData.level"
          label="标签等级 (0-20)"
          type="number"
          required
        />
        <KunTextarea
          v-model="formData.description"
          label="标签描述 (300 字符之内)"
          type="number"
          required
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
