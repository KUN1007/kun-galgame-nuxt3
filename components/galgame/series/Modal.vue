<script setup lang="ts">
import {
  createGalgameSeriesSchema,
  updateGalgameSeriesSchema
} from '~/validations/galgame-series'
import type { UpdateGalgameSeriesPayload } from '../types'

const props = defineProps<{
  modelValue: boolean
  initialData?: UpdateGalgameSeriesPayload
}>()

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [data: UpdateGalgameSeriesPayload]
}>()

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

const isEditing = computed(() => !!props.initialData?.seriesId)
const isSubmitting = ref(false)

const getInitialFormData = (): UpdateGalgameSeriesPayload => ({
  seriesId: 0,
  name: '',
  description: '',
  galgameIds: [],
  ...(props.initialData || {})
})

const formData = reactive<UpdateGalgameSeriesPayload>(getInitialFormData())

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
    ? updateGalgameSeriesSchema
    : createGalgameSeriesSchema

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

  emits('submit', { seriesId: formData.seriesId, ...result.data })
  isSubmitting.value = false
  isModalOpen.value = false
}
</script>

<template>
  <KunModal
    :is-dismissable="false"
    v-model:modal-value="isModalOpen"
    inner-class-name="max-w-xl overflow-visible"
  >
    <form @submit.prevent>
      <h2 class="mb-6 text-xl font-bold">
        {{ isEditing ? '编辑系列' : '创建新系列' }}
      </h2>

      <div class="space-y-4">
        <KunInput v-model="formData.name" label="系列名称" required />
        <KunTextarea
          v-model="formData.description"
          label="系列描述 (1000 字符之内)"
        />

        <GalgameSeriesSelectGalgame
          v-model="formData.galgameIds"
          label="包含的 Galgame (最少 2 个，最多 200 个)"
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
