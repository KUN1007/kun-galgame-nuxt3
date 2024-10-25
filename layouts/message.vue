<script setup lang="ts">
import DefaultLayout from './default.vue'

const route = useRoute()
const getRouteBaseName = useRouteBaseName()
const baseRouteName = computed(() => {
  return getRouteBaseName(route)
})

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth < 700
})

const isShowAside = computed(() => {
  if (isMobile.value && baseRouteName.value !== 'message') {
    return false
  }
  return true
})

const isShowContent = computed(() => {
  return (
    !isMobile.value || (isMobile.value && baseRouteName.value !== 'message')
  )
})
</script>

<template>
  <DefaultLayout>
    <div class="content-container">
      <MessageAsideContainer v-show="isShowAside" class="aside" />

      <div v-show="isShowContent" class="content">
        <slot />
        <KunFooter />
      </div>
    </div>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
.content-container {
  border-radius: 10px;
  height: calc(100dvh - 75px);
  transition: width 0.2s;
  max-width: 80rem;
  margin: auto;
  display: flex;
}

.content {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
  margin-left: 16px;

  @include kun-blur;
}

.kun-footer {
  margin: 16px 0;
}

@media (max-width: 700px) {
  .aside {
    width: 100%;
    max-width: unset;
    margin: 0 5px;
  }

  .content {
    margin-left: 0;
    width: 100%;
  }
}
</style>
