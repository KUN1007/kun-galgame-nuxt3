<script setup lang="ts"></script>

<template>
  <NuxtLinkLocale to="/" class="return">
    <Icon class="icon" name="lucide:home" />
    <span>{{ $t('back.home') }}</span>
  </NuxtLinkLocale>
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
  color: var(--kungalgame-blue-5);
}
</style>
