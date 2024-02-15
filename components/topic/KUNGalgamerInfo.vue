<script setup lang="ts">
const props = defineProps<{
  user: {
    uid: number
    name: string
    avatar: string
    moemoepoint: number
  }
}>()

const user = computed(() => props.user)
</script>

<template>
  <div class="kungalgamer">
    <div class="avatar" v-if="user.avatar">
      <RouterLink
        :aria-label="`KUN Visual Novel, 鲲 Galgame, User ${props.user.name}`"
        :to="`/kungalgamer/${user.uid}/info`"
      >
        <img :src="user.avatar" :alt="user.name" />
      </RouterLink>
    </div>

    <div class="info">
      <div class="name">
        <RouterLink
          :aria-label="`KUN Visual Novel, 鲲 Galgame, User ${props.user.name}`"
          :to="`/kungalgamer/${user.uid}/info`"
        >
          {{ user.name }}
        </RouterLink>
      </div>

      <div class="moemoepoint">
        <span><Icon name="line-md:star-alt-twotone"></Icon></span>
        <span>{{ user.moemoepoint }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.kungalgamer {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin-bottom: 20px;
  color: var(--kungalgame-font-color-3);
}

.avatar {
  width: 100px;
  margin-top: 17px;

  img {
    width: 100px;
  }
}

.info {
  width: 100px;
}

.name {
  font-size: small;
  display: flex;
  justify-content: center;
  margin-top: 17px;
  font-size: 17px;
  word-break: break-word;

  a {
    color: var(--kungalgame-blue-5);
    border-bottom: 2px solid var(--kungalgame-trans-white-9);

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}

.moemoepoint {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--kungalgame-pink-4);

  span {
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(1) {
      font-size: 20px;
    }
  }
}

@media (max-width: 700px) {
  .kungalgamer {
    flex-direction: row;
    justify-content: center;
    margin-top: 17px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--kungalgame-blue-2);
  }

  .avatar {
    width: 70px;
    height: 70px;
    margin-top: 10px;
    margin-right: 50px;

    img {
      width: 70px;
      height: 70px;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
