<script setup lang="ts">
import { updateGalgameEngineSchema } from '~/validations/galgame-engine'
import type { UpdateGalgameEnginePayload } from '../types'

const props = defineProps<{
  modelValue: boolean
  initialData: UpdateGalgameEnginePayload
}>()

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [data: UpdateGalgameEnginePayload]
}>()

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

const isSubmitting = ref(false)
const formData = reactive<UpdateGalgameEnginePayload>(props.initialData)

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

  const result = updateGalgameEngineSchema.safeParse(formData)
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

const handleUpdateGalgameEngineAlias = (value: string | number) => {
  const aliasArray = value
    .toString()
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  formData.alias = aliasArray
}
</script>

<template>
  <KunModal v-model:modal-value="isModalOpen" inner-class-name="max-w-md">
    <form @submit.prevent>
      <div class="mb-6 space-y-2">
        <h2 class="text-xl font-bold">编辑游戏引擎</h2>
        <p class="text-sm">不建议更新会社名称, 更新别名即可, 效果相同</p>
      </div>

      <div class="space-y-4">
        <KunInput
          :disabled="true"
          v-model="formData.name"
          label="引擎名称"
          required
        />
        <KunTextarea v-model="formData.description" label="引擎描述" />
        <KunTextarea
          :model-value="formData.alias.toString()"
          @update:model-value="handleUpdateGalgameEngineAlias"
          label="别名 (请使用 , 分隔)"
          :rows="4"
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
          保存更改
        </KunButton>
      </div>
    </form>
  </KunModal>
</template>
