<script setup lang="ts">
import 'animate.css'

defineProps<{
  isShowSettingsMenu: boolean
}>()

const emits = defineEmits<{
  close: [isShowSettingsMenu: boolean]
}>()

const handelCloseSettingsPanel = () => {
  emits('close', false)
}
</script>

<template>
  <Transition
    enter-active-class="animate__animated animate__jackInTheBox animate__faster"
    leave-active-class="animate__animated animate__rollOut animate__faster"
  >
    <div v-if="isShowSettingsMenu" class="settings-menu">
      <div class="content"></div>

      <div class="close">
        <Icon @click="handelCloseSettingsPanel" name="lucide:x" />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.settings-menu {
  width: 323px;
  padding: 10px;
  z-index: 1009;
  position: absolute;
  margin-bottom: 190px;
  background-color: var(--kungalgame-white);
  border: 1px solid var(--kungalgame-blue-2);
  box-shadow: var(--shadow);
  border-radius: 5px;
  display: flex;

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
