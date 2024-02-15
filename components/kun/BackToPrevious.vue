<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="return" @click="router.back()">
    <span>{{ `< ${$t('back.back')}` }}</span>
  </div>
</template>

<style lang="scss" scoped>
.return {
  color: var(--kungalgame-font-color-0);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.return:hover {
  color: var(--kungalgame-blue-5);
}
</style>
