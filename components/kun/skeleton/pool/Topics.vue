<script setup lang="ts">
const count = 24
</script>

<template>
  <div v-for="(_, index) in count" :key="index" class="skeleton">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  border-radius: 3px;
  margin: 0 auto;
  padding: 12px;
}

ul {
  padding: 0;
  margin: 0;
  width: 100%;

  li {
    background-image: linear-gradient(
      90deg,
      var(--kungalgame-trans-blue-0) 25%,
      var(--kungalgame-trans-blue-2) 37%,
      var(--kungalgame-trans-blue-0) 63%
    );
    border-radius: 3px;
    width: 100%;
    height: 16px;
    list-style: none;
    background-size: 400% 100%;
    margin-top: 10px;
    background-position: 100% 50%;
    animation: skeleton 1.7s ease infinite;

    &:first-child {
      margin-top: 0;
      width: 50%;
      height: 30px;
    }

    &:last-child {
      width: 77%;
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
