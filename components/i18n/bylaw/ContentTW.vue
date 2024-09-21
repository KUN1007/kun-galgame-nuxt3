<script setup lang="ts"></script>

<template>
  <div class="article">
    <div class="title">執行條例（試行）</div>
    <div class="tips">
      <p>
        這是執行條例，✔
        代錶已經落實。目的是讓論壇的運行機制更加透明，併不是規矩
      </p>
    </div>

    <div class="moemoepoint">
      <h2>萌萌點</h2>

      <div class="gain">
        <h3>獲取方法</h3>
        <ul>
          <li>每個註冊用戶初始擁有 1007 萌萌點 ✔</li>
          <li>每天簽到獲得隨機 0 ~ 7 萌萌點，簽到每日零點刷新 ✔</li>
          <li>話題被回復, 發佈話題者獲得 2 點萌萌點 ✔</li>
          <li>話題被推，將會獲得 3 點萌萌點 ✔</li>
          <li>話題被收藏，可以獲得 1 萌萌點 ✔</li>
          <li>回復被評論, 發佈回復者獲得 1 萌萌點 ✔</li>
          <li>回復被推，將會獲得 1 點萌萌點 ✔</li>
          <li>用戶的話題 / 回復 / 評論被點贊，可以獲得 1 萌萌點 ✔</li>
          <li>發佈 Galgame 將會獲得 3 萌萌點 ✔</li>
          <li>發佈 Galgame 被點贊、評論、收藏, 發佈者獲得 1 萌萌點 ✔</li>
          <li>發佈 Galgame 資源將會獲得 3 萌萌點 ✔</li>
          <li>發佈 Galgame 合併請求被合併, 提出請求者將會獲得 1 萌萌點 ✔</li>
          <li>Galgame 資源被點贊, 發佈者獲得 1 萌萌點 ✔</li>
          <li>Galgame 評論被其它人評論, 被評論者獲得 1 萌萌點 ✔</li>
        </ul>
      </div>

      <div class="deduct">
        <h3>扣除方法</h3>
        <ul>
          <li>
            用戶的不萌行為，根據嚴重程度，將會被扣除 7, 17, 77, 177, 777
            點萌萌點
          </li>
          <li>單個話題每被踩 10 次，若審核無誤，扣除 100 萌萌點</li>
          <li>用戶推話題一次將會被扣除 7 萌萌點，可以重復推話題 ✔</li>
          <li>用戶推回復一次將會被扣除 2 萌萌點，可以重復推回復 ✔</li>
        </ul>
      </div>
    </div>

    <div class="kungalgamer">
      <h2>用戶</h2>
      <ul>
        <li><strong>萌萌點低於 1000 的用戶將會被刪除賬戶</strong></li>
        <li>萌萌點低於 1100 的用戶無法使用“推話題”功能 ✔</li>
        <li>連續 “踩” 10 次將會被刪除賬戶（我們希望少一點批評，多一點贊美）</li>
      </ul>
    </div>

    <div class="topic">
      <h2>話題</h2>
      <ul>
        <li>
          每個位於主頁的話題處於“動態推送狀態”，一旦該話題受到包括“點贊”“評論”“推話題”的影響時，該話題將會被置頂
          ✔
        </li>
        <li>
          話題熱度值計算公式：熱度值 = 瀏覽數 × 0.1 評論數 × 2 + 點贊數 × 2 +
          推話題數 × 50 – 踩 × 5 ✔
        </li>
        <li>話題被推 10 小時內會獲得“流光”樣式 ✔</li>
        <li>一旦單個話題“踩”的數量達到 10，該話題會被繫統屏蔽，交由管理審核</li>
        <li>
          每天晚上 12: 00 話題池會清空一輪，留下昨天話題熱度值最高的 17
          個話題，熱度值相同則都被推送
        </li>
      </ul>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<style lang="scss" scoped>
.article {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 30px;
  margin: 17px 0;
  display: flex;
  justify-content: center;
}

.tips {
  border-top: 2px solid var(--kungalgame-blue-5);
  padding-top: 10px;

  span {
    cursor: pointer;
    border-bottom: 1px solid var(--kungalgame-blue-5);

    a {
      color: var(--kungalgame-blue-5);
    }
  }
}

h2 {
  margin-top: 30px;
  margin-bottom: 17px;
}

.moemoepoint ul {
  li {
    margin: 5px 0;
  }
}

.kungalgamer > ul {
  li {
    margin: 5px 0;
  }
}

.topic > ul {
  li {
    margin: 5px 0;
  }
}
</style>
