<script setup lang="ts"></script>

<template>
  <div class="footer">
    <EditTopicTags />

    <p class="hint">{{ $t('edit.topic.categories') }}</p>
    <div class="partition">
      <EditTopicCategory />
      <EditTopicSection />
    </div>

    <EditInfoNotice />

    <EditTopicButton />
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
</style>
