<script setup lang="ts">
const route = useRoute()
const id = Number(route.params.id)

useKunSeoMeta({ title: '工具详情' })
</script>

<template>
  <ToolsetDetail :id="id" />
</template>

