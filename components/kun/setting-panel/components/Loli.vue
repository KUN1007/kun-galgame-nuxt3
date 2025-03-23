<script setup lang="ts">
import { getLoli } from './getLoli'

const loliData = ref({
  loliBodyLeft: '',
  loliBodyTop: '',
  loliEyeLeft: '',
  loliEyeTop: '',
  loliBrowLeft: '',
  loliBrowTop: '',
  loliMouthLeft: '',
  loliMouthTop: '',
  loliFaceLeft: '',
  loliFaceTop: '',
  body: '',
  eye: '',
  brow: '',
  mouth: '',
  face: ''
})

onMounted(async () => {
  loliData.value = await getLoli()
})
</script>

<template>
  <div class="hidden size-full shrink-0 sm:block">
    <div
      class="relative min-w-80"
      @click="async () => (loliData = await getLoli())"
      v-if="loliData.body"
    >
      <div class="absolute -top-80 -left-32 size-full shrink-0">
        <img
          class="absolute shrink-0"
          :src="loliData.body"
          alt="ren"
          :style="{ left: loliData.loliBodyLeft, top: loliData.loliBodyTop }"
        />
      </div>
      <div class="absolute -top-80 -left-32 size-full shrink-0">
        <img
          class="absolute"
          :src="loliData.eye"
          alt="ren"
          :style="{ left: loliData.loliEyeLeft, top: loliData.loliEyeTop }"
        />
      </div>
      <div class="absolute -top-80 -left-32 size-full shrink-0">
        <img
          class="absolute"
          :src="loliData.brow"
          alt="ren"
          :style="{ left: loliData.loliBrowLeft, top: loliData.loliBrowTop }"
        />
      </div>
      <div class="absolute -top-80 -left-32 size-full shrink-0">
        <img
          class="absolute"
          :src="loliData.mouth"
          alt="ren"
          :style="{ left: loliData.loliMouthLeft, top: loliData.loliMouthTop }"
        />
      </div>
      <div class="absolute -top-80 -left-32 size-full shrink-0">
        <img
          class="absolute"
          :src="loliData.face"
          alt="ren"
          :style="{ left: loliData.loliFaceLeft, top: loliData.loliFaceTop }"
        />
      </div>
    </div>
  </div>
</template>
