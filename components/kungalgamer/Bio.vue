<script setup lang="ts">
import type { UserInfo } from '~/types/api/user'

const props = defineProps<{
  user: UserInfo
}>()

const refresh = inject<() => Promise<void>>('refresh')
const bioValue = ref('')
const user = computed(() => props.user)

const handleChangeBio = async () => {
  if (!bioValue.value.trim()) {
    return
  }

  if (bioValue.value.length > 107) {
    useMessage(
      'Bio must not exceed a maximum length of 107 characters',
      '签名的最大长度不可超过 107 个字符',
      'warn'
    )
    return
  }

  const { data } = await useFetch('/api/user/bio', {
    method: 'PUT',
    watch: false,
    body: { bio: bioValue.value },
    ...kungalgameResponseHandler,
  })

  if (data.value) {
    useMessage('Rewrite bio successfully!', 'Rewrite 签名成功', 'success')
    bioValue.value = ''
    await refresh?.()
  }
}

onMounted(() => {
  bioValue.value = user.value.bio
})
</script>

<template>
  <div class="bio">
    <div class="title">{{ $t('user.settings.bio') }}</div>
    <ClientOnly>
      <textarea
        name="bio"
        :placeholder="`${$t('user.settings.hint')}`"
        rows="5"
        v-model="bioValue"
      >
      </textarea>
    </ClientOnly>

    <div class="help">
      <span class="bioCount">
        {{ $t('user.settings.count') }}: {{ bioValue.length }}
      </span>
      <button @click="handleChangeBio">
        {{ $t('user.settings.confirm') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bio {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  textarea {
    color: var(--kungalgame-font-color-3);
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-white-9);
    border-radius: 5px;
    padding: 5px;
    resize: none;

    &:focus {
      border: 1px solid var(--kungalgame-pink-3);
    }
  }
}

.title {
  margin-bottom: 10px;
}

.help {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    cursor: pointer;
    padding: 5px 17px;
    border: 1px solid var(--kungalgame-blue-5);
    background-color: var(--kungalgame-trans-white-9);
    border-radius: 5px;
    color: var(--kungalgame-blue-5);
    transition: all 0.2s;

    &:hover {
      background-color: var(--kungalgame-blue-5);
      color: var(--kungalgame-white);
    }

    &:active {
      transform: scale(0.9);
    }
  }
}
</style>
