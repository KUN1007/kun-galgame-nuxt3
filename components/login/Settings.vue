<script setup lang="ts"></script>

<template>
  <div class="settings">
    <span class="home">
      <NuxtLinkLocale to="/">
        <Icon class="icon" name="line-md:home-md-twotone" />
      </NuxtLinkLocale>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  width: 100%;
  color: var(--kungalgame-font-color-2);
  position: absolute;
  font-size: 20px;
  padding: 17px;

  .home {
    margin-left: 17px;
    .icon {
      color: var(--kungalgame-purple-4);
    }
  }
}

@media (max-width: 700px) {
  .settings {
    padding-top: 50px;
  }
}
</style>
