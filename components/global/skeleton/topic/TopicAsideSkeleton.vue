<script setup lang="ts">
const count = 5
</script>

<template>
  <div v-for="(_, index) in count" :key="index" class="skeleton">
    <ul>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  margin-top: 7px;
  background-color: var(--kungalgame-trans-white-5);
  margin: 0 auto;
  padding: 12px;

  &:last-child {
    border-radius: 0 0 5px 5px;
  }
}

ul {
  padding: 0;
  margin: 0;
  width: 100%;

  li {
    background-image: linear-gradient(
      90deg,
      var(--kungalgame-trans-blue-2) 25%,
      var(--kungalgame-pink-0) 37%,
      var(--kungalgame-trans-blue-2) 63%
    );
    border-radius: 3px;
    width: 100%;
    height: 16px;
    list-style: none;
    background-size: 400% 100%;
    background-position: 100% 50%;
    animation: skeleton 1.7s ease infinite;

    &:first-child {
      margin-bottom: 4px;
    }
  }
}

@keyframes skeleton {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
