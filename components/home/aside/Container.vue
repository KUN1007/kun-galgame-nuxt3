<script setup lang="ts">
const { isActiveMainPageAside } = storeToRefs(usePersistKUNGalgameHomeStore())

const asideWidth = ref('240px')

const handleFold = () => {
  isActiveMainPageAside.value = !isActiveMainPageAside.value
}

watch(
  () => isActiveMainPageAside.value,
  () => {
    asideWidth.value = isActiveMainPageAside.value ? '240px' : '40px'
  },
  { immediate: true }
)
</script>

<template>
  <div class="aside">
    <div class="nav-aside" @click="handleFold">
      <Icon
        class="icon"
        name="lucide:arrow-left"
        v-if="isActiveMainPageAside"
      />
      <Icon
        class="icon"
        name="lucide:arrow-right"
        v-if="!isActiveMainPageAside"
      />
      <span v-if="isActiveMainPageAside">
        {{ $t('mainPage.asideActive.fold') }}
      </span>
    </div>

    <HomeAsideActive v-if="isActiveMainPageAside" />

    <HomeAsideBase v-if="!isActiveMainPageAside" />
  </div>
</template>

<style lang="scss" scoped>
.aside {
  margin-right: 17px;
  width: v-bind('asideWidth');
  height: 100%;
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
