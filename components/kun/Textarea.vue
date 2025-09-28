<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder?: string
    modelValue?: string
    label?: string
    name?: string
    hint?: string
    error?: string
    maxHeight?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    autofocus?: boolean
    showCharCount?: boolean
    autoGrow?: boolean
    rows?: number
    maxlength?: number
    minlength?: number
    resize?: 'none' | 'vertical' | 'horizontal' | 'both'
    darkBorder?: boolean
  }>(),
  {
    placeholder:
      '「恋だよ、恋。私に出来なかったことのひとつを、君に代わりにかなえてもらう」',
    modelValue: '',
    label: '',
    name: '',
    hint: '',
    error: '',
    maxHeight: '',
    disabled: false,
    readonly: false,
    required: false,
    autofocus: false,
    showCharCount: false,
    autoGrow: false,
    rows: 4,
    maxlength: 100007,
    minlength: 1,
    resize: 'none',
    darkBorder: true
  }
)

const kunUniqueId = useKunUniqueId('kun-textarea')
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const localValue = ref(props.modelValue)

const emits = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
}>()

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue
  }
)

watch(localValue, (newValue) => {
  emits('update:modelValue', newValue)
  if (props.autoGrow) {
    nextTick(() => adjustHeight())
  }
})

const onInput = (event: Event) => {
  emits('input', event)
  if (props.autoGrow) {
    adjustHeight()
  }
}

const adjustHeight = () => {
  if (!textareaRef.value) {
    return
  }
  textareaRef.value.style.height = 'auto'

  let newHeight = textareaRef.value.scrollHeight + 'px'
  if (props.maxHeight && parseInt(newHeight) > parseInt(props.maxHeight)) {
    newHeight = props.maxHeight
  }

  textareaRef.value.style.height = newHeight
}

onMounted(() => {
  if (props.autoGrow && textareaRef.value) {
    adjustHeight()
  }

  if (props.autofocus && textareaRef.value) {
    textareaRef.value.focus()
  }
})
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="kunUniqueId"
      class="mb-1 block text-sm font-medium"
    >
      {{ label }}
      <span v-if="required" class="text-danger-500 ml-1">*</span>
    </label>

    <div class="relative">
      <textarea
        :id="kunUniqueId"
        ref="textareaRef"
        v-model="localValue"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :minlength="minlength"
        :rows="rows"
        :autofocus="autofocus"
        :class="
          cn(
            'scrollbar-hide border-default/20 w-full rounded-md border p-3 transition duration-150 ease-in-out',
            'focus:ring-primary-500 focus:border-transparent focus:ring-2 focus:outline-none',
            disabled ? 'text-default-500 cursor-not-allowed shadow-none' : '',
            darkBorder && 'dark:border-default-200',
            // readonly ? 'bg-default-100' : '',
            // error ? 'border-danger-300' : 'border-default-300',
            resize === 'none'
              ? 'resize-none'
              : resize === 'vertical'
                ? 'resize-y'
                : resize === 'horizontal'
                  ? 'resize-x'
                  : 'resize'
          )
        "
        @input="onInput"
        @blur="(event) => emits('blur', event)"
        @focus="(event) => emits('focus', event)"
      />

      <div
        v-if="maxlength && showCharCount"
        class="text-default-500 absolute right-2 bottom-2 text-xs"
      >
        {{ localValue.length }}/{{ maxlength }}
      </div>
    </div>

    <div v-if="error" class="text-danger-600 mt-1 text-sm">
      {{ error }}
    </div>

    <div v-else-if="hint" class="text-default-500 mt-1 text-sm">
      {{ hint }}
    </div>
  </div>
</template>
