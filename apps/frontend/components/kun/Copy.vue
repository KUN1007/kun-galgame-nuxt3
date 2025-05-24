<script setup lang="ts">
import type {
  KunUIVariant,
  KunUIColor,
  KunUISize,
  KunUIRounded
} from './ui/type'

interface KunCopyProps {
  text: string
  name?: string
  variant?: KunUIVariant
  color?: KunUIColor
  size?: KunUISize
  rounded?: KunUIRounded
  className?: string
}

withDefaults(defineProps<KunCopyProps>(), {
  name: '',
  variant: 'light',
  color: 'primary',
  size: 'md',
  rounded: 'lg',
  className: ''
})
</script>

<template>
  <KunButton
    :variant="variant"
    :color="color"
    :size="size"
    :rounded="rounded"
    :class-name="cn('gap-2', className)"
    @click="useKunCopy(text)"
  >
    <span>{{ decodeIfEncoded(name ? name : text) }}</span>
    <KunIcon name="lucide:copy" />
  </KunButton>
</template>
