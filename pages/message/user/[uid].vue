<script setup lang="ts">
definePageMeta({
  layout: 'message',
  middleware: 'auth'
})

const route = useRoute()

const uid = parseInt((route.params as { uid: string }).uid)
</script>

<template>
  <div class="h-full w-full">
    <ClientOnly>
      <MessagePmHeader :uid="uid" />
    </ClientOnly>

    <MessagePmContainer :uid="uid" />
  </div>
</template>
