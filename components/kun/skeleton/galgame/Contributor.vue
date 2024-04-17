<script setup lang="ts">
const count = 1
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
  height: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 17px;
}

ul {
  border-radius: 3px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  li {
    padding: 17px;
    background-image: linear-gradient(
      90deg,
      var(--kungalgame-trans-blue-0) 25%,
      var(--kungalgame-trans-blue-2) 37%,
      var(--kungalgame-trans-blue-0) 63%
    );
    border-radius: 3px;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    list-style: none;
    background-size: 400% 100%;
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
