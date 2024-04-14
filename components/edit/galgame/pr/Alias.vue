<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())

const selectedAlias = ref(galgamePR.value[0].alias)
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
    .map((Alias) => Alias.toLowerCase())
    .includes(AliasName)

  if (isIncludes) {
    useMessage(
      'Alias already exists, please choose another one',
      '别名已存在, 请更换',
      'warn'
    )
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
    galgamePR.value[0].alias = selectedAlias.value
  }
)
</script>

<template>
  <KunHeader :size="2">
    <template #header>游戏别名</template>
  </KunHeader>

  <div class="input-container">
    <div class="alias-container">
      <span
        v-for="(alias, index) in selectedAlias"
        :key="index"
        class="selected-alias"
      >
        {{ alias }}
        <span class="close-btn" @click="handleAliasClose(alias)">×</span>
      </span>
    </div>

    <input
      class="input"
      type="text"
      v-model="inputValue"
      placeholder="请输入游戏别名"
      @input="canDeleteAlias = false"
      @keyup.enter="handleAddAlias"
      @keyup.backspace="handleRemoveAlias"
      @focus="isInputFocus = true"
      @blur="isInputFocus = false"
    />

    <div class="box1"></div>
    <div class="box2" :class="isInputFocus ? 'box-active' : ''"></div>
  </div>

  <div class="hint">别名最多 17 个, 可以输入别名按下回车创建别名</div>
</template>

<style lang="scss" scoped>
.input-container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.alias-container {
  display: flex;
  flex-wrap: wrap;
}

.selected-alias {
  border: 1px solid var(--kungalgame-pink-4);
  border-radius: 14px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  font-size: 14px;
  padding: 3px 17px;
  background-color: var(--kungalgame-trans-pink-0);

  span {
    cursor: pointer;
  }
}

.close-btn {
  margin: 0 5px;
}

.input {
  background-color: var(--kungalgame-trans-white-9);
  font-size: 17px;
  flex-grow: 1;
  border: none;
  padding: 7px;
  display: flex;
  min-width: 300px;
  color: var(--kungalgame-font-color-3);
}

.box1 {
  height: 2px;
  width: 100%;
  display: flex;
  background-color: var(--kungalgame-blue-0);
}

.box2 {
  position: relative;
  transform: translateY(-2px);
  transition: all 0.5s;
  height: 2px;
  width: 1px;
  display: flex;
  background-color: var(--kungalgame-blue-2);
}

.box-active {
  width: 100%;
  background-color: var(--kungalgame-blue-5);
}

.hint {
  font-size: small;
  color: var(--kungalgame-font-color-1);
}
</style>
