<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { userIconMap } from './navSortItem'
import type { RankingUsers } from '@/api'

const props = defineProps<{
  field: string
  users: RankingUsers[]
}>()

const users = computed(() => props.users)

// Convert the incoming data to numbers
const parseTopicNumber = (field: string | string[]) => {
  return Array.isArray(field) ? field.length : Math.ceil(parseInt(field))
}
</script>

<template>
  <TransitionGroup name="list">
    <div class="single-user" v-for="user in users" :key="user.uid">
      <RouterLink :to="`/kungalgamer/${user.uid}/info`">
        <div class="info">
          <span class="avatar">
            <!-- Using a compressed 100px image -->
            <img
              v-if="user.avatar"
              :src="user.avatar.replace(/\.webp$/, '-100.webp')"
              :alt="user.name"
            />
          </span>
          <span class="name">{{ user.name }}</span>
        </div>

        <!-- User's other information -->
        <div class="detail">
          <Icon :icon="userIconMap[props.field]" />
          <span>{{ parseTopicNumber(user.field) }}</span>
        </div>
      </RouterLink>
    </div>
  </TransitionGroup>
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
    border: 1px solid var(--kungalgame-trans-pink-2);
    border-radius: 5px;
    color: var(--kungalgame-font-color-3);
    padding: 0 10px;
    cursor: pointer;

    &:hover {
      transition: all 0.5s;
      background-color: var(--kungalgame-trans-white-9);
      border: 1px solid var(--kungalgame-pink-4);
      color: var(--kungalgame-pink-4);
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

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
