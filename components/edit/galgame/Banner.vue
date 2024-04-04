<script setup lang="ts"></script>

<template>
  <KunHeader :size="2" :show-help="true">
    <template #header>{{ $t('edit.galgame.banner.name') }}</template>

    <template #help>{{ $t('edit.galgame.banner.help') }}</template>
  </KunHeader>
  <KunUpload class="upload" width="300px" :size="1920" :aspect="16 / 9" />
</template>

<style lang="scss" scoped>
.upload {
  margin-bottom: 17px;
}
</style>
