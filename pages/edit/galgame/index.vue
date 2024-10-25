<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'prevent']
})

const type = useRequestURL().searchParams.get('type')
</script>

<template>
  <div class="root">
    <EditGalgame v-if="type === 'publish'" />
    <EditGalgamePrPullRequest v-if="type === 'pr'" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 80rem;
  margin: 0 auto;
  color: var(--kungalgame-font-color-3);
}
</style>
