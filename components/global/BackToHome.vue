<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <RouterLink to="/kun" class="return">
    <Icon class="icon" icon="line-md:home-md-twotone" />
    <span>{{ $tm('back.home') }}</span>
  </RouterLink>
</template>

<style lang="scss" scoped>
.return {
  position: absolute;
  bottom: 1%;
  right: 2%;
  color: var(--kungalgame-font-color-0);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    font-size: 18px;
    margin-right: 5px;
  }
}

.return:hover {
  color: var(--kungalgame-blue-4);
}
</style>
