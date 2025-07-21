<script setup lang="ts">
const { id, name, moemoepoint, isCheckIn } = storeToRefs(usePersistUserStore())
const { messageStatus } = storeToRefs(useTempSettingStore())

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
    useKunLoliInfo(
      '杂~~~鱼~♡杂鱼~♡ 臭杂鱼♡. 签到成功，您今日什么也没获得...',
      5000
    )
  } else if (result === 7) {
    useKunLoliInfo('杂鱼~♡♡♡♡♡. 签到成功, 您今日好运获得了 7 萌萌点哦!', 5000)
  } else {
    useKunLoliInfo(`杂~~~鱼~♡. 签到成功，您今日获得了 ${result} 萌萌点`, 5000)
  }
}

const logOut = async () => {
  const res = await useComponentMessageStore().alert('您确定退出登录吗？')
  if (res) {
    useMessage(10110, 'success')
    await navigateTo('/login')
    usePersistUserStore().$reset()
  }
}
</script>

<template>
  <div class="flex w-30 flex-col gap-2 p-2">
    <div class="flex flex-col items-center gap-1">
      <p class="font-lg">{{ name }}</p>
      <p class="flex items-center justify-between gap-1 font-bold">
        <KunIcon class="icon text-secondary" name="lucide:lollipop" />
        <span class="text-secondary">{{ moemoepoint }}</span>
      </p>
    </div>

    <div class="func flex flex-col">
      <KunButton
        variant="light"
        class-name="text-base p-1 text-foreground"
        :href="`/user/${id}/info`"
      >
        个人主页
      </KunButton>

      <KunButton
        variant="light"
        class-name="text-base p-1 text-foreground"
        href="/message"
      >
        我的消息
        <span
          v-if="isShowMessageDot"
          class="bg-secondary-500 absolute right-1 bottom-3 size-2 rounded-full"
        />
      </KunButton>

      <KunButton
        variant="light"
        class-name="text-base p-1 text-foreground"
        href="/admin/overview"
      >
        管理系统
      </KunButton>

      <KunButton
        variant="light"
        color="secondary"
        v-if="!isCheckIn"
        @click="handleCheckIn"
        class-name="text-base p-1"
      >
        每日签到
        <span
          class="bg-secondary-500 absolute right-1 bottom-3 size-2 rounded-full"
        />
      </KunButton>

      <KunButton
        variant="light"
        color="danger"
        class-name="text-base p-1 hover:bg-danger hover:text-white text-foreground"
        @click="logOut"
      >
        退出登录
      </KunButton>
    </div>
  </div>
</template>
