<script setup lang="ts"></script>

<template>
  <div class="settings">
    <span class="light" v-show="$colorMode.preference === 'dark'">
      <Icon
        class="sun"
        name="line-md:moon-filled-alt-to-sunny-filled-loop-transition"
        @click="$colorMode.preference = 'light'"
      />
    </span>

    <span class="dark" v-show="$colorMode.preference === 'light'">
      <Icon
        class="moon"
        name="line-md:sunny-outline-to-moon-loop-transition"
        @click="$colorMode.preference = 'dark'"
      />
    </span>

    <span class="home">
      <NuxtLink to="/">
        <Icon class="icon" name="line-md:home-md-twotone" />
      </NuxtLink>
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

  span {
    cursor: pointer;
  }

  .light {
    color: var(--kungalgame-red-4);
  }

  .dark {
    color: var(--kungalgame-blue-4);
  }

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
