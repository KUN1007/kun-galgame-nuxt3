<script setup lang="ts">
const handleClickContribute = () => {
  useMessage(10534, 'info')
}
</script>

<template>
  <div class="text-default-500 text-sm italic">
    <span>该项暂时为空</span>
    <span class="text-primary cursor-pointer" @click="handleClickContribute">
      欢迎贡献条目
    </span>
  </div>
</template>
