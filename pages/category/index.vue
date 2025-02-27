<script setup lang="ts">
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
</script>

<template>
  <div class="root">
    <Category />
  </div>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 80rem;
  margin: 0 auto;
  color: var(--kungalgame-font-color-3);
}

@media (max-width: 700px) {
  .root {
    margin: 0 5px;
  }
}
</style>
