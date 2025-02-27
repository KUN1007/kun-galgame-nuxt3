<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>()
const emits = defineEmits<{
  insert: [href: string, text: string]
  cancel: []
}>()
const inputHref = ref('')
const inputText = ref('')
const exampleURL = useRuntimeConfig().public.KUN_GALGAME_URL

watch(
  () => props.show,
  () => {
    inputHref.value = ''
    inputText.value = ''
  }
)

const handleLinkInsert = () => {
  if (inputHref.value.length === 0) {
    return
  }
  const text = inputText.value.length === 0 ? inputHref.value : inputText.value
  emits('insert', inputHref.value, text)
}
</script>

<template>
  <KunDialog :is-show-dialog="show">
    <div class="container">
      <h2 class="title">插入超链接</h2>

      <KunInput
        type="url"
        v-model="inputHref"
        :placeholder="`链接 URL (${exampleURL})`"
        class="input"
      />
      <KunInput
        type="text"
        v-model="inputText"
        placeholder="链接文字 (可选)"
        class="input"
      />

      <div class="button-group">
        <KunButton @click="emits('cancel')">取消</KunButton>

        <KunButton @click="handleLinkInsert">插入</KunButton>
      </div>
    </div>
  </KunDialog>
</template>

<style lang="scss" scoped>
.container {
  width: 600px;
  margin: auto;
  padding: 17px;
  background-color: var(--kungalgame-white);
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  h2 {
    margin-bottom: 17px;
  }

  input {
    margin-bottom: 17px;
  }
}

.button-group {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;

  button {
    &:last-child {
      margin-left: 10px;
    }
  }
}

@media (max-width: 700px) {
  .container {
    margin: auto 17px;
  }
}
</style>
