<script setup lang="ts">
import { Icon } from '@iconify/vue'
import 'animate.css'

const locale = useCookie('kungalgame-language').value

const props = defineProps<{
  messageCN: string
  messageEN: string
  type: `warn` | `success` | `error` | `info`
  richText?: boolean
}>()

const message = ref('')
const isRichText = computed(() => props.richText ?? false)

message.value = computed(() => {
  if (locale) {
    return locale === 'en-us' ? props.messageEN : props.messageCN
  }

  const localeMatch = window?.location.href.match(/\/([a-z]{2}-[a-z]{2})\//)
  if (localeMatch && localeMatch.length > 1) {
    return localeMatch[1] === 'en-us' ? props.messageEN : props.messageCN
  }

  return props.messageEN
}).value

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

watch(
  () => locale,
  () => {
    message.value = locale === 'en-us' ? props.messageEN : props.messageCN
  }
)
</script>

<template>
  <div class="kungalgame-message-container">
    <div class="kungalgame-message" :class="messageClass(type)">
      <span class="icon" v-if="type === 'warn'">
        <Icon icon="lucide:triangle-alert" />
      </span>
      <span class="icon" v-else-if="type === 'success'">
        <Icon icon="lucide:check" />
      </span>
      <span class="icon" v-else-if="type === 'error'">
        <Icon icon="lucide:x" />
      </span>
      <span class="icon" v-else-if="type === 'info'">
        <Icon icon="lucide:info" />
      </span>
      <span class="message" v-if="!isRichText">{{ message }}</span>
      <span v-if="isRichText" v-html="message"></span>
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
  padding: 1vh 10vw;

  @include kun-blur;
  @include kun-center;

  span {
    @include kun-center;
    flex-direction: column;
  }

  .message {
    word-break: break-all;
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
  border: 1px solid var(--kungalgame-blue-5);

  .icon {
    color: var(--kungalgame-blue-5);
  }
}
</style>
