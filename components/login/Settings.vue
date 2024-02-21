<script setup lang="ts"></script>

<template>
  <div class="settings">
    <span class="home">
      <NuxtLinkLocale to="/">
        <Icon class="icon" name="line-md:home-md-twotone" />
      </NuxtLinkLocale>
    </span>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.settings {
  width: 100%;
  color: var(--kungalgame-font-color-2);
  position: absolute;
  padding: 17px 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .home {
    font-size: 20px;
    .icon {
      color: var(--kungalgame-purple-4);
    }
  }
}
</style>
