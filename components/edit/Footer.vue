<script setup lang="ts"></script>

<template>
  <div class="footer">
    <EditTags />

    <p class="hint">{{ $t('edit.categories') }}</p>
    <div class="partition">
      <EditCategory />
      <EditSection />
    </div>

    <EditButton />
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 10px;
  padding-top: 17px;
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
