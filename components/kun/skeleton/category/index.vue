<script setup lang="ts">
const count = 5
</script>

<template>
  <div class="skeleton">
    <ul>
      <li v-for="(_, index) in count" :key="index"></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  width: 100%;
  display: flex;
  justify-content: center;
}

ul {
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 3px;
  margin: 0 auto;
  padding: 10px;
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
    height: 77px;
    list-style: none;
    background-size: 400% 100%;
    margin-top: 20px;
    background-position: 100% 50%;
    animation: skeleton 1.7s ease infinite;
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
