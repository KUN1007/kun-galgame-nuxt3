<script setup lang="ts"></script>

<template>
  <HomePinned />
  <KunDivider margin="10px" />
  <h2>{{ $t('home.updates') }}</h2>
  <HomeRecent />
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 10px;
}
</style>
