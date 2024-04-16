<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <KunHeader :size="1">
    <template #header>提出更新请求</template>
  </KunHeader>

  <EditGalgameSite />

  <div class="help">
    <p>要更新 Galgame 信息, 需要提出更新请求</p>
    <p>
      当该请求被该 Galgame 资源的发布者、或萌萌点大于 1100
      的用户、或论坛管理员确认合并后, 该更新才会生效
    </p>
    <p>若请求更新被合并, 将获得 1 萌萌点, 请求提出者和审核者会被加入贡献者中</p>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: var(--kungalgame-trans-white-5);
  box-shadow: var(--kungalgame-shadow-0);
  backdrop-filter: blur(10px);
  padding: 17px;
}

.help {
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 17px;
  margin-bottom: 17px;
  font-size: small;

  p {
    margin-bottom: 7px;
  }
}
</style>
