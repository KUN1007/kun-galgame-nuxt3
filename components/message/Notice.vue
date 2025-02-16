<script setup lang="ts"></script>

<template>
  <div class="container">
    <h2>提示</h2>
    <div>本消息系统尚在开发中, 但是功能应该足够用</div>
    <div>如果您有任何问题, 请查看这个话题</div>
    <a
      href="https://www.kungal.com/zh-cn/topic/1650"
      target="_blank"
      rel="noopener noreferrer"
    >
      [公告] 有关论坛消息系统的说明
    </a>
    <div>
      本论坛依旧是完全开源的, 如果您觉得不错, 可以给我们的 GitHub 项目点一个
      star
    </div>
    <a
      href="https://github.com/KUN1007/kun-galgame-nuxt3"
      target="_blank"
      rel="noopener noreferrer"
    >
      https://github.com/KUN1007/kun-galgame-nuxt3
    </a>
  </div>
</template>

<style lang="scss" scoped>
.container {
  line-height: 2rem;
  padding: 10px;

  h2 {
    margin-bottom: 8px;
  }

  a {
    color: var(--kungalgame-blue-5);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  height: 100%;
}
</style>
