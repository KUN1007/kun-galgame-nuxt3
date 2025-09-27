<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'

import ImageComponent from '#build/mdc-image-component.mjs'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'nuxt-img'
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(
      withTrailingSlash(useRuntimeConfig().app.baseURL)
    )
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})
</script>

<template>
  <component
    :is="type === 'nuxt-img' ? ImageComponent : 'img'"
    :src="refinedSrc"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    data-kun-lazy-image
  />
</template>
