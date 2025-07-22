<script setup lang="ts">
import { useOnlineUser } from '~/composables/online/useOnlineUser'

const route = useRoute()

const { showKUNGalgameHamburger, messageStatus } = storeToRefs(
  useTempSettingStore()
)
const { id, moemoepoint, isCheckIn } = storeToRefs(usePersistUserStore())

const { userDidLogin, userDidLogout } = useOnlineUser()

const router = useRouter()
const canGoBack = ref(false)
// const isShowUpdateAvatarModal = ref(false)

const updateCanGoBack = () => {
  canGoBack.value = window.history.length > 2
}

watch(
  () => route.name,
  () => {
    useTempSettingStore().reset()
  }
)

watchEffect(() => {
  if (id.value) {
    userDidLogin(id.value.toString())
  } else {
    userDidLogout()
  }
})

onMounted(async () => {
  const result = await $fetch('/api/user/status', {
    method: 'GET',
    ...kungalgameResponseHandler
  })
  if (result) {
    isCheckIn.value = result.isCheckIn
    moemoepoint.value = result.moemoepoints
    messageStatus.value = result.hasNewMessage ? 'new' : 'online'
  }

  // if (uid.value && !avatar.value) {
  //   isShowUpdateAvatarModal.value = true
  // }

  updateCanGoBack()

  router.afterEach(() => {
    updateCanGoBack()
  })
})
</script>

<template>
  <div class="cursor-pointer">
    <KunButton
      :is-icon-only="true"
      color="default"
      size="xl"
      variant="light"
      @click="showKUNGalgameHamburger = true"
      class-name="flex sm:hidden"
    >
      <KunIcon name="lucide:menu" />
    </KunButton>

    <div class="hidden sm:block">
      <KunButton
        v-if="canGoBack"
        :is-icon-only="true"
        color="default"
        size="xl"
        variant="light"
        @click="router.back()"
      >
        <KunIcon name="lucide:arrow-left" />
      </KunButton>
      <KunButton
        v-else
        :is-icon-only="true"
        color="default"
        size="xl"
        variant="light"
        @click="navigateTo('/')"
      >
        <KunIcon name="lucide:home" />
      </KunButton>
    </div>

    <!-- <KunModal
      :modal-value="isShowUpdateAvatarModal"
      @update:modal-value="(value) => (isShowUpdateAvatarModal = value)"
    >
      <div class="max-w-xl space-y-3">
        <p>之所以有这个丑陋的弹窗, 是因为我想看见大家都用可爱的孩子做头像!</p>
        <p>没有头像黑乎乎的样子太难看了! 这一定是我最初的设计失误!</p>
        <p>
          但是我真的非常希望大家都有一个可爱的头像, 如果是小只可爱软萌 白毛
          女孩子的话就更好了!!!!!!!
        </p>
        <p>
          所以大家快点一下下面的框框更改头像啦,
          如果找不到小只可爱软萌白毛女孩子, 可以前往
          <KunLink target="_blank" :to="kungal.domain.sticker">
            鲲 Galgame 表情包
          </KunLink>
        </p>
        <LazyUserSettingAvatar />
      </div>
    </KunModal> -->

    <LazyKunTopBarHamburger />
  </div>
</template>
