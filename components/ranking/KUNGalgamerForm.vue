<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import KUNGalgamer from './KUNGalgamer.vue'

import { useTempRankingStore } from '@/store/temp/ranking'
import { storeToRefs } from 'pinia'

import type { RankingUsers } from '@/api'
import { userSortItem, userIconMap } from './navSortItem'

const { user } = storeToRefs(useTempRankingStore())
const users = ref<RankingUsers[]>([])
// Ascending or descending order
const isAscending = ref(false)

// Get users
const getUsers = async () => {
  const responseData = await useTempRankingStore().getUsers()
  return responseData.data
}

// Listen for new users when user data changes
watch(
  () => user,
  async () => {
    users.value = await getUsers()
  },
  { deep: true }
)

// Fetch users when the component is mounted
onMounted(async () => {
  users.value = await getUsers()
})

// Toggle the sorting order
const handleClickSortOrder = () => {
  isAscending.value = !isAscending.value
  if (isAscending.value) {
    user.value.sortOrder = 'asc'
  } else {
    user.value.sortOrder = 'desc'
  }
}
</script>

<template>
  <div class="user">
    <div class="title">{{ $tm('ranking.user') }}</div>
    <div class="nav">
      <div class="order" @click="handleClickSortOrder">
        <Transition name="order" mode="out-in">
          <div v-if="isAscending">
            <span>{{ $tm('ranking.asc') }}</span>
            <Icon class="icon" icon="line-md:arrow-small-up" />
          </div>

          <div v-else-if="!isAscending">
            <span>{{ $tm('ranking.desc') }}</span>
            <Icon class="icon" icon="line-md:arrow-small-down" />
          </div>
        </Transition>
      </div>

      <div class="sort">
        <Icon class="icon" :icon="userIconMap[user.sortField]" />
        <span>{{ $tm('ranking.filter') }}</span>
        <div class="submenu">
          <div
            class="item"
            v-for="kun in userSortItem"
            :key="kun.index"
            @click="user.sortField = kun.sortField"
          >
            <span><Icon class="icon" :icon="kun.icon" /></span>
            <span>{{ $tm(`ranking.${kun.name}`) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <KUNGalgamer :field="user.sortField" :users="users" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  width: 50%;
  height: calc(100% - 50px - 20px - 40px);
}

.title {
  font-size: 27px;
  color: var(--kungalgame-pink-4);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.nav {
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
  border: 1px solid var(--kungalgame-pink-4);
  border-radius: 5px;
}

.order {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  .icon {
    font-size: 22px;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

.sort {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  border-left: 1px solid var(--kungalgame-pink-4);
}

.sort:hover .submenu {
  display: flex;
}

.icon {
  color: var(--kungalgame-pink-4);
}

.submenu {
  top: 40px;
  position: absolute;
  width: 100%;
  display: none;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid var(--kungalgame-pink-0);
  box-shadow: var(--shadow);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(5px);

  .item {
    transition: all 0.2s;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &:hover {
      background-color: var(--kungalgame-trans-pink-1);
    }
  }
}

.container {
  height: 100%;
  border-top: none;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: inline;
    width: 4px;
    height: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--kungalgame-pink-4);
    border-radius: 2px;
  }

  scrollbar-width: thin;
  scrollbar-color: var(--kungalgame-pink-4) var(--kungalgame-pink-0);
}

.order-enter-active,
.order-leave-active {
  transition: all 0.25s ease-out;
}

.order-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.order-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media (max-width: 700px) {
  .user {
    width: 100%;
  }

  .title {
    font-size: 23px;
  }
}
</style>
