<script setup lang="ts">
const colorMode = useColorMode()
const { showKUNGalgamePageTransparency } = storeToRefs(
  usePersistSettingsStore()
)

interface Mode {
  name: string
  icon: string
}

const modeItem: Mode[] = [
  {
    name: 'light',
    icon: 'line-md:moon-filled-alt-to-sunny-filled-loop-transition'
  },
  {
    name: 'dark',
    icon: 'line-md:sunny-outline-to-moon-loop-transition'
  },
  {
    name: 'system',
    icon: 'line-md:light-dark-loop'
  }
]

watch(
  () => colorMode.value,
  () => {
    usePersistSettingsStore().setKUNGalgameTransparency(
      showKUNGalgamePageTransparency.value
    )
  }
)
</script>

<template>
  <div class="flex items-center justify-between">
    <span>模式切换</span>
    <div class="flex items-center gap-2">
      <span
        v-for="(mode, index) in modeItem"
        :key="index"
        :class="
          cn(
            'flex rounded-lg p-2 transition-colors',
            $colorMode.preference === mode.name
              ? 'bg-primary-50 text-primary'
              : ''
          )
        "
      >
        <KunIcon
          class="text-inherit"
          :name="mode.icon"
          @click="$colorMode.preference = mode.name"
        />
      </span>
    </div>
  </div>
</template>
