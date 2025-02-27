<script setup lang="ts">
useHead({
  title: `忘记密码 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content: '鲲 Galgame 忘记密码, 忘记密码找回'
    }
  ]
})
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="title">忘记密码</div>

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
  height: calc(100vh - 75px);
  width: 100vw;
  display: flex;
  color: var(--kungalgame-font-color-3);
}

.container {
  margin: auto;
  width: 360px;
}

.title {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  font-size: large;
  background-color: var(--kungalgame-blue-5);
  border-radius: 10px 10px 0 0;
  color: var(--kungalgame-white);
}

.nav {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

@media (max-width: 700px) {
  .root {
    min-height: calc(100dvh - 63px);
  }
}
</style>
