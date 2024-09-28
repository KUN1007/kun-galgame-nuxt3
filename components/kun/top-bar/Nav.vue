<script setup lang="ts">
import 'animate.css'

const router = useRouter()
const routeName = useRouteName()
const localePath = useLocalePath()

const { showKUNGalgameHamburger, showKUNGalgameMessageBox, messageStatus } =
  storeToRefs(useTempSettingStore())

watch(
  () => useRouteName().value,
  () => {
    useTempSettingStore().reset()
  }
)

onMounted(async () => {
  const result = await $fetch(`/api/message/unread`, {
    method: 'GET'
  })
  if (result === 'Moe loli online!') {
    messageStatus.value = 'online'
  } else {
    messageStatus.value = 'new'
  }
})

const handleRouterBack = () => {
  if (window.history.state.back) {
    router.back()
  } else {
    navigateTo(localePath('/'))
  }
}
</script>

<template>
  <div class="nav-top">
    <div class="return" v-if="routeName !== 'index'" @click="handleRouterBack">
      <Icon class="icon" name="lucide:arrow-left" />
    </div>

    <div class="hamburger">
      <Icon
        class="icon"
        name="lucide:menu"
        @click="showKUNGalgameHamburger = true"
      />

      <LazyKunTopBarHamburger />
    </div>

    <Transition name="message">
      <LazyKunMessageBox v-if="showKUNGalgameMessageBox" />
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
.return,
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

@media (max-width: 1000px) {
  .kungalgame {
    display: none;
  }
  .return,
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
