<script setup lang="ts"></script>

<template>
  <h2>{{ $t('edit.galgame.banner.name') }}</h2>
  <KunUpload class="upload" width="300px" :aspect="16 / 9" />
</template>

<style lang="scss" scoped>
.upload {
  margin-bottom: 17px;
}
</style>
