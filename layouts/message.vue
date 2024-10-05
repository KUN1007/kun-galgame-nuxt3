<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { finish } = useLoadingIndicator()

const isMobile = ref(false)

const handleResize = () => {
  isMobile.value = window.innerWidth <= 700
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

// TODO: A problem that when switch to '/message' page, <NuxtLoadingIndicator /> not finish
watch(
  () => route.name,
  () => {
    if (route.path === '/message') {
      finish()
    }
  }
)

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const isMessageRoute = computed(() => route.path === '/message')
const isOtherRoute = computed(() => !isMessageRoute.value)
</script>

<template>
  <div class="content-container">
    <MessageAsideContainer v-if="isMessageRoute || !isMobile" class="aside" />

    <div v-if="isOtherRoute || !isMobile" class="content">
      <NuxtPage />
      <KunFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  border-radius: 10px;
  height: calc(100dvh - 75px);
  transition: width 0.2s;
  max-width: 64rem;
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
