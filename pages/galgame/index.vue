<script setup lang="ts">
const { page, limit, sortOrder } = storeToRefs(usePersistGalgameStore())

const { data } = await useFetch(`/api/galgame`, {
  method: 'GET',
  query: { page, limit, sortOrder },
  watch: false,
  ...kungalgameResponseHandler
})
</script>

<template>
  <div class="root">
    <div class="nav">
      <div>
        <span>平台</span>
        <span>类型</span>
        <span>语言</span>
      </div>

      <span>升序降序</span>
    </div>

    <GalgameCard v-if="data" :data="data" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 64rem;
  margin: 0 auto;
  color: var(--kungalgame-font-color-3);
}
</style>
