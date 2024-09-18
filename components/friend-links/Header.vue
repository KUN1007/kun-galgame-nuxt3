<script setup lang="ts"></script>

<template>
  <div class="header">
    <KunHeader :size="1">
      <template #header>
        {{ $t('friends.name') }}
      </template>
    </KunHeader>

    <p>
      {{ $t('friends.proud') }}
    </p>
    <p>
      {{ $t('friends.honor') }}
    </p>
    <b>{{ $t(`friends.note`) }}</b>
  </div>
</template>

<style lang="scss" scoped>
.header {
  p {
    margin-bottom: 10px;
  }
}
</style>
