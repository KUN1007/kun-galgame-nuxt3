<script setup lang="ts">
import { watch, ref } from 'vue'
import { Icon } from '@iconify/vue'

// Import the settings panel store
import { useKUNGalgameSettingsStore } from '@/store/modules/settings'
import { storeToRefs } from 'pinia'

// Use the settings panel store
const { showKUNGalgameLanguage } = storeToRefs(useKUNGalgameSettingsStore())

const props = defineProps<{
  messageCN: string
  messageEN: string
  type: `warn` | `success` | `error` | `info`
}>()

const message = ref('')
// Initialize
message.value =
  showKUNGalgameLanguage.value === 'en' ? props.messageEN : props.messageCN

const messageClass = (type: string): string => {
  if (type === 'warn') {
    return `animate__animated animate__headShake ${type}`
  } else if (type === 'success') {
    return `animate__animated animate__bounceInDown ${type}`
  } else if (type === 'error') {
    return `animate__animated animate__tada ${type}`
  } else if (type === 'info') {
    return `animate__animated animate__bounce ${type}`
  } else {
    return ''
  }
}

// Watch properties for reactivity
watch(
  () => useKUNGalgameSettingsStore().showKUNGalgameLanguage,
  () => {
    message.value =
      showKUNGalgameLanguage.value === 'en' ? props.messageEN : props.messageCN
  }
)
</script>

<template>
  <div class="kungalgame-message-container">
    <div class="kungalgame-message" :class="messageClass(type)">
      <span class="icon" v-if="type === 'warn'"
        ><Icon icon="line-md:alert"
      /></span>
      <span class="icon" v-else-if="type === 'success'"
        ><Icon icon="line-md:circle-to-confirm-circle-transition"
      /></span>
      <span class="icon" v-else-if="type === 'error'"
        ><Icon icon="line-md:close-circle"
      /></span>
      <span class="icon" v-else-if="type === 'info'"
        ><Icon icon="line-md:alert-circle"
      /></span>
      <span v-html="message"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.kungalgame-message-container {
  position: fixed;
  top: 100px;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  z-index: 9999;
}
.kungalgame-message {
  margin: 0 auto;
  font-size: large;
  color: var(--kungalgame-font-color-2);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(5px);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1vh 10vw;
  box-shadow: var(--shadow);
  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.icon {
  font-size: 23px;
  margin-right: 17px;
}

.warn {
  border: 1px solid var(--kungalgame-yellow-3);
  .icon {
    color: var(--kungalgame-yellow-3);
  }
}

.success {
  border: 1px solid var(--kungalgame-green-4);
  .icon {
    color: var(--kungalgame-green-4);
  }
}

.error {
  border: 1px solid var(--kungalgame-red-4);
  .icon {
    color: var(--kungalgame-red-4);
  }
}

.info {
  border: 1px solid var(--kungalgame-blue-4);
  .icon {
    color: var(--kungalgame-blue-4);
  }
}
</style>
