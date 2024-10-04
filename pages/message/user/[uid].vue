<script setup lang="ts">
definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const route = useRoute()

const uid = parseInt((route.params as { uid: string }).uid)
</script>

<template>
  <ClientOnly>
    <MessagePmHeader :uid="uid" />
  </ClientOnly>

  <MessagePmContainer :uid="uid" />
</template>

<style lang="scss" scoped></style>
