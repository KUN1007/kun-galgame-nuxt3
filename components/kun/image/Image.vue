<script setup lang="ts">
interface KunImageProps {
  src: string
  alt?: string
  loading?: 'lazy' | 'eager'
  placeholder?: string | number | boolean | unknown[]
  className?: string
  ariaLabel?: string
  format?: string
  quality?: string | number
  width?: string | number
  height?: string | number
  preload?:
    | boolean
    | {
        fetchPriority: 'auto' | 'high' | 'low'
      }
}

const { showKUNGalgameBackground } = storeToRefs(usePersistSettingsStore())

withDefaults(defineProps<KunImageProps>(), {
  alt: 'image',
  loading: undefined,
  placeholder: undefined,
  className: undefined,
  ariaLabel: undefined,
  format: undefined,
  quality: undefined,
  width: undefined,
  height: undefined,
  preload: undefined
})
</script>

<template>
  <NuxtImg
    :class="cn('', showKUNGalgameBackground && 'opacity-80', className)"
    :src="src"
    :alt="alt"
    :loading="loading"
    :placeholder="placeholder"
    :aria-label="ariaLabel"
    :format="format"
    :quality="quality"
    :width="width"
    :height="height"
    :preload="preload"
  />
</template>
