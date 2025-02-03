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

    <NuxtLink to="/topic/1712">
      {{ $t('edit.topic.note') }}
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
