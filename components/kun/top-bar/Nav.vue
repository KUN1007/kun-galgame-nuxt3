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
    .on('replied', (socket) => {
      messageStatus.value = 'new'
    })
    .on('commented', (socket) => {
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

    <div class="top-bar">
      <KunPopover>
        <span class="item">{{ $t('header.topic') }}</span>
        <template #content>
          <div class="topic-menu">
            <span>
              <NuxtLinkLocale to="/pool">
                {{ $t('header.all') }}
              </NuxtLinkLocale>
            </span>
            <span>{{ $t('header.category') }}</span>
          </div>
        </template>
      </KunPopover>

      <span class="item">{{ $t('header.publish') }}</span>
      <span class="item">{{ $t('header.about') }}</span>
      <span class="item">{{ $t('header.home') }}</span>
    </div>
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

.top-bar {
  text-align: center;
  width: 300px;
  align-items: center;
  display: flex;
  margin-left: 30px;

  .item {
    cursor: pointer;
    display: block;
    line-height: 58px;
    width: 100%;
  }

  .topic-menu {
    display: flex;
    flex-direction: column;
    background-color: var(--kungalgame-trans-white-5);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: var(--shadow);
    white-space: nowrap;
    padding: 10px;

    span {
      padding: 10px;

      a {
        position: relative;
        color: var(--kungalgame-blue-5);

        &::before {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--kungalgame-blue-5);
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        &:hover::before {
          transform: scaleX(1);
        }
      }
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
