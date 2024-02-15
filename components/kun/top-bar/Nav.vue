<script setup lang="ts">
import { topBarItem } from './topBarItem'
import 'animate.css'

const Hamburger = defineAsyncComponent(() => import('./Hamburger.vue'))
const MessageBox = defineAsyncComponent(() => import('../message/Box.vue'))

const { showKUNGalgameHamburger, showKUNGalgameMessageBox, messageStatus } =
  storeToRefs(useTempSettingStore())
const route = useRoute()

const navItemNum = topBarItem.length
const navItemLength = `${navItemNum}00px`

watch(
  () => route.name,
  () => {
    useTempSettingStore().reset()
  }
)

onMounted(async () => {
  const socket = useIO()()
  socket.emit('register')

  socket
    .on('connect', () => {
      if (messageStatus.value === 'offline') {
        messageStatus.value = 'online'
      }
    })
    .on('disconnect', () => {
      messageStatus.value = 'offline'
    })
    .on('upvoted', (socket) => {
      messageStatus.value = 'new'
    })
    .on('liked', (socket) => {
      messageStatus.value = 'new'
    })
    .on('replied', (socket) => {
      messageStatus.value = 'new'
    })
    .on('commented', (socket) => {
      messageStatus.value = 'new'
    })

  const { data } = await useFetch(`/api/message/unread`, {
    method: 'GET',
  })
  if (data.value) {
    messageStatus.value = 'new'
  }
})
</script>

<template>
  <div class="nav-top">
    <div class="hamburger">
      <Icon
        name="line-md:menu-fold-right"
        @click="showKUNGalgameHamburger = true"
      />

      <Hamburger />
    </div>

    <Transition name="message">
      <MessageBox v-if="showKUNGalgameMessageBox" />
    </Transition>

    <div class="kungalgame">
      <NuxtLinkLocale to="/">
        <NuxtImg src="/favicon.webp" alt="KUN Visual Novel | 鲲 Galgame" />
        <span>{{ $t('header.name') }}</span>
      </NuxtLinkLocale>
    </div>

    <div class="top-bar">
      <span v-for="kun in topBarItem" :key="kun.index">
        <NuxtLinkLocale :to="{ path: kun.router }">
          {{ $t(`header.${kun.name}`) }}
        </NuxtLinkLocale>
      </span>

      <div class="box"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hamburger {
  display: none;
  margin-left: 20px;
  font-size: 25px;
  cursor: pointer;
}

.nav-top {
  display: flex;
  align-items: center;
  height: 100%;
}

$navNumber: v-bind(navItemNum);

.top-bar {
  position: relative;
  text-align: center;
  width: v-bind(navItemLength);
  align-items: center;
  display: flex;

  .box {
    border-radius: 2px;
    bottom: 0;
    height: 7px;
    left: 0;
    position: absolute;
    transition: 0.5s;
    width: calc(100% / $navNumber);

    &:hover {
      z-index: -1;
    }
  }

  a {
    display: block;
    color: var(--kungalgame-blue-5);
    width: 100%;
    height: 100%;
  }

  span {
    cursor: pointer;
    display: block;
    font-weight: bold;
    line-height: 58px;
    width: 100%;

    &:nth-child(1):hover ~ .box {
      background-color: var(--kungalgame-red-3);
      left: calc(100% / $navNumber * 0);
    }

    &:nth-child(2):hover ~ .box {
      background-color: var(--kungalgame-blue-3);
      left: calc(100% / $navNumber * 1);
    }

    &:nth-child(3):hover ~ .box {
      background-color: var(--kungalgame-yellow-2);
      left: calc(100% / $navNumber * 2);
    }

    &:nth-child(4):hover ~ .box {
      filter: hue-rotate(240deg);
      background-color: var(--kungalgame-blue-3);
      left: calc(100% / $navNumber * 3);
    }

    &:nth-child(5):hover ~ .box {
      filter: hue-rotate(60deg);
      background-color: var(--kungalgame-blue-3);
      left: calc(100% / $navNumber * 4);
    }
  }
}

.kungalgame {
  display: flex;
  align-items: center;
  margin-left: 50px;

  a {
    display: flex;
    align-items: center;
    color: var(--kungalgame-font-color-3);

    img {
      width: 50px;
      height: 50px;
      margin-right: 30px;
    }
  }
}

@media (max-width: 1000px) {
  .kungalgame {
    span {
      display: none;
    }
    img {
      margin-right: 0 !important;
    }
  }
}

@media (max-width: 700px) {
  .top-bar {
    display: none;
  }
  .kungalgame {
    display: none;
  }
  .hamburger {
    display: block;
  }
}

.message-enter-active {
  transition: all 0.3s;
}

.message-leave-active {
  transition: all 0.3s;
}

.message-enter-from,
.message-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
