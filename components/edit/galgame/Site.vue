<script setup lang="ts">
import { referenceSiteList } from '~/constants/edit'
</script>

<template>
  <div>
    <p class="text-default-500">
      如果您不知道在哪里寻找 Galgame 信息, 我们推荐下面的几个网站
    </p>

    <div class="flex items-center gap-3">
      <a
        v-for="(site, index) in referenceSiteList"
        :key="index"
        :href="site.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary inline-flex flex-wrap items-center gap-2 underline-offset-3 hover:underline"
      >
        {{ site.label }}
      </a>
    </div>
  </div>
</template>
