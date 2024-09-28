<script setup lang="ts">
import img from './loli'
import 'animate.css'

const { showInfo, infoMsg, infoTranslateParams, durations } = storeToRefs(
  useComponentMessageStore()
)

const { loli, name } = img
const timer = ref<NodeJS.Timeout | null>()
const progressWidth = ref('')

const handleClose = () => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }

  showInfo.value = false
}

watch(
  () => showInfo.value,
  (newValue) => {
    if (newValue) {
      const startTime = Date.now()
      timer.value = setInterval(() => {
        const currentTime = Date.now()
        const elapsedTime = currentTime - startTime
        const elapsedPercentage = (elapsedTime / durations.value) * 100
        const remainingPercentage = Math.max(1, 100 - elapsedPercentage)
        progressWidth.value = remainingPercentage + '%'
        if (remainingPercentage <= 1 && timer.value) {
          clearInterval(timer.value)
          timer.value = null
          showInfo.value = false
        }
      }, 10)
    } else if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }
)
</script>

<template>
  <Teleport to="body" :disabled="!showInfo">
    <Transition
      enter-active-class="animate__animated animate__fadeInUp animate__faster"
      leave-active-class="animate__animated animate__fadeOutDown animate__faster"
    >
      <div class="container" v-if="showInfo">
        <Transition
          enter-active-class="animate__animated animate__swing"
          appear
        >
          <div class="lass">
            <span>{{ name }}</span>
          </div>
        </Transition>

        <div class="avatar">
          <NuxtImg :src="loli" />
        </div>

        <Transition
          enter-active-class="animate__animated animate__bounceInRight animate__faster"
          appear
        >
          <!-- A ha ha ha! You probably didn't expect that this was inspired by しゅがてん！-Sugarfull tempering- -->
          <div class="info">
            {{ `「 ${$t(infoMsg, { params: infoTranslateParams })} 」` }}
          </div>
        </Transition>

        <div class="close" @click="handleClose">
          <Icon class="icon" name="lucide:x" />
        </div>

        <span class="progress"></span>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.container {
  min-height: 120px;
  width: 100%;
  border-top: 1px solid var(--kungalgame-blue-2);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;

  @include kun-blur;
}

.lass {
  padding: 5px;
  font-size: 20px;
  position: absolute;
  top: -41px;
  padding-left: 150px;
  border-bottom: none;
  filter: drop-shadow(2px 4px 3px var(--kungalgame-trans-blue-4));

  span {
    padding: 0 50px;
    text-align: center;
    background-color: var(--kungalgame-trans-white-2);
    font-size: 24px;
    clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0 50%);
  }
}

.avatar {
  position: absolute;
  margin-top: 10px;
  margin-left: 20px;
  pointer-events: none;
  user-select: none;

  img {
    height: 100px;
    width: 100%;
  }
}

.info {
  margin-top: 20px;
  margin-left: 150px;
  margin-right: 50px;
  font-size: 20px;
  color: var(--kungalgame-white);
  text-shadow:
    0 1px var(--kungalgame-font-color-3),
    1px 0 var(--kungalgame-font-color-3),
    -1px 0 var(--kungalgame-font-color-3),
    0 -1px var(--kungalgame-font-color-3),
    1px 2px var(--kungalgame-font-color-3),
    1px 2px var(--kungalgame-font-color-3),
    1px 2px var(--kungalgame-font-color-3),
    1px 2px var(--kungalgame-font-color-3);
}

.close {
  font-size: 30px;
  position: absolute;
  top: 0;
  right: 0;
  color: var(--kungalgame-font-color-1);
}

.progress {
  position: absolute;
  height: 5px;
  width: v-bind(progressWidth);
  background-color: var(--kungalgame-blue-5);
  top: 0;
  right: 0;
}

@media (max-width: 700px) {
  .container {
    min-height: 77px;
  }

  .lass {
    padding: 5px;
    font-size: 15px;
    padding-left: 20px;
    top: -33px;

    span {
      font-size: 17px;
    }
  }
  .info {
    margin-top: 10px;
    margin-right: 30px;
    margin-left: 77px;
  }

  .avatar {
    img {
      height: 50px;
      width: 100%;
    }
  }
}
</style>
