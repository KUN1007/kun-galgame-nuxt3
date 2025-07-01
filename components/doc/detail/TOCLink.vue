<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

defineProps<{
  links: TocLink[]
  activeId: string | null
}>()

defineEmits<{
  'scroll-to': [id: string]
}>()

const getPaddingClass = (depth: number) => {
  switch (depth) {
    case 2:
      return 'pl-4'
    case 3:
      return 'pl-8'
    case 4:
      return 'pl-12'
    case 5:
      return 'pl-16'
    case 6:
      return 'pl-20'
    default:
      return ''
  }
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div class="flex max-w-56 flex-col" v-for="link in links" :key="link.id">
      <a
        :href="`#${link.id}`"
        @click="
          (e) => {
            e.preventDefault()
            $emit('scroll-to', link.id)
          }
        "
        :class="
          cn(
            'flex py-1 text-sm transition-all duration-200',
            getPaddingClass(link.depth),
            activeId === link.id
              ? 'text-primary text-base font-medium'
              : 'text-default-700 hover:text-primary'
          )
        "
      >
        {{ link.text }}
      </a>
      <DocDetailTOCLink
        v-if="link.children && link.children.length > 0"
        :links="link.children"
        :active-id="activeId"
        @scroll-to="(id) => $emit('scroll-to', id)"
      />
    </div>
  </div>
</template>
