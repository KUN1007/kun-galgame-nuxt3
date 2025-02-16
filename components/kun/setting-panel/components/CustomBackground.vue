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
  <div class="kungalgamer-bg">
    <input
      ref="input"
      hidden
      type="file"
      accept=".jpg, .jpeg, .png"
      @change="handleFileChange($event)"
    />
    <span class="custom" @click="handleCustomBackground">
      <span class="custom-pc">自定义</span>
      <span class="custom-mobile">自定义背景</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.kungalgamer-bg {
  display: flex;
  flex-direction: column;

  .custom {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: var(--shadow);
    color: var(--kungalgame-font-color-3);
    transition: all 0.2s;

    @include kun-center;

    &:hover {
      color: var(--kungalgame-blue-5);
      background-color: var(--kungalgame-trans-blue-0);
    }
  }
}

.custom-mobile {
  display: none;
}

@media (max-width: 700px) {
  .custom-pc {
    display: none;
  }

  .custom-mobile {
    display: block;
  }
}
</style>
