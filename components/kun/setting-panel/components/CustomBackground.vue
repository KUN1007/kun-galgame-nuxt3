<script setup lang="ts">
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
  await usePersistSettingsStore().setCustomBackground(file)
}
</script>

<template>
  <div>
    <input
      ref="input"
      hidden
      type="file"
      accept=".jpg, .jpeg, .png"
      @change="handleFileChange($event)"
    />
    <KunButton
      color="primary"
      variant="flat"
      size="sm"
      @click="handleCustomBackground"
    >
      自定义
    </KunButton>
  </div>
</template>
