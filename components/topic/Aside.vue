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
        name="line-md:arrow-left"
        style="font-size: 17px"
        v-if="isActiveAside"
      />
      <Icon
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
      <TopicAsideBase :isActive="!isActiveAside" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aside {
  margin-right: 5px;
  width: v-bind('asideWidth');
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
  overflow-y: scroll;
  flex-shrink: 0;

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
  /* 字体设置 */
  font-size: small;
  color: var(--kungalgame-font-color-3);
  cursor: pointer;
}

.item-active {
  display: flex;
  flex-grow: 1;
}

.item {
  height: 96.6%;
}
</style>
