<script setup lang="ts">
import { usePluginViewContext } from '@prosemirror-adapter/vue'

const { view } = usePluginViewContext()

const size = computed(() => {
  return view.value.state.doc.textContent.length
})
</script>

<template>
  <div class="footer">
    <span> {{ `${size} 字` }} </span>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 10px 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-left: auto;
    font-size: small;
  }
}
</style>
