<script setup lang="ts">
import { sitemap } from './utils/sitemap'
</script>

<template>
  <div class="container">
    <NuxtLink v-for="(route, index) in sitemap" :key="index" :to="route.route">
      {{ route.label }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;

  a {
    margin: 5px 10px;
    color: var(--kungalgame-blue-5);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>
