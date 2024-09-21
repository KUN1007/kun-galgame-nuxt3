<script setup lang="ts">
import { sitemap } from './utils/sitemap'
</script>

<template>
  <div class="container">
    <NuxtLink :to="`/`">{{ $t('home.route.homeEn') }}</NuxtLink>
    <NuxtLink :to="`/ja-jp`">{{ $t('home.route.homeJp') }}</NuxtLink>
    <NuxtLink :to="`/zh-cn`">{{ $t('home.route.homeZh') }}</NuxtLink>
    <NuxtLink :to="`/zh-tw`">{{ $t('home.route.homeTw') }}</NuxtLink>
    <NuxtLinkLocale
      v-for="(route, index) in sitemap"
      :key="index"
      :to="route.route"
    >
      {{ $t(`home.route.${route.name}`) }}
    </NuxtLinkLocale>
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
