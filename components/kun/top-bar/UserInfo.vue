<script setup lang="ts">
const { uid, name, moemoepoint } = storeToRefs(usePersistUserStore())
const { messageStatus } = storeToRefs(useTempSettingStore())
const messageStore = useComponentMessageStore()

const container = ref<HTMLElement>()
const isCheckIn = ref(true)
const isShowMessageDot = computed(() => messageStatus.value === 'new')

const handleCheckIn = async () => {
  isCheckIn.value = true

  const result = await $fetch(`/api/user/check-in`, {
    method: 'POST',
    watch: false,
    ...kungalgameResponseHandler
  })

  moemoepoint.value += result

  if (result === 0) {
    messageStore.info(
      '杂~~~鱼~♡杂鱼~♡ 臭杂鱼♡. 签到成功，您今日什么也没获得...',
      5000
    )
  } else if (result === 7) {
    messageStore.info(
      '杂鱼~♡♡♡♡♡. 签到成功, 您今日好运获得了 7 萌萌点哦!',
      5000
    )
  } else {
    messageStore.info(
      `杂~~~鱼~♡. 签到成功，您今日获得了 ${result} 萌萌点`,
      5000
    )
  }
}

const logOut = async () => {
  const res = await useComponentMessageStore().alert('您确定退出登录吗？')
  if (res) {
    usePersistUserStore().$reset()
    navigateTo('/login')
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
  <div class="flex w-30 flex-col gap-2 p-2">
    <div class="flex flex-col items-center gap-1">
      <p class="font-lg">{{ name }}</p>
      <p class="flex items-center justify-between gap-1 font-bold">
        <Icon class="icon text-secondary" name="lucide:lollipop" />
        <span class="text-secondary">{{ moemoepoint }}</span>
      </p>
    </div>

    <div class="func flex flex-col">
      <NuxtLink
        class="hover:text-secondary-600 hover:bg-default-200 relative flex items-center justify-center rounded-lg p-1 transition-colors"
        :to="`/kungalgamer/${uid}/info`"
      >
        个人主页
      </NuxtLink>

      <NuxtLink
        class="hover:text-secondary-600 hover:bg-default-200 relative flex items-center justify-center rounded-lg p-1 transition-colors"
        to="/message"
      >
        我的消息
        <span
          v-if="isShowMessageDot"
          class="bg-secondary-500 absolute right-1 bottom-3 size-2 rounded-full"
        />
      </NuxtLink>

      <div
        class="hover:text-secondary-600 hover:bg-default-200 relative flex items-center justify-center rounded-lg p-1 transition-colors"
        v-if="!isCheckIn"
        @click="handleCheckIn"
      >
        每日签到
        <span class="bg-secondary-500 size-2 rounded-full" />
      </div>

      <button
        class="hover:bg-danger flex cursor-pointer justify-center rounded-lg p-1 transition-all hover:text-white"
        @click="logOut"
      >
        退出登录
      </button>
    </div>
  </div>
</template>
