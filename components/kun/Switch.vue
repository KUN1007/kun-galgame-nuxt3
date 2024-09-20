<script setup lang="ts">
const model = defineModel<boolean>({ required: true })

const id = ref(`switch-${Math.random().toString(36).slice(2, 9)}`)
</script>

<template>
  <input type="checkbox" :id="id" v-model="model" />
  <label :for="id" />
</template>

<style lang="scss" scoped>
input {
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 47px;
  height: 24px;
  background: var(--kungalgame-trans-blue-2);
  display: block;
  border-radius: 100px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: var(--kungalgame-white);
  border-radius: 15px;
  transition: 0.3s;
}

input:checked + label {
  background: var(--kungalgame-blue-5);
}

input:checked + label:after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
