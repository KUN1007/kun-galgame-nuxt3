<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()

const uid = parseInt((route.params as { uid: string }).uid)

useKunSeoMeta({
  title: '私信'
})
</script>

<template>
  <div class="h-full w-full pl-3">
    <ClientOnly>
      <MessagePmHeader :id="uid" />
    </ClientOnly>

    <MessagePmContainer :user-id="uid" />
  </div>
</template>
