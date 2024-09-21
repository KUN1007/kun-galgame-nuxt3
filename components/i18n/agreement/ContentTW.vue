<script setup lang="ts"></script>

<template>
  <div class="content">
    <p>
      當您註冊成為鯤 Galgame 論壇的會員時，您即成為鯤 Galgame
      論壇的用戶，這時我們認為您已經確認以下用戶協議：
    </p>
    <p>1. 用戶所發錶的一切言論與鯤 Galgame 論壇沒有任何關繫</p>
    <p>
      2. 鯤 Galgame 論壇只是一個開源的、合作的 Web 開發項目，目的是供所有人學習
      Web 知識
    </p>
    <p>3. 用戶做出不利於我們開源項目維護的行為時，我們有權對用戶進行封禁</p>
    <p>4. 因用戶賬號被盜等造成的損失, 鯤 Galgame 論壇概不承擔</p>
    <p>協議版本 - V 1.0.1</p>
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
