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
  position: absolute;
  bottom: 1%;
  left: 2%;
  color: var(--kungalgame-font-color-0);
  cursor: pointer;
}

.return:hover {
  color: var(--kungalgame-blue-4);
}
</style>
