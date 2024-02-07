<script setup lang="ts">
const { isActiveMainPageAside } = storeToRefs(usePersistKUNGalgameHomeStore())

const asideWidth = ref('240px')

const handleFold = () => {
  isActiveMainPageAside.value = !isActiveMainPageAside.value
}

watch(
  isActiveMainPageAside,
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
        name="line-md:arrow-left"
        v-if="isActiveMainPageAside"
      />
      <Icon
        class="icon"
        name="line-md:arrow-right"
        v-if="!isActiveMainPageAside"
      />
      <span v-if="isActiveMainPageAside">
        {{ $t('mainPage.asideActive.fold') }}
      </span>
    </div>

    <div class="item-active" v-if="isActiveMainPageAside">
      <HomeContentAsideActive :isActive="isActiveMainPageAside" />
    </div>

    <div class="item" v-if="!isActiveMainPageAside">
      <HomeContentAside v-if="!isActiveMainPageAside" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  margin-right: 17px;
  width: v-bind('asideWidth');
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
}

.nav-aside {
  height: 40px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
  color: var(--kungalgame-white);
  cursor: pointer;
  background-color: var(--kungalgame-blue-5);
  border-radius: 20px;
  box-shadow: var(--kungalgame-shadow-0);

  span {
    white-space: nowrap;
    margin-left: 10px;
  }

  .icon {
    font-size: 17px;
  }
}

.item-active {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.item {
  height: 96.6%;
}
</style>
