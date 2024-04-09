<script setup lang="ts">
type ButtonType = 'primary' | 'danger' | ''

withDefaults(defineProps<{ type?: ButtonType; pending?: boolean }>(), {
  type: '',
  pending: false
})
</script>

<template>
  <button class="kun-button" :class="type" :disabled="pending">
    <Icon v-if="pending" name="svg-spinners:12-dots-scale-rotate" />
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.kun-button {
  border: 1px solid var(--kungalgame-blue-5);
  background-color: transparent;
  padding: 7px 10px;
  border-radius: 10px;
  color: var(--kungalgame-blue-5);
  cursor: pointer;

  &:hover {
    background-color: var(--kungalgame-blue-5);
    color: var(--kungalgame-white);
  }

  &:active {
    box-shadow:
      var(--kungalgame-white) 0px 0px 0px 2px,
      var(--kungalgame-blue-5) 0px 0px 0px 4px;
  }

  &:disabled {
    cursor: not-allowed;
    border: 1px solid var(--kungalgame-blue-3);
    color: var(--kungalgame-blue-3);

    &:hover {
      background-color: transparent;
      color: var(--kungalgame-blue-3);
    }

    &:active {
      box-shadow: none;
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
    border: 1px solid var(--kungalgame-blue-3);
    background-color: var(--kungalgame-blue-3);
    color: var(--kungalgame-white);
  }
}

.danger {
  border: 1px solid var(--kungalgame-red-5);
  color: var(--kungalgame-red-5);

  &:hover {
    background-color: var(--kungalgame-red-5);
    color: var(--kungalgame-white);
  }

  &:active {
    box-shadow:
      var(--kungalgame-white) 0px 0px 0px 2px,
      var(--kungalgame-red-5) 0px 0px 0px 4px;
  }

  &:disabled {
    border: 1px solid var(--kungalgame-red-3);
    color: var(--kungalgame-red-3);
  }
}
</style>
