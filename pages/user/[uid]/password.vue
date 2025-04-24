<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useKunDisableSeo('密码设置')
</script>

<template>
  <UserPassword />
</template>
