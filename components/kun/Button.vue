<script setup lang="ts">
import { useRipple } from './utils/useRipple'

type ButtonType = 'primary' | 'danger' | ''

withDefaults(defineProps<{ type?: ButtonType; pending?: boolean }>(), {
  type: '',
  pending: false
})

const { ripples, onClick } = useRipple()
</script>

<template>
  <button class="kun-button" @click="onClick" :class="type" :disabled="pending">
    <Icon
      class="icon"
      v-if="pending"
      name="svg-spinners:12-dots-scale-rotate"
    />
    <slot />
    <KunUtilsRipple :ripples="ripples" />
  </button>
</template>

<style lang="scss" scoped>
.kun-button {
  border: 1.5px solid var(--kungalgame-blue-5);
  background-color: transparent;
  padding: 7px 10px;
  border-radius: 10px;
  color: var(--kungalgame-blue-5);
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  overflow: hidden;
  transition: all 0.23s;

  &:hover {
    background-color: var(--kungalgame-blue-5);
    color: var(--kungalgame-white);
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    cursor: not-allowed;
    border: 1.5px solid var(--kungalgame-blue-3);
    color: var(--kungalgame-blue-3);

    &:hover {
      background-color: transparent;
      color: var(--kungalgame-blue-3);
    }
  }

  .icon {
    font-size: medium;
    margin-right: 7px;
  }
}

.primary {
  background-color: var(--kungalgame-blue-5);
  color: var(--kungalgame-white);

  &:disabled {
    border: 1.5px solid var(--kungalgame-blue-3);
    background-color: var(--kungalgame-blue-3);
    color: var(--kungalgame-white);
  }
}

.danger {
  border: 1.5px solid var(--kungalgame-red-5);
  color: var(--kungalgame-red-5);

  &:hover {
    background-color: var(--kungalgame-red-5);
    color: var(--kungalgame-white);
  }

  &:disabled {
    border: 1.5px solid var(--kungalgame-red-3);
    color: var(--kungalgame-red-3);

    &:hover {
      background-color: transparent;
      color: var(--kungalgame-red-3);
    }

    &:active {
      transform: none;
    }
  }
}
</style>
