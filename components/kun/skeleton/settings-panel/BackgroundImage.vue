<script setup lang="ts"></script>

<template>
  <div class="skeleton">
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  position: absolute;
  width: 70px;
  height: 40px;
  display: flex;
  justify-content: center;
}

ul {
  margin: 0;
  padding: 0;
  background-color: var(--kungalgame-trans-white-5);
  width: 100%;
  height: 100%;

  li {
    background-image: linear-gradient(
      90deg,
      var(--kungalgame-trans-blue-2) 25%,
      var(--kungalgame-pink-0) 37%,
      var(--kungalgame-trans-blue-2) 63%
    );
    width: 100%;
    height: 100%;
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
