<script setup lang="ts"></script>

<template>
  <div class="list">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.list {
  width: 100%;
  padding: 7px 17px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scrollbar-width: thin;
}
</style>
