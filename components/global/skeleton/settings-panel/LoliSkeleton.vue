<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="skeleton">
    <ul>
      <li><Icon icon="line-md:image" /></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  position: absolute;
  top: 320px;
  left: 140px;
  width: 309px;
  height: 600px;
  display: flex;
  justify-content: center;
}

ul {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  li {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 77px;
    color: var(--kungalgame-blue-4);
  }
}
</style>
