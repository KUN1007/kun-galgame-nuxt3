<script setup lang="ts">
import 'animate.css'

const route = useRoute()

const { showKUNGalgameHamburger, messageStatus } = storeToRefs(
  useTempSettingStore()
)

watch(
  () => route.name,
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
</script>

<template>
  <div class="nav-top">
    <div class="hamburger">
      <Icon
        class="icon"
        name="lucide:menu"
        @click="showKUNGalgameHamburger = true"
      />

      <LazyKunTopBarHamburger />
    </div>

    <div class="kungalgame">
      <NuxtLink to="/">
        <NuxtImg src="/favicon.webp" :alt="kungal.titleShort" />
        <span>{{ kungal.title }}</span>
      </NuxtLink>
    </div>

    <KunTopBarNavBar />
  </div>
</template>

<style lang="scss" scoped>
.return,
.hamburger {
  display: none;
  cursor: pointer;

  .icon {
    font-size: 20px;
  }
}

.return {
  margin-right: 16px;
}

.nav-top {
  display: flex;
  align-items: center;
  height: 100%;
}

.kungalgame {
  display: flex;
  align-items: center;

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
</style>
