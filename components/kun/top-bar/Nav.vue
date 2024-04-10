<script setup lang="ts">
import 'animate.css'

const Hamburger = defineAsyncComponent(() => import('./Hamburger.vue'))
const MessageBox = defineAsyncComponent(() => import('../message/Box.vue'))

const { showKUNGalgameHamburger, showKUNGalgameMessageBox, messageStatus } =
  storeToRefs(useTempSettingStore())

watch(
  () => useRouteName().value,
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
    .on('favorite', (socket) => {
      messageStatus.value = 'new'
    })
    .on('replied', (socket) => {
      messageStatus.value = 'new'
    })
    .on('commented', (socket) => {
      messageStatus.value = 'new'
    })
    .on('expired', (socket) => {
      messageStatus.value = 'new'
    })

  const { data } = await useFetch(`/api/message/unread`, {
    method: 'GET'
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
        name="lucide:menu"
        class="icon"
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

    <KunTopBarNavBar />
  </div>
</template>

<style lang="scss" scoped>
.hamburger {
  display: none;
  margin-left: 20px;
  cursor: pointer;

  .icon {
    font-size: 20px;
  }
}

.nav-top {
  display: flex;
  align-items: center;
  height: 100%;
}

.kungalgame {
  display: flex;
  align-items: center;
  margin-left: 50px;

  a {
    display: flex;
    align-items: center;
    font-size: 20px;
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
