<script setup lang="ts"></script>

<template>
  <div>
    <p>
      現在の私たちのギャルゲームの定義は、VNDB で検索できるゲームがギャルゲーム
      であり、それ以外はギャルゲームではないということです。
    </p>
    <p>
      検索できない非ギャルゲームゲームについては、しばらくの間「トピックのギャルゲーム->
      その他」カテゴリに投稿してください。
    </p>
    <p>
      <a
        href="https://www.kungal.com/ja-jp/topic/1040"
        target="_blank"
        rel="noopener noreferrer"
      >
        VNDB を通じてギャルゲームを検索する方法は？
      </a>
    </p>
    <p>
      ギャルゲームを投稿する前に、フォーラム内に同じギャルゲーム
      がないことを確認する必要があります。新しいギャルゲームを投稿すると、3
      つの萌えポイントが獲得できます。
    </p>
    <p>
      ギャルゲーム
      のリソースを投稿する場合、ゲームが存在しない場合は、まずゲームを作成する必要があります。
    </p>
    <p>
      <strong>
        ゲームが既に存在する場合は、該当するギャルゲームのページに ギャルゲーム
        リソースのリンクを追加できます。
      </strong>
    </p>
    <p>
      ギャルゲームデータの API は VNDB から取得されており、API
      には頻度制限がありますので、適切に使用してください。データが取得できない場合は、手動で入力してください。
    </p>
    <p class="note">
      注意:ギャルゲームリソースを作成するということは、後でギャルゲーム
      リソースの詳細ページに移動し、その ギャルゲーム
      リソースの取得/ダウンロードリンクを追加する必要があることを意味します。
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
