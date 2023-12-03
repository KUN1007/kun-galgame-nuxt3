<script setup lang="ts"></script>

<template>
  <div class="skeleton">
    <div class="container">
      <span></span>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  margin-top: 30px;
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
}

.container {
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 3px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  display: flex;

  span {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
    background-color: var(--kungalgame-trans-blue-2);
    margin-right: 20px;
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
    height: 17px;
    list-style: none;
    background-size: 400% 100%;
    margin-top: 10px;
    background-position: 100% 50%;
    animation: skeleton 1.7s ease infinite;

    &:first-child {
      margin-top: 0;
      height: 30px;
      width: 23%;
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
