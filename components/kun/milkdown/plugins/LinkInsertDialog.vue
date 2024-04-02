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
  if (inputHref.value.length === 0) {
    return
  }
  const text = inputText.value.length === 0 ? inputHref.value : inputText.value
  emit('insert', inputHref.value, text)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="insert">
      <div
        class="mask"
        tabindex="0"
        @click="emit('cancel')"
        v-if="show"
        @keydown.enter="handleLinkInsert"
        @keydown.esc="emit('cancel')"
      >
        <div class="dialog" @click.stop>
          <h2 class="title">{{ $t('edit.topic.link.title') }}</h2>

          <input
            id="LinkURLInput"
            type="url"
            v-model="inputHref"
            :placeholder="`${$t('edit.topic.link.URLLabel')} (${exampleURL})`"
            class="input"
          />
          <input
            id="LinkTextInput"
            type="text"
            v-model="inputText"
            :placeholder="$t('edit.topic.link.textLabel')"
            class="input"
          />

          <div class="button-group">
            <button @click="emit('cancel')" class="cancel-btn">
              {{ $t('edit.topic.link.cancelInsert') }}
            </button>

            <button @click="handleLinkInsert" class="confirm-btn">
              {{ $t('edit.topic.link.confirmInsert') }}
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
  padding: 17px;
  background-color: var(--kungalgame-white);
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 17px;
  }
}

.input {
  background-color: var(--kungalgame-trans-white-9);
  border: 2px solid var(--kungalgame-trans-blue-2);
  border-radius: 5px;
  color: var(--kungalgame-font-color-3);
  padding: 8px;
  margin-bottom: 17px;

  &:focus {
    border: 2px solid var(--kungalgame-blue-5);
  }
}

.button-group {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;

  button {
    padding: 7px 17px;
    border-radius: 5px;
    color: var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-white-9);
    border: 1px solid var(--kungalgame-blue-5);

    &:last-child {
      margin-left: 10px;
    }

    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}

.insert-enter-from {
  opacity: 0;
}

.insert-leave-to {
  opacity: 0;
}

.insert-enter-from .container,
.insert-leave-to .container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media (max-width: 700px) {
  .dialog {
    margin: 0 17px;
  }
}
</style>
