<script setup lang="ts"></script>

<template>
  <KunHeader :size="1">
    <template #header>更新请求</template>
  </KunHeader>

  <EditGalgameSite />

  <div class="help">
    <p>要更新 Galgame 信息, 需要提出更新請求</p>
    <p>
      當該請求被該 Galgame 資源的發佈者、或萌萌點大於 1100
      的用戶、或論壇管理員確認合併後, 該更新才會生效
    </p>
    <p>
      若請求更新被合併, 將獲得 1 萌萌點, 請求提出者和審核者會被加入貢獻者中,
      自己修改不計
    </p>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
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
