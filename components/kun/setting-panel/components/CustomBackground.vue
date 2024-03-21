<script setup lang="ts">
const { showKUNGalgameBackground } = storeToRefs(useKUNGalgameSettingsStore())

const input = ref<HTMLElement>()

const handleCustomBackground = () => {
  input.value?.click()
}

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement

  if (!input.files || !input.files[0]) {
    return
  }

  const file = input.files[0]
  await useKUNGalgameSettingsStore().setCustomBackground(file)
}
</script>

<template>
  <div class="kungalgamer-bg">
    <input
      ref="input"
      hidden
      type="file"
      accept=".jpg, .jpeg, .png"
      @change="handleFileChange($event)"
    />
    <button @click="handleCustomBackground">
      {{ $t('header.settings.custom') }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.kungalgamer-bg {
  display: flex;
  flex-direction: column;

  button {
    font-size: 15px;
    cursor: pointer;
    height: 30px;
    width: 100%;
    color: var(--kungalgame-font-color-3);
    border: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-white-9);
    color: var(--kungalgame-blue-5);

    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}
</style>
