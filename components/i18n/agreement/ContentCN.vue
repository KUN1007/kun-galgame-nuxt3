<script setup lang="ts"></script>

<template>
  <div class="content">
    <p>
      当您注册成为鲲 Galgame 论坛的会员时，您即成为鲲 Galgame
      论坛的用户，这时我们认为您已经确认以下用户协议：
    </p>
    <p>1. 用户所发表的一切言论与鲲 Galgame 论坛没有任何关系</p>
    <p>
      2. 鲲 Galgame 论坛只是一个开源的、合作的 Web 开发项目，目的是供所有人学习
      Web 知识
    </p>
    <p>3. 用户做出不利于我们开源项目维护的行为时，我们有权对用户进行封禁</p>
    <p>4. 因用户账号被盗等造成的损失, 鲲 Galgame 论坛概不承担</p>
    <p>协议版本 - V 1.0.1</p>
  </div>
</template>

<style lang="scss" scoped>
.content {
  & > p {
    margin: 5px;

    &:nth-child(2) {
      margin-top: 20px;
    }

    &:last-child {
      margin: 50px 0;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
