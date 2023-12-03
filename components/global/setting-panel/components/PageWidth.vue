<script setup lang="ts">
import { ref, computed, onMounted, onActivated, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useKUNGalgameSettingsStore } from '@/store/modules/settings'
import { storeToRefs } from 'pinia'

const route = useRoute()

const settingsStore = useKUNGalgameSettingsStore()
const { showKUNGalgamePageWidth } = storeToRefs(settingsStore)

const pageWidth = ref(0)
const routeName = computed(() => route.name as string)
const isDisabled = ref(false)

const pageNameArray = [
  'KUN',
  'Topic',
  'Edit',
  'KUNGalgame',
  'Pool',
  'Bylaw',
  'Technique',
  'ThanksList',
]

const initPageWidth = () => {
  if (pageNameArray.includes(routeName.value)) {
    pageWidth.value = showKUNGalgamePageWidth.value[routeName.value]
    isDisabled.value = false
  } else {
    isDisabled.value = true
  }
}

watch(pageWidth, () => {
  if (pageNameArray.includes(routeName.value)) {
    showKUNGalgamePageWidth.value[routeName.value] = pageWidth.value
  }
})

onMounted(() => {
  initPageWidth()
})

onActivated(() => {
  initPageWidth()
})
</script>

<template>
  <div
    class="width"
    :class="isDisabled ? 'disabled' : ''"
    :title="isDisabled ? `${$tm('header.settings.disabled')}` : ''"
  >
    <div class="width-container">
      <span>{{ $tm('header.settings.width') }}</span>
      <span>{{ pageWidth }}%</span>
    </div>

    <div class="page-width">
      <span>50%</span>
      <input
        class="main"
        min="50"
        max="90"
        step="0.1"
        type="range"
        v-model="pageWidth"
        :disabled="isDisabled"
      />
      <span>90%</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-width {
  width: 100%;
  font-size: 15px;
  display: flex;

  span {
    margin-top: 15px;
  }
}

.main {
  width: 100%;
  height: 10px;
  margin: 20px 0;
}

.width-container {
  display: flex;
  justify-content: space-between;
}

.disabled {
  cursor: not-allowed;
  color: var(--kungalgame-font-color-0);

  input {
    cursor: not-allowed;
  }
}
</style>
