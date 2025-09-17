<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

useKunDisableSeo('重新编辑工具信息')
</script>

<template>
  <EditToolsetRewrite />
</template>
