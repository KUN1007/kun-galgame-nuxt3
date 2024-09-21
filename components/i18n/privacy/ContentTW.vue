<script setup lang="ts"></script>

<template>
  <div class="article">
    <br />
    <p>
      我們永遠不會利用妳的個人信息，不會將妳的個人信息用於除了本站以外的任何地方
    </p>
    <br />
    <p>
      是的，只有這一句，因為<strong>我們不是商業論壇，不以盈利為目的</strong>，沒必要用個人數據賺錢。
    </p>
    <br />
    <p>准確來講，我們需要使用以下權限：</p>
    <br />
    <ul class="list">
      <li>個人相關：郵箱、註冊時間等，用於找回密碼</li>
      <li>
        日誌相關：通過 cookies、Local Storage
        等手段，提供搜索歴史、圖片緩存等優化體驗，您可以通過禁用 cookies
        等手段來禁止我們使用
      </li>
      <li>設備相關：設備日期、操作繫統信息等，方便我們對設備進行適配</li>
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
