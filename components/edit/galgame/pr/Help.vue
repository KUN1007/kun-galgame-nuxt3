<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <KunHeader :size="1">
    <template #header>提出更新请求</template>
  </KunHeader>

  <EditGalgameSite />

  <div class="help" v-if="locale === 'en-us'">
    <p>
      To update visualnovel information, you need to submit an update request.
    </p>
    <p>
      When this request is confirmed for merge by the publisher of the
      visualnovel resource, a user with more than 1100 MoeMoePoints, or a forum
      administrator, the update will take effect.
    </p>
    <p>
      If the update request is merged, you will receive 1 MoeMoePoint. The
      requester and reviewer will be added to the contributors, but
      self-modifications are not counted.
    </p>
  </div>

  <div class="help" v-if="locale === 'zh-cn'">
    <p>要更新 Galgame 信息, 需要提出更新请求</p>
    <p>
      当该请求被该 Galgame 资源的发布者、或萌萌点大于 1100
      的用户、或论坛管理员确认合并后, 该更新才会生效
    </p>
    <p>
      若请求更新被合并, 将获得 1 萌萌点, 请求提出者和审核者会被加入贡献者中,
      自己修改不计
    </p>
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
