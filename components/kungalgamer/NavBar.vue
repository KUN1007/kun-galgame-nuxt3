<script setup lang="ts">
import { navBarRoute } from './routeName'

const { uid, roles } = storeToRefs(useKUNGalgameUserStore())

const props = defineProps<{
  uid: number
}>()

const route = useRoute()
const currentPageUid = ref(0)

const currentPageUserRoles = computed(() => {
  if (props.uid === uid.value) {
    return 4
  } else {
    return roles.value
  }
})

const isShowNavItem = (permission: number[]) =>
  permission.includes(currentPageUserRoles.value)

const activeClass = (currentPageUid: number, routeName: string) => {
  return route.fullPath === `/kungalgamer/${currentPageUid}/${routeName}`
    ? 'active'
    : ''
}

watch(
  () => props.uid,
  () => {
    currentPageUid.value = props.uid
  },
  { immediate: true }
)
</script>

<template>
  <div class="nav">
    <div
      class="item"
      v-for="kun in navBarRoute"
      :key="kun.index"
      :class="activeClass(currentPageUid, kun.router)"
      v-show="isShowNavItem(kun.permission)"
    >
      <NuxtLink :to="`/kungalgamer/${currentPageUid}/${kun.router}`">
        <span>{{ $tm(`user.nav.${kun.name}`) }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  height: 100%;
  width: 120px;
  background-color: var(--kungalgame-trans-pink-0);
  border-radius: 0 0 0 7px;
  border-right: 1px solid var(--kungalgame-blue-4);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.item {
  height: 40px;
  background-color: var(--kungalgame-trans-blue-0);
  display: flex;
  transition: all 0.2s;

  &:hover {
    background-color: var(--kungalgame-trans-blue-2);
  }

  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--kungalgame-blue-4);
  }
}

.active {
  background-color: var(--kungalgame-blue-4);

  &:hover {
    background-color: var(--kungalgame-blue-4);
  }

  a {
    color: var(--kungalgame-white);
  }
}

@media (max-width: 700px) {
  .nav {
    width: 70px;
    font-size: small;
  }
}
</style>
