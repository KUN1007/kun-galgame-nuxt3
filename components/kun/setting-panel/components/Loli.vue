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
const isShowLoading = ref(false)

const reGetLoli = async () => {
  isShowLoading.value = true
  loliData.value = await getLoli()
  isShowLoading.value = false
}

onMounted(async () => {
  await reGetLoli()
})
</script>

<template>
  <div class="block size-full shrink-0">
    <div class="relative min-w-80" @click="reGetLoli" v-if="loliData.body">
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

    <KunSkeletonSettingsPanelLoli v-if="!loliData.body" />

    <KunLoading v-if="isShowLoading" style="top: 310px; left: 140px" />
  </div>
</template>
