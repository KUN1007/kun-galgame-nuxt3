<script setup lang="ts">
const props = defineProps<{
  name?: string
  avatar?: string
  moemoepoint?: number
}>()

const isShowProgress = ref(false)

const mpWidth = computed(() => {
  return props.moemoepoint ? `${props.moemoepoint % 100}%` : '0%'
})

onMounted(() => (isShowProgress.value = true))
</script>

<template>
  <div class="header">
    <div class="avatar" v-if="props.avatar">
      <NuxtImg :src="props.avatar" :alt="props.name" />
    </div>

    <div class="name">
      <span>{{ props.name }}</span>
    </div>

    <div class="moemoepoint">
      <Transition name="progress">
        <div v-if="isShowProgress" class="mp-progress"></div>
      </Transition>
      <p>
        <span><Icon name="lucide:lollipop"></Icon></span>
        <span>{{ props.moemoepoint }}</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 150px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.avatar {
  position: absolute;
  top: 5px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  left: 50px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
  }

  &:hover {
    animation: spin 1s;
  }
}

.name {
  flex-grow: 2;
  width: 100%;
  background-color: var(--kungalgame-trans-blue-0);
  border-radius: 10px 10px 0 0;
  align-items: center;

  span {
    font-family: serif;
    position: absolute;
    font-size: 22px;
    margin-left: 210px;
    margin-top: 60px;
    z-index: 1;
  }
}

@keyframes spin {
  50% {
    transform: rotate(360deg);
  }
  70% {
    transform: scale(1.1);
  }
  80% {
    box-shadow: 0px 0px 2px 7px var(--kungalgame-trans-blue-2);
  }
}

.moemoepoint {
  height: 1px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  z-index: 1;

  p {
    position: absolute;
    right: 0;
    font-size: 17px;
    padding-right: 20px;
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--kungalgame-pink-4);

      &:nth-child(1) {
        font-size: 20px;
      }
    }
  }
}

.mp-progress {
  transition: width 0.5s;
  height: 100%;
  width: v-bind(mpWidth);
  background-color: var(--kungalgame-trans-pink-1);
}

.progress-enter-active {
  width: 0;
}

@media (max-width: 700px) {
  .header {
    height: 110px;
  }

  .avatar {
    left: 30px;
    width: 100px;
    height: 100px;
  }

  .name {
    span:nth-child(1) {
      margin-left: 150px;
      margin-top: 40px;
    }

    span:nth-child(2) {
      bottom: 30%;
      font-size: 50px;
    }
  }
}
</style>
