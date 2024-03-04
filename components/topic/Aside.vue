<script setup lang="ts">
const props = defineProps<{
  tags: string[]
  uid: number
}>()

const { tags, uid } = toRefs(props)
const { isActiveAside } = storeToRefs(usePersistKUNGalgameTopicStore())
const asideWidth = ref('250px')
const handleFold = () => {
  isActiveAside.value = !isActiveAside.value
}

watch(
  isActiveAside,
  () => {
    asideWidth.value = isActiveAside.value ? '250px' : '40px'
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
        style="font-size: 17px"
        v-if="isActiveAside"
      />
      <Icon
        class="icon"
        name="line-md:arrow-right"
        style="font-size: 17px"
        v-if="!isActiveAside"
      />

      <span v-if="isActiveAside">{{ $t('mainPage.asideActive.fold') }}</span>
    </div>

    <div class="item-active" v-if="isActiveAside">
      <TopicAsideActive :tags="tags" :uid="uid" />
    </div>

    <div class="item" v-if="!isActiveAside">
      <TopicAsideBase :is-active="!isActiveAside" />
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
  transition: width 0.5s;
  overflow-y: scroll;
  flex-shrink: 0;
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: var(--kungalgame-shadow-0);
  padding: 10px;

  span {
    white-space: nowrap;
  }
}

.nav-aside {
  height: 40px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
  margin-bottom: 17px;
  border-bottom: 2px solid var(--kungalgame-blue-5);
  color: var(--kungalgame-font-color-3);

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
}

.item {
  height: 96.6%;
}
</style>
