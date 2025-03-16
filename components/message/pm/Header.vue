<script setup lang="ts">
const props = defineProps<{
  uid: number
}>()

const socket = useSocketIO()

const res = await $fetch(`/api/user/${props.uid}`, {
  method: 'GET',
  ...kungalgameResponseHandler
})

const user = {
  uid: props.uid,
  name: typeof res !== 'string' ? res.name : '',
  avatar: typeof res !== 'string' ? res.avatar : ''
}

const handleReload = () => location.reload()
</script>

<template>
  <header class="flex items-center gap-2">
    <KunButton size="lg" :is-icon-only="true" variant="light" href="/message">
      <Icon name="lucide:chevron-left" />
    </KunButton>

    <KunAvatar :user="user" />

    <h2 class="relative flex items-center">
      <span>{{ user.name }}</span>
      <span
        class="absolute -right-6 h-4 w-4 rounded-full"
        :class="socket.connected ? 'bg-success' : 'bg-default'"
      />
      <span
        class="gap-2 text-base"
        v-if="!socket.connected"
        @click="handleReload"
      >
        <span>您已离线</span>
        <Icon name="lucide:refresh-ccw" />
      </span>
    </h2>
  </header>
</template>
