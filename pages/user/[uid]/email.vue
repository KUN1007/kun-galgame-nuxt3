<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useKunDisableSeo('邮箱设置')
</script>

<template>
  <UserEmail />
</template>
