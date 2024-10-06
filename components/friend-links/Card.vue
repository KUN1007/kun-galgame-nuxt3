<script setup lang="ts">
import { friendArray } from './friends'
</script>

<template>
  <template v-for="(friendGroup, index) in friendArray" :key="index">
    <KunDivider margin="17px" />

    <h2>
      {{ $t(`friends.${friendGroup.key}.name`) }}
    </h2>

    <div class="container">
      <a
        class="card"
        v-for="(friend, i) in friendGroup.value"
        :key="i"
        :href="friend.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="name">
          <span>{{ $t(`friends.${friendGroup.key}.${friend.name}`) }}</span>
          <span class="status" v-if="friend.status">
            {{ $t(`friends.status.${friend.status}`) }}
          </span>
        </div>
        <div class="label">
          {{
            friend.label.length > 107
              ? `${friend.label.slice(0, 107)}...`
              : friend.label
          }}
        </div>
        <NuxtImg :src="`/friends/${friend.name}.webp`" />
      </a>
    </div>
  </template>

  <NuxtLinkLocale class="join" to="/contact">
    <h3>{{ $t('friends.join') }}</h3>
    <p>{{ $t('friends.hint') }}</p>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 17px;
  padding: 17px 0;
}

.card {
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  padding: 10px;
  border-radius: 10px;
  color: var(--kungalgame-font-color-3);
  max-width: 269px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow);

    .name {
      color: var(--kungalgame-blue-5);
    }
  }

  .name {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: bold;

    .status {
      font-size: small;
      margin-left: 8px;
      font-weight: normal;
    }
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

@media (max-width: 700px) {
  .container {
    grid-template-columns: repeat(2, minmax(100px, 233px));
    gap: 7px;
  }

  .card {
    .name {
      font-size: 16px;
    }
  }
}
</style>
