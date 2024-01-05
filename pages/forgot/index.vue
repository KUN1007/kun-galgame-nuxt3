<script setup lang="ts"></script>

<template>
  <div class="root">
    <div class="container">
      <div class="title">{{ $t('forgot.title') }}</div>

      <ForgotPassword />

      <div class="nav">
        <KunBackToPrevious />
        <KunBackToHome />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100vh;
  width: 100vw;
  display: flex;
  color: var(--kungalgame-font-color-3);
}

.container {
  margin: auto;
  width: 300px;
  height: 400px;
  background-color: var(--kungalgame-white);
  border-radius: 5px;
  box-shadow: var(--shadow);
}

.title {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  font-size: large;
  background-color: var(--kungalgame-blue-4);
  border-radius: 5px 5px 0 0;
  color: var(--kungalgame-white);
}

.nav {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>
