<script setup lang="ts"></script>

<template>
  <NuxtLink to="/" class="return">
    <Icon class="icon" name="line-md:home-md-twotone" />
    <span>{{ $t('back.home') }}</span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.return {
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
