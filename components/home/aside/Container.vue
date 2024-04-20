<script setup lang="ts">
const { isActiveHomeAside } = storeToRefs(usePersistKUNGalgameHomeStore())

const asideWidth = ref('240px')

const handleFold = () => {
  isActiveHomeAside.value = !isActiveHomeAside.value
}

watch(
  () => isActiveHomeAside.value,
  () => {
    asideWidth.value = isActiveHomeAside.value ? '240px' : '40px'
  },
  { immediate: true }
)
</script>

<template>
  <div class="aside">
    <div class="nav-aside" @click="handleFold">
      <Icon class="icon" name="lucide:arrow-left" v-if="isActiveHomeAside" />
      <Icon class="icon" name="lucide:arrow-right" v-if="!isActiveHomeAside" />
      <span v-if="isActiveHomeAside">
        {{ $t('home.asideActive.fold') }}
      </span>
    </div>

    <HomeAsideActive v-if="isActiveHomeAside" />

    <HomeAsideBase v-if="!isActiveHomeAside" />
  </div>
</template>

<style lang="scss" scoped>
.aside {
  flex-shrink: 0;
  margin-right: 17px;
  width: v-bind('asideWidth');
  height: calc(100dvh - 75px);
  display: flex;
  flex-direction: column;
  transition: width 0.5s;
}

.nav-aside {
  height: 40px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-align: center;
  font-size: 15px;
  color: var(--kungalgame-white);
  cursor: pointer;
  background-color: var(--kungalgame-blue-5);
  border-radius: 20px;
  box-shadow: var(--kungalgame-shadow-0);
  margin-bottom: 17px;

  span {
    white-space: nowrap;
    margin-left: 10px;
  }

  .icon {
    font-size: 17px;
  }
}

.item-active {
  display: grid;
  grid-template-rows: auto 1fr;
  flex-grow: 1;
}

.item {
  height: 96.6%;
}
</style>
