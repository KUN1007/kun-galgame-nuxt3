<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
// Global message component (top)
import Message from '@/components/alert/Message'
// Global message component (bottom)
import { useTempMessageStore } from '@/store/temp/message'
import { useKUNGalgameUserStore } from '@/store/modules/kungalgamer'
import { storeToRefs } from 'pinia'
// Reset store
import { kungalgameStoreReset } from '@/store'

const { uid, name, moemoepoint } = storeToRefs(useKUNGalgameUserStore())

const router = useRouter()
const container = ref<HTMLElement>()
const routerRedirectTo = `/kungalgamer/${uid.value}/info`

const emits = defineEmits<{
  close: []
}>()

// Close the panel when losing focus
const handlePanelBlur = async () => {
  // Wait for a while, or it will directly close the panel
  await new Promise((resolve) => {
    setTimeout(resolve, 107)
  })
  emits('close')
}

// Log out - for simplicity, the code here does not communicate with the backend to remove the token from Redis.
const logOut = async () => {
  // Get the user's response
  const res = await useTempMessageStore().alert('AlertInfo.edit.logout', true)
  if (res) {
    kungalgameStoreReset()
    router.push('/login')
    Message('Logout successfully!', '登出成功', 'success')
  }
}

onMounted(() => {
  // Automatically get focus
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
          <span><Icon icon="line-md:star-alt-twotone"></Icon></span>
          <span>{{ moemoepoint }}</span>
        </p>
      </div>
      <div class="func">
        <span>
          <RouterLink :to="routerRedirectTo">
            {{ $tm('header.user.profile') }}
          </RouterLink>
        </span>
        <span @click="logOut">{{ $tm('header.user.logout') }}</span>
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
