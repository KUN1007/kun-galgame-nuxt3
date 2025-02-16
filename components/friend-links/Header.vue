<script setup lang="ts"></script>

<template>
  <div class="header">
    <KunHeader :size="1">
      <template #header>友情链接</template>
    </KunHeader>

    <p>
      我们非常重视合作, 因为在我们网站的建设过程中, 受到了来自世界各地朋友的帮助
    </p>
    <p>
      我们与下面的网站都是朋友关系, 我们衷心的为能和这些网站成为朋友感到荣幸
    </p>
    <b>如果下列网站出现了任何的付费行为, 请随时联系我们撤销友情链接!</b>
  </div>
</template>

<style lang="scss" scoped>
.header {
  p {
    margin-bottom: 10px;
  }
}
</style>
