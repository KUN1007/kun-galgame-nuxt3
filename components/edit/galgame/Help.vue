<script setup lang="ts"></script>

<template>
  <div>
    <p>
      我们目前对 Galgame 的定义是，可以在 VNDB 检索到的游戏就是 Galgame,
      否则就不是。
    </p>
    <p>
      对检索不到的非 Galgame 游戏, 请大家暂时发布在话题的 Galgame ->其它 分类。
    </p>
    <p>
      <a
        href="https://www.kungal.com/zh-cn/topic/1040"
        target="_blank"
        rel="noopener noreferrer"
      >
        如何通过 VNDB 检索 Galgame?
      </a>
    </p>
    <p>
      在发布 Galgame 前, 您需要确定论坛中没有同样的 Galgame, 发布新 Galgame
      您将会获得 3 萌萌点。
    </p>
    <p>如果您要发布 Galgame 资源, 游戏不存在的话，您需要先创建游戏。</p>
    <p>
      <strong>
        如果游戏已存在, 可以到对应 Galgame 的界面添加 Galgame 资源链接。
      </strong>
    </p>
    <p>
      获取 Galgame 数据的 API 来源于 VNDB, 该 API 有频率限制,
      请大家合理使用。如果获取不到数据, 请大家手动填写。
    </p>
    <p class="note">
      注意，创建 Galgame 资源意味着您稍后必须到 Galgame 资源详情页面，添加一条该
      Galgame 资源的获取 / 下载链接。
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
