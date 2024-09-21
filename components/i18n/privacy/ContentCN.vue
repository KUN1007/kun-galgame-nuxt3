<script setup lang="ts"></script>

<template>
  <div class="article">
    <br />
    <p>
      我们永远不会利用你的个人信息，不会将你的个人信息用于除了本站以外的任何地方
    </p>
    <br />
    <p>
      是的，只有这一句，因为<strong>我们不是商业论坛，不以盈利为目的</strong>，没必要用个人数据赚钱。
    </p>
    <br />
    <p>准确来讲，我们需要使用以下权限：</p>
    <br />
    <ul class="list">
      <li>个人相关：邮箱、注册时间等，用于找回密码</li>
      <li>
        日志相关：通过 cookies、Local Storage
        等手段，提供搜索历史、图片缓存等优化体验，您可以通过禁用 cookies
        等手段来禁止我们使用
      </li>
      <li>设备相关：设备日期、操作系统信息等，方便我们对设备进行适配</li>
    </ul>

    <div class="nav">
      <KunBackToPrevious />
      <KunBackToHome />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article {
  padding: 20px;
}

.list > li {
  margin-bottom: 30px;
  list-style: inside;
}

.title {
  font-size: 30px;
  height: 77px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.nav {
  display: flex;
  justify-content: space-between;
}
</style>
