<script setup lang="ts">
import { userIconMap } from './navSortItem'
import type { UserSortFieldRanking, RankingUsers } from '~/types/api/ranking'

const props = defineProps<{
  field: UserSortFieldRanking
  users: RankingUsers[]
}>()

const users = computed(() => props.users)
</script>

<template>
  <div class="single-user" v-for="user in users" :key="user.uid">
    <NuxtLinkLocale :to="`/kungalgamer/${user.uid}/info`">
      <div class="info">
        <span class="avatar">
          <img
            v-if="user.avatar"
            :src="user.avatar.replace(/\.webp$/, '-100.webp')"
            :alt="user.name"
          />
        </span>
        <span class="name">{{ user.name }}</span>
      </div>

      <div class="detail">
        <Icon :name="userIconMap[props.field]" />
        <span>{{ Math.ceil(user.field) }}</span>
      </div>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="scss" scoped>
.single-user {
  a {
    flex-shrink: 0;
    height: 37px;
    margin: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--kungalgame-trans-pink-0);
    border: 2px solid var(--kungalgame-trans-pink-2);
    border-radius: 5px;
    color: var(--kungalgame-font-color-3);
    padding: 0 10px;
    cursor: pointer;

    &:hover {
      background-color: var(--kungalgame-trans-white-9);
      border: 2px solid var(--kungalgame-pink-4);
    }
  }
}

.info {
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .avatar {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
  }
  .name {
    margin-left: 10px;
  }
}

.detail {
  display: flex;
  align-items: center;
  color: var(--kungalgame-pink-4);
  span {
    color: var(--kungalgame-font-color-3);
    margin-left: 10px;
  }
}
</style>
