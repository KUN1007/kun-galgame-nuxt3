<script setup lang="ts">
import { updateWebsiteCategorySchema } from '~/validations/website'
import type { UpdateWebsiteCategoryPayload } from './types'

const props = defineProps<{
  modelValue: boolean
  initialData: UpdateWebsiteCategoryPayload
}>()

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [data: UpdateWebsiteCategoryPayload]
}>()

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})
const isSubmitting = ref(false)

const formData = reactive<UpdateWebsiteCategoryPayload>(props.initialData)

watch(
  () => isModalOpen.value,
  (isOpen) => {
    if (isOpen) {
      isSubmitting.value = false
      Object.assign(formData, props.initialData)
    }
  }
)

const handleSubmit = () => {
  isSubmitting.value = true

  const result = updateWebsiteCategorySchema.safeParse(formData)

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
    <form @submit.prevent="handleSubmit">
      <h2 class="mb-6 text-xl font-bold">编辑分类</h2>

      <div class="space-y-4">
        <KunInput v-model="formData.name" label="分类名称" required />
        <KunTextarea
          v-model="formData.description"
          label="分类描述 (可选)"
          auto-grow
          show-char-count
          :maxlength="300"
        />
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <KunButton variant="light" color="danger" @click="isModalOpen = false">
          取消
        </KunButton>
        <KunButton type="submit" color="primary" :loading="isSubmitting">
          保存更改
        </KunButton>
      </div>
    </form>
  </KunModal>
</template>
