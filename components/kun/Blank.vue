<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <div class="blank">
    <div class="container">
      <h1>
        <slot />
      </h1>
      <button @click="navigateTo(localePath('/'))">
        {{ $t('kungalgame.home') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blank {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 300px;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  will-change: transform;
  border-radius: 5px;

  h1 {
    color: var(--kungalgame-red-5);
  }

  button {
    cursor: pointer;
    margin-top: 20px;
    border: 1px solid var(--kungalgame-blue-5);
    padding: 7px 50px;
    border-radius: 5px;
    color: var(--kungalgame-blue-5);
    background-color: transparent;

    &:hover {
      background-color: var(--kungalgame-blue-5);
      color: var(--kungalgame-white);
    }
  }
}
</style>
