<script setup lang="ts">
const { uid, name, moemoepoint } = storeToRefs(usePersistUserStore())
const { messageStatus } = storeToRefs(useTempSettingStore())
const messageStore = useComponentMessageStore()

const localePath = useLocalePath()
const container = ref<HTMLElement>()
const isCheckIn = ref(true)

const isShowMessageDot = computed(() => {
  if (messageStatus.value === 'new') {
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

const handleCheckIn = async () => {
  isCheckIn.value = true

  const result = await $fetch(`/api/user/check-in`, {
    method: 'POST',
    watch: false,
    ...kungalgameResponseHandler
  })

  moemoepoint.value += result

  if (result === 0) {
    messageStore.info('AlertInfo.check.message1', '', 5000)
  } else if (result === 7) {
    messageStore.info('AlertInfo.check.message3', '7', 5000)
  } else {
    messageStore.info('AlertInfo.check.message2', result.toString(), 5000)
  }
}

const logOut = async () => {
  const res = await useComponentMessageStore().alert({
    'en-us': 'Are you sure you want to log out?',
    'ja-jp': 'ログアウトしてもよろしいですか？',
    'zh-cn': '您确定退出登录吗？',
    'zh-tw': '您確定退出登錄嗎？'
  })
  if (res) {
    usePersistUserStore().$reset()
    navigateTo(localePath('/login'))
    useMessage(10110, 'success')
  }
}

onMounted(async () => {
  container.value?.focus()

  const result = await $fetch(`/api/user/status`, {
    method: 'GET',
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    isCheckIn.value = result.isCheckIn
    moemoepoint.value = result.moemoepoints
  }
})
</script>

<template>
  <div
    ref="container"
    tabindex="-1"
    class="container"
    @blur="handlePanelBlur"
    @mousedown.passive="container?.focus()"
  >
    <span class="triangle1"></span>
    <span class="triangle2"></span>

    <div class="kungalgamer">
      <div class="info">
        <p>{{ name }}</p>
        <p>
          <span><Icon class="icon" name="lucide:lollipop" /></span>
          <span>{{ moemoepoint }}</span>
        </p>
      </div>

      <div class="func">
        <span>
          <NuxtLinkLocale :to="`/kungalgamer/${uid}/info`">
            {{ $t('header.user.profile') }}
          </NuxtLinkLocale>
        </span>

        <NuxtLinkLocale to="/message">
          <span>{{ $t('header.user.message') }}</span>
          <span v-if="isShowMessageDot" class="message-dot"></span>
        </NuxtLinkLocale>

        <span v-if="!isCheckIn" @click="handleCheckIn">
          <span>{{ $t('header.user.check') }}</span>
          <span class="message-dot"></span>
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
}

.triangle1 {
  position: absolute;
  top: -1px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 17px solid var(--kungalgame-trans-white-5);
  filter: drop-shadow(0px -1px 1px var(--kungalgame-trans-blue-2));
  z-index: 1;
}

.kungalgamer {
  padding: 10px;
  top: 16px;
  transform: translateX(-43%);
  width: 130px;
  position: absolute;
  display: flex;
  flex-direction: column;

  @include kun-blur;
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
  & > span,
  a {
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
