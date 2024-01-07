<script setup lang="ts">
const { uid, name, moemoepoint } = storeToRefs(useKUNGalgameUserStore())

const router = useRouter()
const container = ref<HTMLElement>()

const emits = defineEmits<{
  close: []
}>()

const handlePanelBlur = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 107)
  })
  emits('close')
}

const logOut = async () => {
  const res = await useTempMessageStore().alert('AlertInfo.edit.logout', true)
  if (res) {
    kungalgameStoreReset()
    router.push('/login')
    useMessage('Logout successfully!', '登出成功', 'success')
  }
}

onMounted(() => {
  container.value?.focus()
})
</script>

<template>
  <div ref="container" tabindex="-1" class="container" @blur="handlePanelBlur">
    <span class="triangle1"></span>
    <span class="triangle2"></span>
    <div class="kungalgamer">
      <div class="info">
        <p>{{ name }}</p>
        <p>
          <span><Icon name="line-md:star-alt-twotone"></Icon></span>
          <span>{{ moemoepoint }}</span>
        </p>
      </div>
      <div class="func">
        <span>
          <NuxtLink :to="`/kungalgamer/${uid}/info`">
            {{ $t('header.user.profile') }}
          </NuxtLink>
        </span>
        <span @click="logOut">{{ $t('header.user.logout') }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 50px;
  right: 80px;
  opacity: 0.77;
}

.triangle1 {
  position: absolute;
  top: 1px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 17px solid var(--kungalgame-white);
  z-index: 1;
}

.triangle2 {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 17px solid var(--kungalgame-blue-1);
}

.kungalgamer {
  padding: 10px;
  top: 16px;
  transform: translateX(-43%);
  width: 130px;
  background-color: var(--kungalgame-white);
  border: 1px solid var(--kungalgame-blue-1);
  border-radius: 5px;
  position: absolute;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow);
}

.info {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;

  p {
    display: flex;
    margin-bottom: 5px;
    justify-content: center;
    align-items: center;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      font-weight: bold;
      color: var(--kungalgame-pink-4);

      &:nth-child(1) {
        font-size: 20px;
      }
    }
  }
}

.func {
  span {
    cursor: pointer;
    color: var(--kungalgame-blue-5);
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    a {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--kungalgame-blue-5);
    }

    &:hover {
      background-color: var(--kungalgame-trans-blue-1);
    }
  }
}
</style>
