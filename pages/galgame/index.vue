<script setup lang="ts">
const description = `${kungal.titleShort} Galgame 资源页面, 提供各类 Galgame 下载, Galgame 资源, Galgame Wiki, Galgame 情报, Galgame 引擎, Galgame 官网, 汉化, 英语, 生肉, 日语 Windows, macOS, PC, 应用, 直装, 模拟器, 安卓, Linux`

useSeoMeta({
  title: 'Galgame 资源 wiki',
  description,
  ogTitle: kungal.title,
  ogDescription: description
})
</script>

<template>
  <GalgameCardContainer />
</template>
