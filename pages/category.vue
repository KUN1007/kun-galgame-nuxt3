<script setup lang="ts">
import { kunCategoryAvailableItem } from '~/constants/category'

useHead({
  title: `话题分类 - ${kungal.titleShort}`,
  meta: [
    {
      name: 'description',
      content:
        '话题分类 / 分区,Galgame攻略,Galgame闲聊,Galgame寻求资源,Galgame资讯,Galgame新作消息,Galgame资源下载 Web,编程语言,Linux,实用技术,AI,逆向工程,Android,Adobe,算法, 动漫,漫画,音乐,轻小说'
    }
  ]
})

const activeTab = computed(
  () => useRoute().fullPath.split('/').pop() || 'galgame'
)
</script>

<template>
  <div class="flex flex-col space-y-3">
    <KunTab
      :items="kunCategoryAvailableItem"
      :model-value="activeTab"
      inner-class-name="shadow border"
      size="sm"
    />
    <NuxtPage />
  </div>
</template>
