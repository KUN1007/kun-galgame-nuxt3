<script setup lang="ts">
import { kunLayoutExternalItem } from '~/constants/layout'
</script>

<template>
  <div class="mt-3 flex flex-col justify-center gap-1 border-b p-3">
    <h2 class="text-default-700 px-4 select-none">子网站</h2>

    <a
      v-for="(item, index) in kunLayoutExternalItem"
      target="_blank"
      :href="item.router"
      :key="index"
      class="hover:bg-primary/20 flex items-center justify-between rounded-lg px-4 py-2 transition-all hover:opacity-80"
    >
      <span
        v-if="item.icon"
        class="mr-3 flex items-center justify-center text-xl text-inherit"
      >
        <Icon class="mr-3 text-inherit" :name="item.icon" />
        <span class="text-sm">{{ item.label }}</span>
      </span>

      <span class="text-primary text-xs" v-if="item.hint">
        {{ item.hint }}
      </span>
    </a>
  </div>
</template>
