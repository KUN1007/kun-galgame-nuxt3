<script setup lang="ts"></script>

<template>
  <div class="article">
    <div class="title">执行条例（试行）</div>
    <div class="tips">
      <p>
        tips: 这是执行条例，✔
        代表已经落实。目的是让论坛的运行机制更加透明，并不是规矩，我们
        <span>
          <NuxtLinkLocale to="/kungalgame">没有规矩</NuxtLinkLocale>
        </span>
      </p>
    </div>

    <div class="moemoepoint">
      <h2>萌萌点</h2>

      <div class="gain">
        <h3>获取方法</h3>
        <ul>
          <li>1. 每个注册用户初始拥有 1007 萌萌点 ✔</li>
          <li>2. 每天签到获得随机 0 ~ 7 萌萌点，签到每日零点刷新 ✔</li>
          <li>3. 用户的话题 / 回复 / 评论被点赞，可以获得 1 萌萌点 ✔</li>
          <li>4. 有人回复用户的话题，用户将会获得 2 点萌萌点 ✔</li>
          <li>5. 有人评论用户的回复，被评论人获得 1 萌萌点 ✔</li>
          <li>6. 用户的话题 / 回复被推，将会获得 7 点萌萌点 ✔</li>
        </ul>
      </div>

      <div class="deduct">
        <h3>扣除方法</h3>
        <ul>
          <li>
            1. 用户的不萌行为，根据严重程度，将会被扣除 7, 17, 77, 177, 777
            点萌萌点
          </li>
          <li>2. 单个话题每被踩 10 次，若审核无误，扣除 100 萌萌点</li>
          <li>3. 用户推话题一次将会被扣除 17 萌萌点，可以重复推话题 ✔</li>
        </ul>
      </div>
    </div>

    <div class="kungalgamer">
      <h2>用户</h2>
      <ul>
        <li><strong>1. 萌萌点低于 1000 的用户将会被删除账户</strong></li>
        <li>2. 萌萌点低于 1100 的用户无法使用“推话题”功能 ✔</li>
        <li>
          3. 连续 “踩” 10 次将会被删除账户（我们希望少一点批评，多一点赞美）
        </li>
      </ul>
    </div>

    <div class="topic">
      <h2>话题</h2>
      <ul>
        <li>
          1.
          每个位于主页的话题处于“动态推送状态”，一旦该话题受到包括“点赞”“评论”“推话题”的影响时，该话题将会被置顶
          ✔
        </li>
        <li>
          2. 话题热度值计算公式：热度值 = 浏览数 × 0.1 评论数 × 2 + 点赞数 × 2 +
          推话题数 × 50 – 踩 × 5 ✔
        </li>
        <li>3. 话题被推 10 小时内会获得“流光”样式 ✔</li>
        <li>
          4. 一旦单个话题“踩”的数量达到 10，该话题会被系统屏蔽，交由管理审核
        </li>
        <li>
          5. 每天晚上 12: 00 话题池会清空一轮，留下昨天话题热度值最高的 17
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
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  margin: 10px 0;
  margin-left: 40px;

  li {
    margin: 5px 0;
  }
}

.kungalgamer > ul {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  margin-left: 20px;

  li {
    margin: 5px 0;
  }
}

.topic > ul {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  margin-left: 20px;

  li {
    margin: 5px 0;
  }
}
</style>
