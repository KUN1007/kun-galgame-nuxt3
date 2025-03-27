<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useKunSeoMeta({
  title: '密码设置'
})
</script>

<template>
  <UserPassword />
</template>
