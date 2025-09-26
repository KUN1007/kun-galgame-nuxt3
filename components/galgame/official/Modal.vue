<script setup lang="ts">
import {
  KUN_GALGAME_OFFICIAL_CATEGORY_MAP,
  KUN_GALGAME_OFFICIAL_LANGUAGE_MAP
} from '~/constants/galgameOfficial'
import { updateGalgameOfficialSchema } from '~/validations/galgame-official'
import type { UpdateGalgameOfficialPayload } from '../types'
import type { KunSelectOption } from '~/components/kun/select/type'

const props = defineProps<{
  modelValue: boolean
  initialData: UpdateGalgameOfficialPayload
}>()

const emits = defineEmits<{
  'update:modelValue': [value: boolean]
  submit: [data: UpdateGalgameOfficialPayload]
}>()

const categoryOptions: KunSelectOption[] = Object.entries(
  KUN_GALGAME_OFFICIAL_CATEGORY_MAP
).map(([value, label]) => ({ value, label }))

const languageOptions: KunSelectOption[] = Object.entries(
  KUN_GALGAME_OFFICIAL_LANGUAGE_MAP
).map(([value, label]) => ({ value, label }))

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

const isSubmitting = ref(false)
const formData = reactive<UpdateGalgameOfficialPayload>(props.initialData)

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

  const result = updateGalgameOfficialSchema.safeParse(formData)
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

const handleUpdateGalgameOfficialAlias = (value: string | number) => {
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
        <h2 class="text-xl font-bold">编辑制作会社</h2>
        <p class="text-sm">不建议更新会社名称, 更新别名即可, 效果相同</p>
      </div>

      <div class="space-y-4">
        <KunInput
          :disabled="true"
          v-model="formData.name"
          label="名称"
          required
        />
        <KunInput v-model="formData.link" label="官网链接" type="url" />

        <KunSelect
          v-model="formData.lang"
          label="会社分类"
          :options="languageOptions"
        />

        <KunSelect
          v-model="formData.category"
          label="会社分类"
          :options="categoryOptions"
        />

        <KunTextarea v-model="formData.description" label="描述" />
        <KunTextarea
          :model-value="formData.alias.toString()"
          @update:model-value="handleUpdateGalgameOfficialAlias"
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
