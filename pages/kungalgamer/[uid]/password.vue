<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const localePath = useLocalePath()
</script>

<template>
  <div class="article">
    <KungalgamerPassword />

    <span @click="navigateTo(localePath('/forgot'))" class="forget">
      {{ $t('login.forgot') }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.article {
  width: 100%;
  height: 100%;
  padding: 10px 17px;
}

.forget {
  font-size: medium;
  cursor: pointer;
  color: var(--kungalgame-blue-5);
}
</style>
