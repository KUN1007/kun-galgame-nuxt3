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
      <NuxtLinkLocale
        :aria-label="`KUN Visual Novel, 鲲 Galgame, User ${props.user.name}`"
        :to="`/kungalgamer/${user.uid}/info`"
      >
        <img :src="user.avatar" :alt="user.name" />
      </NuxtLinkLocale>
    </div>

    <div class="info">
      <div class="replier">
        <p class="name">
          <NuxtLinkLocale
            :aria-label="`KUN Visual Novel, 鲲 Galgame, User ${props.user.name}`"
            :to="`/kungalgamer/${user.uid}/info`"
          >
            {{ user.name }}
          </NuxtLinkLocale>
        </p>

        <p class="moemoepoint">
          <span><Icon name="line-md:star-alt-twotone"></Icon></span>
          <span>{{ user.moemoepoint }}</span>
        </p>
      </div>

      <slot />
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
  aspect-ratio: 1/1;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100px;
    object-fit: cover;
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
    margin-bottom: 0;
  }

  .avatar {
    width: 70px;
    height: 70px;
    flex-shrink: 0;

    img {
      width: 70px;
    }
  }

  .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .replier {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 17px;
  }
}
</style>
