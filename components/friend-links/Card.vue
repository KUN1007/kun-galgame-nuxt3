<script setup lang="ts">
import { friends } from './friends'
</script>

<template>
  <div class="container">
    <a
      class="card"
      v-for="(friend, index) in friends"
      :key="index"
      :href="friend.link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div class="name">{{ $t(`friends.${friend.name}`) }}</div>
      <div class="label">{{ friend.label.slice(0, 107) }}</div>
      <NuxtImg :src="`/friends/${friend.name}.webp`" />
    </a>

    <NuxtLinkLocale class="join" to="/contact">
      <h3>{{ $t('friends.join') }}</h3>
      <p>{{ $t('friends.hint') }}</p>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 17px;
  padding: 17px;
}

.card {
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  padding: 10px;
  border-radius: 10px;
  color: var(--kungalgame-font-color-3);

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow);

    .name {
      color: var(--kungalgame-blue-5);
    }
  }

  .name {
    display: flex;
    font-size: 20px;
    font-weight: bold;
  }

  .label {
    font-size: small;
    margin: 10px 0;
  }
}

.join {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--kungalgame-font-color-0);

  h3 {
    color: var(--kungalgame-blue-5);
    font-size: 20px;
  }

  p {
    font-size: small;
    text-align: center;
  }
}
</style>
