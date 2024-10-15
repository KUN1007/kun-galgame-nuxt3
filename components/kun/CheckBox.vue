<script lang="ts" setup>
const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="kun-checkbox">
    <input type="checkbox" v-model="model" />
    <span class="checkmark" />
    <slot />
  </label>
</template>

<style lang="scss" scoped>
.kun-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-left: 32px;
  font-size: 16px;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkmark {
      background-color: var(--kungalgame-blue-5);
      border-color: var(--kungalgame-blue-5);

      &:after {
        display: block;
      }
    }
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: var(--kungalgame-white);
    border: 2px solid var(--kungalgame-blue-5);
    border-radius: 4px;
    transition: all 0.3s ease;

    &:after {
      content: '';
      position: absolute;
      display: none;
      top: 1px;
      left: 5px;
      width: 4px;
      height: 10px;
      border: solid var(--kungalgame-white);
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
}
</style>
