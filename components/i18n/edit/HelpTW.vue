<script setup lang="ts"></script>

<template>
  <div>
    <p>
      我們目前對 Galgame 的定義是，可以在 VNDB 檢索到的遊戲就是 Galgame,
      否則就不是。
    </p>
    <p>
      對檢索不到的非 Galgame 遊戲, 請大家暫時發佈在話題的 Galgame ->其它 分類。
    </p>
    <p>
      <a
        href="https://www.kungal.com/zh-tw/topic/1040"
        target="_blank"
        rel="noopener noreferrer"
      >
        如何通過 VNDB 檢索 Galgame?
      </a>
    </p>
    <p>
      在發佈 Galgame 前, 您需要確定論壇中沒有同樣的 Galgame, 發佈新 Galgame
      您將會獲得 3 萌萌點。
    </p>
    <p>如果您要發佈 Galgame 資源, 遊戲不存在的話，您需要先創建遊戲。</p>
    <p>
      <strong>
        如果遊戲已存在, 可以到對應 Galgame 的界面添加 Galgame 資源鏈接。
      </strong>
    </p>
    <p>
      獲取 Galgame 數據的 API 來源於 VNDB, 該 API 有頻率限制,
      請大家合理使用。如果獲取不到數據, 請大家手動填寫。
    </p>
    <p class="note">
      註意，創建 Galgame 資源意味著您稍後必須到 Galgame 資源詳情頁面，添加一條該
      Galgame 資源的獲取 / 下載鏈接。
    </p>
  </div>
</template>

<style lang="scss" scoped>
.help {
  a {
    color: var(--kungalgame-blue-5);

    .icon {
      margin-left: 10px;
    }
  }
}

.site {
  display: flex;
  flex-wrap: wrap;
  margin: 17px 0;

  a {
    font-weight: bold;
    color: var(--kungalgame-blue-5);
    padding: 3px 7px;
    border-bottom: 2px solid transparent;
    margin-right: 10px;

    &:first-child {
      color: var(--kungalgame-red-5);
    }

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}

.definition {
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 17px;

  a {
    color: var(--kungalgame-blue-5);
    font-style: oblique;
  }

  p {
    margin-top: 10px;
  }
}

.note {
  color: var(--kungalgame-red-5);
}
</style>
