<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.bylaw.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.bylaw.description'),
    },
  ],
})

const { locale } = useI18n()

const { showKUNGalgamePageWidth } = storeToRefs(useKUNGalgameSettingsStore())
const bylawPageWidth = computed(() => {
  return showKUNGalgamePageWidth.value.bylaw + '%'
})
</script>

<template>
  <div class="root">
    <div class="container">
      <!-- en -->
      <div class="article" v-if="locale === 'en'">
        <div class="title-0">Operating Regulations (Trial)</div>
        <div class="tips">
          <p>
            Tips: These are operating regulations, ✔ indicating implementation.
            The purpose is to make the forum's operation mechanism more
            transparent. These are not rules. We have
            <span>
              <RouterLink to="/kungalgame">no rules</RouterLink>
            </span>
          </p>
        </div>

        <div class="moemoepoint">
          <div class="title-1">Moemoepoints</div>

          <div class="gain">
            <div class="title-2">- Methods of Earning</div>
            <ul>
              <li>
                1. Every registered user initially has 1007 moemoepoints ✔
              </li>
              <li>
                2. Automatically receive random 1-7 moemoepoints when logging in
                each day
              </li>
              <li>
                3. When a user's topic/reply/comment is liked, they earn 1
                moemoepoint ✔
              </li>
              <li>
                4. When someone replies to a user's topic, the user earns 2
                moemoepoints ✔
              </li>
              <li>
                5. When someone comments on a user's reply, both the original
                poster and the person being commented on earn 1 moemoepoint ✔
              </li>
              <li>
                6. When a user's topic/reply is promoted, they earn 7
                moemoepoints ✔
              </li>
            </ul>
          </div>

          <div class="deduct">
            <div class="title-2">- Deduction Methods</div>
            <ul>
              <li>
                1. Users' non-moemoepoint behavior will be deducted 7, 17, 77,
                177, or 777 moemoepoints based on the severity
              </li>
              <li>
                2. If a single topic is disliked 10 times, and upon review, it's
                valid, 100 moemoepoints will be deducted
              </li>
              <li>
                3. Each time a user promotes a topic, they will be deducted 17
                moemoepoints; promoting a topic can be repeated ✔
              </li>
            </ul>
          </div>
        </div>

        <div class="kungalgamer">
          <div class="title-1">Users</div>
          <ul>
            <li>
              <strong
                >1. Users with less than 1000 moemoepoints will have their
                accounts deleted</strong
              >
            </li>
            <li>
              2. Users with less than 1100 moemoepoints cannot use the "Promote
              Topic" feature ✔
            </li>
            <li>
              3. Being "disliked" 10 times in a row will result in account
              deletion (we hope for less criticism and more praise)
            </li>
          </ul>
        </div>

        <div class="topic">
          <div class="title-1">Topics</div>
          <ul>
            <li>
              1. All topics on the homepage are in a "dynamic promotion state."
              Once a topic is affected by "likes," "comments," or "topic
              promotion," it will be pinned ✔
            </li>
            <li>
              2. Formula for topic popularity calculation: Popularity = Views ×
              0.1 Comments × 2 + Likes × 2 + Topic Promotions × 50 - Dislikes ×
              5 ✔
            </li>
            <li>
              3. A topic that is promoted will receive a "glowing" style within
              10 hours ✔
            </li>
            <li>
              4. Once a single topic has received 10 "dislikes," the topic will
              be automatically hidden and subject to administrative review
            </li>
            <li>
              5. Every night at 12:00, the topic pool will be cleared for the
              day, leaving the 17 topics with the highest popularity values from
              the previous day. If popularity values are tied, all will be
              promoted
            </li>
          </ul>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

      <!-- chinese translation -->
      <div class="article" v-if="locale === 'zh'">
        <div class="title-0">执行条例（试行）</div>
        <div class="tips">
          <p>
            tips: 这是执行条例，✔
            代表已经落实。目的是让论坛的运行机制更加透明，并不是规矩，我们
            <span>
              <RouterLink to="/kungalgame">没有规矩</RouterLink>
            </span>
          </p>
        </div>

        <div class="moemoepoint">
          <div class="title-1">萌萌点</div>

          <div class="gain">
            <div class="title-2">- 获取方法</div>
            <ul>
              <li>1. 每个注册用户初始拥有 1007 萌萌点 ✔</li>
              <li>2. 每天登录自动获得随机 1 ~ 7 萌萌点</li>
              <li>3. 用户的话题 / 回复 / 评论被点赞，可以获得 1 萌萌点 ✔</li>
              <li>4. 有人回复用户的话题，用户将会获得 2 点萌萌点 ✔</li>
              <li>
                5. 有人评论用户的回复，楼主和被评论的回复人都会获得 1 萌萌点 ✔
              </li>
              <li>6. 用户的话题 / 回复被推，将会获得 7 点萌萌点 ✔</li>
            </ul>
          </div>

          <div class="deduct">
            <div class="title-2">- 扣除方法</div>
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
          <div class="title-1">用户</div>
          <ul>
            <li><strong>1. 萌萌点低于 1000 的用户将会被删除账户</strong></li>
            <li>2. 萌萌点低于 1100 的用户无法使用“推话题”功能 ✔</li>
            <li>
              3. 连续 “踩” 10 次将会被删除账户（我们希望少一点批评，多一点赞美）
            </li>
          </ul>
        </div>

        <div class="topic">
          <div class="title-1">话题</div>
          <ul>
            <li>
              1.
              每个位于主页的话题处于“动态推送状态”，一旦该话题受到包括“点赞”“评论”“推话题”的影响时，该话题将会被置顶
              ✔
            </li>
            <li>
              2. 话题热度值计算公式：热度值 = 浏览数 × 0.1 评论数 × 2 + 点赞数 ×
              2 + 推话题数 × 50 – 踩 × 5 ✔
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

      <KunFooter style="position: absolute; bottom: 2%" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100%;
  min-height: calc(100vh - 65px);
  display: flex;
  flex-direction: column;
}

.container {
  margin: 0 auto;
  padding: 5px;
  transition: all 0.2s;
  width: v-bind(bylawPageWidth);
  max-width: 1300px;
  height: 100%;
  background-color: var(--kungalgame-trans-white-5);
  border-radius: 7px;
  color: var(--kungalgame-font-color-3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.article {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid var(--kungalgame-trans-blue-4);
  border-radius: 7px;
  background-color: var(--kungalgame-trans-white-2);
  box-shadow: var(--shadow);
}

.title-0 {
  font-size: 30px;
  margin: 17px 0;
  display: flex;
  justify-content: center;
}

.tips {
  border-top: 2px solid var(--kungalgame-blue-4);
  padding-top: 10px;
  margin-bottom: 47px;

  span {
    cursor: pointer;
    border-bottom: 1px solid var(--kungalgame-blue-4);

    a {
      color: var(--kungalgame-blue-4);
    }
  }
}

.title-1 {
  font-size: 25px;
  margin: 20px 0;
  border-left: 4px solid var(--kungalgame-blue-4);
  text-indent: 1em;
}

.title-2 {
  font-size: 17px;
  text-indent: 1em;
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

@media (max-width: 1000px) {
  .container {
    width: 100%;
    padding: 0;
  }
}
</style>
