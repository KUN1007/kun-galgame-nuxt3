<script setup lang="ts">
import { referenceSiteList } from '~/constants/edit'
</script>

<template>
  <div>
    <p class="text-default-500">
      如果您不知道在哪里寻找 Galgame 信息, 我们推荐下面的几个网站
    </p>

    <div class="flex items-center gap-3">
      <KunLink
        v-for="(site, index) in referenceSiteList"
        :key="index"
        :to="site.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ site.label }}
      </KunLink>
    </div>
  </div>
</template>
