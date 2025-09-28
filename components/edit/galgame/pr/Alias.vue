<script setup lang="ts">
const props = defineProps<{
  type: 'create' | 'rewrite'
}>()

const { galgamePR } = storeToRefs(useTempGalgamePRStore())
const { aliases } = storeToRefs(usePersistEditGalgameStore())

const selectedAlias = ref(
  props.type === 'create' ? aliases.value : galgamePR.value[0].alias
)
const isInputFocus = ref(false)
const inputValue = ref('')
const canDeleteAlias = ref(false)

const handleAliasClose = (Alias: string) => {
  const index = selectedAlias.value.indexOf(Alias)
  if (index > -1) {
    selectedAlias.value.splice(index, 1)
  }
}

const handleAddAlias = () => {
  const AliasName = inputValue.value.trim().slice(0, 17).toLowerCase()
  const isIncludes = selectedAlias.value
    .map((Alias: string) => Alias.toLowerCase())
    .includes(AliasName)

  if (isIncludes) {
    useMessage(10505, 'warn')
    return
  }

  if (AliasName.length > 0 && selectedAlias.value.length < 17) {
    const Alias = validateAliasName(AliasName)

    selectedAlias.value.push(Alias)
    inputValue.value = ''
    canDeleteAlias.value = true
  }
}

const handleRemoveAlias = () => {
  if (inputValue.value === '' && selectedAlias.value.length > 0) {
    if (canDeleteAlias.value) {
      selectedAlias.value.pop()
    }
    canDeleteAlias.value = true
  }
}

const validateAliasName = (tagName: string) => {
  let validatedName = tagName

  if (validatedName.length > 107) {
    validatedName = validatedName.slice(0, 107)
  }

  return validatedName
}

watch(
  () => selectedAlias.value,
  () => {
    if (props.type === 'create') {
      aliases.value = selectedAlias.value
    } else {
      galgamePR.value[0].alias = selectedAlias.value
    }
  }
)
</script>

<template>
  <div class="relative space-y-2">
    <h2 class="text-xl">游戏别名</h2>
    <p class="text-default-500">别名最多 17 个, 可以输入别名按下回车创建别名</p>

    <div
      class="ring-default-500 bg-default/10 min-h-[44px] w-full rounded-lg px-6 py-3 transition-all focus-within:ring-1"
    >
      <div class="flex flex-wrap gap-2">
        <KunBadge
          color="primary"
          size="md"
          v-for="(alias, index) in selectedAlias"
          :key="index"
        >
          {{ alias }}
          <button
            @click="handleAliasClose(alias)"
            class="text-primary ml-2 focus:outline-none"
          >
            ×
          </button>
        </KunBadge>

        <input
          class="placeholder-default-500 text-default-700 min-w-[120px] flex-grow bg-transparent outline-none"
          type="text"
          v-model="inputValue"
          placeholder="请输入游戏别名"
          @input="canDeleteAlias = false"
          @keyup.enter="handleAddAlias"
          @keyup.backspace="handleRemoveAlias"
          @focus="isInputFocus = true"
          @blur="isInputFocus = false"
        />
      </div>
    </div>

    <div class="absolute top-1/2 right-2 -translate-y-1/2">
      <KunButton
        :is-icon-only="true"
        variant="flat"
        v-if="inputValue"
        @click="handleAddAlias"
      >
        <KunIcon name="lucide:plus" class="h-5 w-5 text-blue-600" />
      </KunButton>
    </div>
  </div>
</template>
