<script setup lang="ts">
const { t, locale } = useI18n()

useHead({
  title: t('seo.agreement.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.agreement.description'),
    },
  ],
})
</script>

<template>
  <div class="root">
    <div class="article" v-if="locale === 'en-us'">
      <div class="title">User Agreement</div>
      <div class="content">
        <p>
          When you register as a member of KUN Visual Novel, you become a user
          of KUN Visual Novel, and at this point, we consider that you have
          confirmed the following user agreement:
        </p>
        <p>
          1. All statements made by users are not related to KUN Visual Novel.
        </p>
        <p>
          2. KUN Visual Novel is merely an open-source collaborative web
          development project designed for everyone to learn web knowledge.
        </p>
        <p>
          3. We reserve the right to ban users who engage in actions detrimental
          to the maintenance of our open-source project.
        </p>
        <p>
          4. KUN Visual Novel is not responsible for any losses caused by issues
          such as user account theft.
        </p>
        <p>Agreement Version - V 1.0.0</p>
      </div>

      <div class="nav">
        <KunBackToPrevious />
        <KunBackToHome />
      </div>
    </div>

    <div class="article" v-if="locale === 'zh-cn'">
      <div class="title">用户协议</div>
      <div class="content">
        <p>
          当您注册成为 KUNGalgame 的会员时，您即成为 KUNGalgame
          的用户，这时我们认为您已经确认以下用户协议：
        </p>
        <p>1. 用户所发表的一切言论与 KUNGalgame 没有任何关系</p>
        <p>
          2. KUNGalgame 只是一个开源的、合作的 Web 开发项目，目的是供所有人学习
          Web 知识
        </p>
        <p>3. 用户做出不利于我们开源项目维护的行为时，我们有权对用户进行封禁</p>
        <p>4. 因用户账号被盗等造成的损失，KUNGalgame 概不承担</p>
        <p>协议版本 - V 1.0.0</p>
      </div>

      <div class="nav">
        <KunBackToPrevious />
        <KunBackToHome />
      </div>
    </div>

    <KunFooter class="footer" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  padding-top: 20px;
  height: calc(100vh - 75px);
  overflow-y: scroll;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.article {
  max-width: 600px;
  margin: auto;
  position: relative;
  border-radius: 7px;
  background-color: var(--kungalgame-trans-white-2);
  backdrop-filter: blur(5px);
  box-shadow: var(--kungalgame-shadow-0);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--kungalgame-font-color-3);
  padding: 20px;

  &:hover {
    box-shadow: var(--kungalgame-shadow-1);
    transition: 0.3s;
  }
}

.title {
  height: 77px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 30px;
}

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

.footer {
  width: 100%;
}

.nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 700px) {
  .article {
    width: 90%;
  }
}
</style>
