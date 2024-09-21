<script setup lang="ts"></script>

<template>
  <div class="article">
    <br />
    <p>
      私たちはあなたの個人情報を決して利用せず、このサイト以外の場所であなたの個人情報を使用することはありません。
    </p>
    <br />
    <p>
      はい、この一言だけです。なぜなら、<strong>私たちは商業フォーラムではなく、利益を目的としていない</strong>ため、個人データを使ってお金を稼ぐ必要はありません。
    </p>
    <br />
    <p>正確に言うと、以下の権限を使用する必要があります：</p>
    <br />
    <ul class="list">
      <li>
        個人関連：メールアドレス、登録日時など、パスワードを回復するために使用します。
      </li>
      <li>
        ログ関連：クッキーやローカルストレージなどの手段を通じて、検索履歴や画像キャッシュなどの体験を最適化するために使用します。クッキーを無効にすることで、私たちの使用を禁止できます。
      </li>
      <li>
        デバイス関連：デバイスの日付やオペレーティングシステム情報など、デバイスの適応を容易にします。
      </li>
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
