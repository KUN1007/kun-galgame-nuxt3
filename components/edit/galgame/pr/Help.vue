<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <KunHeader :size="1">
    <template #header>
      {{ $t('edit.pr.name') }}
    </template>
  </KunHeader>

  <EditGalgameSite />

  <div class="help" v-if="locale === 'en-us'">
    <p>
      To update visualnovel information, you need to submit an update request.
    </p>
    <p>
      When this request is confirmed for merge by the publisher of the
      visualnovel resource, a user with more than 1100 MoeMoePoints, or a forum
      administrator, the update will take effect.
    </p>
    <p>
      If the update request is merged, you will receive 1 MoeMoePoint. The
      requester and reviewer will be added to the contributors, but
      self-modifications are not counted.
    </p>
  </div>

  <div class="help" v-if="locale === 'ja-jp'">
    <p>Galgameの情報を更新するには、更新リクエストを提出する必要があります。</p>
    <p>
      このリクエストがGalgameリソースの投稿者、萌萌ポイントが1100を超えるユーザー、
      またはフォーラム管理者によって確認・統合された場合のみ、更新が反映されます。
    </p>
    <p>
      リクエストの更新が統合されると、1萌萌ポイントが獲得できます。リクエスト提出者と
      審査者は貢献者に追加されますが、自分で修正した場合は対象外となります。
    </p>
  </div>

  <div class="help" v-if="locale === 'zh-cn'">
    <p>要更新 Galgame 信息, 需要提出更新请求</p>
    <p>
      当该请求被该 Galgame 资源的发布者、或萌萌点大于 1100
      的用户、或论坛管理员确认合并后, 该更新才会生效
    </p>
    <p>
      若请求更新被合并, 将获得 1 萌萌点, 请求提出者和审核者会被加入贡献者中,
      自己修改不计
    </p>
  </div>

  <div class="help" v-if="locale === 'zh-tw'">
    <p>要更新 Galgame 信息, 需要提出更新請求</p>
    <p>
      當該請求被該 Galgame 資源的發佈者、或萌萌點大於 1100
      的用戶、或論壇管理員確認合併後, 該更新才會生效
    </p>
    <p>
      若請求更新被合併, 將獲得 1 萌萌點, 請求提出者和審核者會被加入貢獻者中,
      自己修改不計
    </p>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 17px;

  @include kun-blur;
}

.help {
  border-left: 5px solid var(--kungalgame-blue-5);
  padding-left: 17px;
  margin-bottom: 17px;
  font-size: small;

  p {
    margin-bottom: 7px;
  }
}
</style>
