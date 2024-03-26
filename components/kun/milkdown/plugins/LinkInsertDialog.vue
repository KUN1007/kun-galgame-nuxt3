<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
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
  if (inputHref.value.length == 0) {
    return
  }
  const text = inputText.value.length == 0 ? inputHref.value : inputText.value
  emit('insert', inputHref.value, text)
}

const handleCancelInsert = () => {
  emit('cancel')
}
</script>
<template>
  <Teleport to="body">
    <Transition name="insertLink">
      <div
        class="mask"
        tabindex="0"
        v-if="show"
        @keydown.enter="handleLinkInsert"
      >
        <div class="dialog">
          <div>
            <h2>{{ $t('edit.link.title') }}</h2>
          </div>
          <hr />
          <div class="input-wrapper">
            <label for="LinkURLInput" class="label">
              {{ $t('edit.link.URLLabel') }}:
            </label>
            <input
              id="LinkURLInput"
              type="url"
              v-model="inputHref"
              :placeholder="exampleURL"
              class="input"
            />
          </div>
          <div class="input-wrapper">
            <label for="LinkTextInput" class="label">
              {{ $t('edit.link.textLabel') }}:
            </label>
            <input
              id="LinkTextInput"
              type="text"
              v-model="inputText"
              class="input"
            />
          </div>
          <div class="button-group">
            <button @click="handleLinkInsert" class="confirm-btn">
              {{ $t('edit.link.confirmInsert') }}
            </button>
            <button @click="handleCancelInsert" class="cancel-btn">
              {{ $t('edit.link.cancelInsert') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--kungalgame-mask-color-0);
  transition: opacity 0.3s ease;
  color: var(--kungalgame-font-color-3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog {
  width: 600px;
  height: 225px;
  padding: 17px;
  background-color: var(--kungalgame-white);
  border: 1px solid var(--kungalgame-blue-2);
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}
.label {
  display: inline-block;
  width: 150px;
  margin: 8px 0;
}
.input-wrapper {
  padding: 4px 0;
  display: inline-flex;
}
.input {
  flex-grow: 1;
  background-color: var(--kungalgame-trans-white-9);
  font-size: 17px;
  border: 1px solid var(--kungalgame-blue-5);
  border-radius: 5px;
  color: var(--kungalgame-font-color-3);
}
.button-group {
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;
  button {
    height: 32px;
    width: 77px;
    margin: 0 5px;
    border-radius: 5px;
    transition: all 0.2s;
    color: var(--kungalgame-blue-5);
    border: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-white-9);
    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}
</style>
