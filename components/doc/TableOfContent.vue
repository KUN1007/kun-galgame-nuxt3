<script setup lang="ts">
defineProps({
  toc: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="sticky top-0">
    <h3 class="mb-4 text-lg font-semibold">页面目录</h3>
    <nav v-if="toc && toc.links" class="toc">
      <ul class="space-y-2">
        <li v-for="link in toc.links" :key="link.id" class="toc-link">
          <NuxtLink
            :to="`#${link.id}`"
            class="block py-1 text-gray-600 hover:text-gray-900"
            :class="{ 'pl-4': link.depth === 2, 'pl-8': link.depth === 3 }"
          >
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
