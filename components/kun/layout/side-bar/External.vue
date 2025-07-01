<script setup lang="ts">
import { kunLayoutExternalItem } from '~/constants/layout'
</script>

<template>
  <div class="mt-3 flex flex-col justify-center gap-1 p-3">
    <h2 class="text-default-700 px-4 select-none">子网站</h2>

    <KunLink
      color="default"
      underline="none"
      v-for="(item, index) in kunLayoutExternalItem"
      target="_blank"
      :to="item.router"
      :key="index"
      class-name="hover:bg-primary/20 gap-0 flex flex-nowrap items-center justify-between rounded-lg px-4 py-2 transition-all hover:opacity-80"
    >
      <span
        v-if="item.icon"
        class="mr-3 flex items-center justify-center text-xl text-inherit"
      >
        <KunIcon class="mr-3 text-inherit" :name="item.icon" />
        <span class="text-sm">{{ item.label }}</span>
      </span>

      <span class="text-primary text-xs" v-if="item.hint">
        {{ item.hint }}
      </span>
    </KunLink>
  </div>
</template>
