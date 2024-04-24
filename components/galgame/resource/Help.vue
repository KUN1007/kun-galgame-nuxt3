<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
  <div class="help">
    <div v-if="locale === 'en-us'">
      <p>
        <strong>
          All links are added by users, the KUN Visual Novel Forum does not
          provide any download functionality
        </strong>
      </p>
      <p>You can earn 3 moemoepoints for each resource link you publish</p>
      <p>
        If a resource link is deleted, the moemoepoints obtained through that
        link will also be deducted
      </p>
      <p>
        <strong>
          All resource links must be related to the game on this page, must be
          free, and cannot require points or paid downloads
        </strong>
      </p>
      <p>
        All links must be in hyperlink format, and cannot be mixed with other
        non-hyperlink formatted text, such as cloud storage types
      </p>
      <p>
        Resource links can be magnet links, cloud storage links, URLs, etc. You
        can contribute resource links repeatedly, but each person can only
        contribute once for the same type of link (same cloud storage, URL,
        etc.).
      </p>
      <p>
        You are allowed to link to other websites, but the target website must
        allow open downloads (forbidden login to download)
      </p>
      <p>
        Violating resource links can be reported, and if you have other needs,
        please post a topic in Others -> Forum-related
      </p>
    </div>

    <div v-if="locale === 'zh-cn'">
      <p>
        <strong>所有链接为用户添加, 鲲 Galgame 论坛不提供任何下载功能</strong>
      </p>
      <p>每发布一个资源链接您可以获得 3 萌萌点</p>
      <p>资源链接被删除, 通过资源链接获得的萌萌点也会被扣除</p>
      <p>
        <strong>
          所有资源链接必须与该页面游戏相关, 必须免费, 不得付积分、付费下载
        </strong>
      </p>
      <p>所有链接必须为链接格式, 不能参杂其它非链接格式的文字, 例如网盘类型</p>
      <p>
        资源链接可以是磁链、网盘、网址等等, 可以重复贡献资源链接, 但是同类型链接
        (同种网盘, 网址等) 每人仅可贡献一次
      </p>
      <p>
        允许将资源链接指向其它网址, 但是该网址必须开放下载 (禁止未登录无法下载)
      </p>
      <p>违规资源链接可举报, 若有其它需求, 请在 其它 -> 论坛相关 发布话题</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
