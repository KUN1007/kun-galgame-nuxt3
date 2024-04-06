<script setup lang="ts">
import { navBarRoute } from './utils/routeName'

const { uid: storeUid, roles } = storeToRefs(usePersistUserStore())

const props = defineProps<{
  uid: number
}>()

const currentPageUid = computed(() => props.uid)

const currentPageUserRoles = computed(() => {
  if (!storeUid.value) {
    return 1
  }

  if (props.uid === storeUid.value) {
    return 4
  } else {
    return roles.value
  }
})

const isShowNavItem = (permission: number[]) =>
  permission.includes(currentPageUserRoles.value)

const activeClass = (currentPageUid: number, routeName: string) => {
  return useRouteFullPath().value ===
    `/kungalgamer/${currentPageUid}/${routeName}`
    ? 'active'
    : ''
}
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
      <NuxtLinkLocale
        :to="`/kungalgamer/${currentPageUid}/${kun.router}`.toString()"
      >
        <span>{{ $t(`user.nav.${kun.name}`) }}</span>
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  height: 100%;
  width: 120px;
  border-radius: 0 0 0 7px;
  border-right: 1px solid var(--kungalgame-blue-5);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.item {
  height: 40px;
  background-color: var(--kungalgame-trans-blue-0);
  display: flex;

  &:hover {
    background-color: var(--kungalgame-trans-blue-2);
  }

  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--kungalgame-blue-5);
  }
}

.active {
  background-color: var(--kungalgame-blue-5);

  &:hover {
    background-color: var(--kungalgame-blue-5);
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
