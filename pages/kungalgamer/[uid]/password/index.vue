<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="article">
    <KungalgamerPassword />

    <span @click="router.push('/forgot')" class="forget">
      {{ $t('login.login.forget') }}
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
  text-decoration: none;
  color: var(--kungalgame-blue-4);
}

@media (max-width: 700px) {
  .article {
    font-size: small;
  }
}
</style>
