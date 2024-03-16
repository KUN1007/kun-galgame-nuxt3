<script setup lang="ts">
const { uid, name, moemoepoint } = storeToRefs(useKUNGalgameUserStore())
const { showKUNGalgameMessageBox, messageStatus } = storeToRefs(
  useTempSettingStore()
)
const messageStore = useTempMessageStore()

const localePath = useLocalePath()
const container = ref<HTMLElement>()
const isCheckIn = ref(true)

const isShowMessageDot = computed(() => {
  if (messageStatus.value === 'new' || messageStatus.value === 'admin') {
    return true
  }
  return false
})

const emits = defineEmits<{
  close: []
}>()

const handlePanelBlur = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 107)
  })
  emits('close')
}

const handleClickMessage = () => {
  showKUNGalgameMessageBox.value = true

  if (messageStatus.value === 'new' || messageStatus.value === 'admin') {
    messageStatus.value = 'online'
  }
}

const handleCheckIn = async () => {
  isCheckIn.value = true

  const { data } = await useFetch(`/api/user/check-in`, {
    method: 'POST',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (typeof data.value === 'number') {
    moemoepoint.value += data.value

    if (data.value === 0) {
      messageStore.info('AlertInfo.check.message1', '', 5000)
    } else if (data.value === 7) {
      messageStore.info('AlertInfo.check.message3', '7', 5000)
    } else {
      messageStore.info('AlertInfo.check.message2', data.value.toString(), 5000)
    }
  }
}

const logOut = async () => {
  const res = await useTempMessageStore().alert('AlertInfo.edit.logout', true)
  if (res) {
    kungalgameStoreReset()
    navigateTo(localePath('/login'))
    useMessage('Logout successfully!', '登出成功', 'success')
  }
}

onMounted(async () => {
  container.value?.focus()

  const { data } = await useFetch(`/api/user/status`, {
    method: 'GET',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (data.value) {
    isCheckIn.value = data.value.isCheckIn
    moemoepoint.value = data.value.moemoepoints
  }
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
          <span><Icon name="lucide:lollipop"></Icon></span>
          <span>{{ moemoepoint }}</span>
        </p>
      </div>

      <div class="func">
        <span>
          <NuxtLinkLocale :to="`/kungalgamer/${uid}/info`">
            {{ $t('header.user.profile') }}
          </NuxtLinkLocale>
        </span>

        <span @click="handleClickMessage">
          <text>{{ $t('header.user.message') }}</text>
          <text v-if="isShowMessageDot" class="message-dot"></text>
        </span>

        <span v-if="!isCheckIn" @click="handleCheckIn">
          <text>{{ $t('header.user.check') }}</text>
          <text class="message-dot"></text>
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
  opacity: 0.9;
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
  border-bottom: 17px solid var(--kungalgame-blue-2);
}

.kungalgamer {
  padding: 10px;
  top: 16px;
  transform: translateX(-43%);
  width: 130px;
  background-color: var(--kungalgame-white);
  border: 1px solid var(--kungalgame-blue-2);
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
    position: relative;
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

.message-dot {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--kungalgame-pink-4);
}
</style>
