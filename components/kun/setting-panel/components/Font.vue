<script setup lang="ts">
const font = ref('')
const { showKUNGalgameFontStyle } = storeToRefs(usePersistSettingsStore())

const setFont = () => {
  if (font.value) {
    usePersistSettingsStore().setKUNGalgameFontStyle(font.value)
    font.value = ''
  } else {
    usePersistSettingsStore().setKUNGalgameFontStyle('system-ui')
  }
}
</script>

<template>
  <div class="font">
    <div class="title">
      <span>{{ $t('header.settings.font') }}</span>
      <span v-if="showKUNGalgameFontStyle === 'system-ui'">
        {{ $t('header.settings.default') }}
      </span>
      <span v-else-if="showKUNGalgameFontStyle !== 'system-ui'">
        {{ showKUNGalgameFontStyle }}
      </span>
    </div>

    <div class="font-input">
      <input
        :placeholder="`${$t('header.settings.fontInput')}`"
        type="text"
        v-model="font"
        required
      />
      <button @click="setFont">
        {{ $t('header.settings.confirm') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.font-input {
  display: flex;
  height: 30px;
  border: 1px solid var(--kungalgame-blue-5);
  color: var(--kungalgame-font-color-3);
  margin-bottom: 10px;

  input {
    flex: 1;
    width: 0;
    padding-left: 7px;
    border: none;
    background-color: transparent;
    color: var(--kungalgame-font-color-3);

    &:focus {
      outline: none;
      background-color: var(--kungalgame-trans-blue-0);
    }
  }

  button {
    width: 70px;
    color: var(--kungalgame-font-color-3);
    border: none;
    border-left: inherit;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: var(--kungalgame-blue-5);
      color: var(--kungalgame-white);
    }
  }
}
</style>
