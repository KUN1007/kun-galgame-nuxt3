<script setup lang="ts"></script>

<template>
  <div class="footer">
    <EditTopicTags />

    <p class="hint">请选择分类和分区</p>
    <div class="partition">
      <EditTopicCategory />
      <EditTopicSection />
    </div>

    <EditInfoNotice />

    <EditTopicButton />

    <NuxtLink to="/topic/1712">
      请不要在话题中发布除了 Galgame 以外的 R18 黄游 (例如: SLG) 资源
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.hint {
  margin-top: 17px;
  margin-bottom: 10px;
}

.partition {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

a {
  margin: 16px 0;
  color: var(--kungalgame-blue-5);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
