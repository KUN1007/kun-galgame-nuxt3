<script setup lang="ts">
const props = defineProps<{
  id: number
}>()

// const socket = useSocketIO()

const res = await $fetch(`/api/user/${props.id}`, {
  method: 'GET',
  query: { userId: props.id },
  ...kungalgameResponseHandler
})

const user = {
  id: props.id,
  name: typeof res !== 'string' ? res.name : '',
  avatar: typeof res !== 'string' ? res.avatar : ''
}

// const handleReload = () => location.reload()
</script>

<template>
  <header class="flex items-center gap-2">
    <KunButton size="lg" :is-icon-only="true" variant="light" href="/message">
      <KunIcon name="lucide:chevron-left" />
    </KunButton>

    <KunAvatar :disable-floating="true" :user="user" />

    <h2 class="relative flex items-center gap-2">
      <span>{{ user.name }}</span>
      <!-- <span
        class="absolute -right-6 h-4 w-4 rounded-full"
        :class="socket.connected ? 'bg-success' : 'bg-default'"
      />
      <span
        class="flex cursor-pointer items-center space-x-1 text-base"
        v-if="!socket.connected"
        @click="handleReload"
      >
        <span>您已离线</span>
        <KunIcon name="lucide:refresh-ccw" />
      </span> -->
    </h2>
  </header>
</template>
