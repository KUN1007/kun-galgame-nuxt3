<script setup lang="ts"></script>

<template>
  <div class="article">
    <div class="title">执行条例（试行）</div>
    <div class="tips">
      <p>
        这是执行条例，✔
        代表已经落实。目的是让论坛的运行机制更加透明，并不是规矩
      </p>
    </div>

    <div class="moemoepoint">
      <h2>萌萌点</h2>

      <div class="gain">
        <h3>获取方法</h3>
        <ul>
          <li>每个注册用户初始拥有 1007 萌萌点 ✔</li>
          <li>每天签到获得随机 0 ~ 7 萌萌点，签到每日零点刷新 ✔</li>
          <li>话题被回复, 发布话题者获得 2 点萌萌点 ✔</li>
          <li>话题被推，将会获得 3 点萌萌点 ✔</li>
          <li>话题被收藏，可以获得 1 萌萌点 ✔</li>
          <li>回复被评论, 发布回复者获得 1 萌萌点 ✔</li>
          <li>回复被推，将会获得 1 点萌萌点 ✔</li>
          <li>用户的话题 / 回复 / 评论被点赞，可以获得 1 萌萌点 ✔</li>
          <li>发布 Galgame 将会获得 3 萌萌点 ✔</li>
          <li>发布 Galgame 被点赞、评论、收藏, 发布者获得 1 萌萌点 ✔</li>
          <li>发布 Galgame 资源将会获得 3 萌萌点 ✔</li>
          <li>发布 Galgame 合并请求被合并, 提出请求者将会获得 1 萌萌点 ✔</li>
          <li>Galgame 资源被点赞, 发布者获得 1 萌萌点 ✔</li>
          <li>Galgame 评论被其它人评论, 被评论者获得 1 萌萌点 ✔</li>
        </ul>
      </div>

      <div class="deduct">
        <h3>扣除方法</h3>
        <ul>
          <li>
            用户的不萌行为，根据严重程度，将会被扣除 7, 17, 77, 177, 777
            点萌萌点
          </li>
          <li>单个话题每被踩 10 次，若审核无误，扣除 100 萌萌点</li>
          <li>用户推话题一次将会被扣除 7 萌萌点，可以重复推话题 ✔</li>
          <li>用户推回复一次将会被扣除 2 萌萌点，可以重复推回复 ✔</li>
        </ul>
      </div>
    </div>

    <div class="kungalgamer">
      <h2>用户</h2>
      <ul>
        <li><strong>萌萌点低于 1000 的用户将会被删除账户</strong></li>
        <li>萌萌点低于 1100 的用户无法使用“推话题”功能 ✔</li>
        <li>连续 “踩” 10 次将会被删除账户（我们希望少一点批评，多一点赞美）</li>
      </ul>
    </div>

    <div class="topic">
      <h2>话题</h2>
      <ul>
        <li>
          每个位于主页的话题处于“动态推送状态”，一旦该话题受到包括“点赞”“评论”“推话题”的影响时，该话题将会被置顶
          ✔
        </li>
        <li>
          话题热度值计算公式：热度值 = 浏览数 × 0.1 评论数 × 2 + 点赞数 × 2 +
          推话题数 × 50 – 踩 × 5 ✔
        </li>
        <li>话题被推 10 小时内会获得“流光”样式 ✔</li>
        <li>一旦单个话题“踩”的数量达到 10，该话题会被系统屏蔽，交由管理审核</li>
        <li>
          每天晚上 12: 00 话题池会清空一轮，留下昨天话题热度值最高的 17
          个话题，热度值相同则都被推送
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
