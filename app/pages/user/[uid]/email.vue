<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useKunSeoMeta({
  title: '邮箱设置'
})
</script>

<template>
  <UserEmail />
</template>
