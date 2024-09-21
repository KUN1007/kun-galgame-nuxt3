<script setup lang="ts"></script>

<template>
  <div class="content">
    <p>
      あなたが鯤ギャルゲームフォーラムの会員として登録すると、あなたは鯤ギャルゲーム
      フォーラムのユーザーとなり、次のユーザー契約を確認したものとみなします：
    </p>
    <p>
      1. ユーザーが発表したすべての意見は、鯤ギャルゲーム
      フォーラムとは一切関係ありません。
    </p>
    <p>
      2. 鯤ギャルゲームフォーラムは、オープンソースの協力的な Web
      開発プロジェクトであり、すべての人が Web 知識を学ぶためのものです。
    </p>
    <p>
      3.
      ユーザーが私たちのオープンソースプロジェクトの維持に不利益をもたらす行動をした場合、私たちはユーザーを禁止する権利を有します。
    </p>
    <p>
      4. ユーザーアカウントの盗難等によって発生した損失について、鯤ギャルゲーム
      フォーラムは一切の責任を負いません。
    </p>
    <p>契約バージョン - V 1.0.1</p>
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
