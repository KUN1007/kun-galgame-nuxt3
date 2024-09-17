<script setup lang="ts">
import dayjs from 'dayjs'
import type { SearchResultUser } from '~/types/api/search'

defineProps<{
  user: SearchResultUser
}>()
</script>

<template>
  <NuxtLinkLocale :to="`/kungalgamer/${user.uid}/info`" v-kun-gradient>
    <div class="info">
      <KunAvatar :user="user" size="30px" />
      <span>{{ user.name }}</span>
    </div>
    <div class="bio" v-if="user.bio">
      <pre>{{ user.bio }}</pre>
    </div>
    <div class="addition">
      <span class="moemoepoint">
        <span><Icon name="lucide:lollipop"></Icon></span>
        <span>{{ user.moemoepoint }}</span>
      </span>
      <span>{{ dayjs(user.time).format('YYYY/MM/DD') }}</span>
    </div>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
a {
  display: flex;
  flex-direction: column;
  color: var(--kungalgame-font-color-3);
  padding: 10px;
  border-radius: 10px;
}

.info {
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
  }
}

.bio {
  margin-top: 7px;

  pre {
    display: block;
    width: 100%;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
    overflow-wrap: break-word;
  }
}

.addition {
  margin-top: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: small;

  .moemoepoint {
    display: flex;
    align-items: center;
    margin-left: 5px;
    font-weight: bold;
    color: var(--kungalgame-pink-4);

    .icon {
      font-size: 20px;
      margin-right: 5px;
    }
  }
}
</style>
