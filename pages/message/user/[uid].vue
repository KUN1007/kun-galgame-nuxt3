<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()

const uid = parseInt((route.params as { uid: string }).uid)
</script>

<template>
  <div class="h-full w-full pl-3">
    <ClientOnly>
      <MessagePmHeader :uid="uid" />
    </ClientOnly>

    <MessagePmContainer :uid="uid" />
  </div>
</template>
