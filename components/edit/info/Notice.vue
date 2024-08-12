<script setup lang="ts">
const { section: rewriteSection } = storeToRefs(useTempEditStore())
const { section: editSection } = storeToRefs(usePersistEditTopicStore())

const { locale } = useI18n()

const isShowSeekGalgameNotice = computed(() => {
  return (
    rewriteSection.value.includes('g-seeking') ||
    editSection.value.includes('g-seeking')
  )
})

const isShowRequestHelpNotice = computed(() => {
  return (
    rewriteSection.value.includes('t-help') ||
    editSection.value.includes('t-help')
  )
})
</script>

<template>
  <div class="tip" v-if="isShowSeekGalgameNotice">
    <div class="en" v-if="locale === 'en-us'">
      <h2>Notice</h2>
      <br />
      <p>
        If you are looking for visualnovel game download resources, please
        follow the steps below first, otherwise
        <b>the topic will be deleted</b>.
      </p>
      <ul>
        <li>
          1. Use the search function within the forum to search in topics and
          visualnovels.
        </li>
        <li>
          2. Use a search engine (Google, Bing) to search for the game's
          <b>original Japanese name</b>, and confirm that the search engine
          cannot find a download site for the game.
        </li>
        <li>
          3. Please read
          <a
            href="https://www.kungal.com/zh-cn/topic/1223"
            target="_blank"
            rel="noopener noreferrer"
          >
            this topic
          </a>
          , and confirm that the websites mentioned in this topic do not have
          the game you are looking for.
        </li>
      </ul>
      <p>
        If you still cannot solve the resource issue after trying the above
        three steps, we are happy to assist you.
      </p>
    </div>

    <div class="zh" v-if="locale === 'zh-cn'">
      <h2>注意</h2>
      <br />
      <p>
        如果您要寻求的是 Galgame 游戏下载资源, 请首先按照下面的步骤检索, 否则
        <b>会被删除话题</b>
      </p>
      <ul>
        <li>1. 使用论坛内的搜索功能, 在话题和 Galgame 中搜索</li>
        <li>
          2. 自行使用 搜索引擎(Google, Bing) 搜索游戏的 <b>日文原名</b>,
          确认搜索引擎搜不到该游戏的下载网站
        </li>
        <li>
          3. 请您阅读
          <a
            href="https://www.kungal.com/zh-cn/topic/1223"
            target="_blank"
            rel="noopener noreferrer"
          >
            此话题
          </a>
          , 确认此话题中提到的网站没有您要找的游戏
        </li>
      </ul>
      <p>如果您在尝试以上三点后, 仍然解决不了资源问题, 我们很乐意帮助您</p>
    </div>
  </div>

  <div class="tip" v-if="isShowRequestHelpNotice">
    <div class="en" v-if="locale === 'en-us'">
      <h2>Notice</h2>
      <br />
      <p>
        If you need help, please first try to resolve the issue by following the
        steps below, otherwise
        <b>the topic will be deleted</b>.
      </p>
      <ul>
        <li>
          1. Use a search engine or other methods to search for your problem,
          confirm that the search engine cannot provide the answer you need, and
          try to solve the problem on your own.
        </li>
        <li>
          2. Please read
          <a
            href="https://www.kungal.com/zh-cn/topic/1483"
            target="_blank"
            rel="noopener noreferrer"
          >
            this topic
          </a>
          to clearly state your question, so we can better understand and help
          you solve it.
        </li>
      </ul>
      <p>
        If you still cannot resolve your issue after trying the above steps, we
        are happy to assist you.
      </p>
    </div>

    <div class="zh" v-if="locale === 'zh-cn'">
      <h2>注意</h2>
      <br />
      <p>
        如果您要请求帮助, 请首先按照下面的步骤尝试解决, 否则
        <b>会被删除话题</b>
      </p>
      <ul>
        <li>
          1. 使用搜索引擎或者其它方式搜索过您的问题,
          确认搜索引擎不能得出您想要的答案, 自己尝试解决过自己的问题
        </li>
        <li>
          3. 请您阅读
          <a
            href="https://www.kungal.com/zh-cn/topic/1483"
            target="_blank"
            rel="noopener noreferrer"
          >
            此话题
          </a>
          , 以明确提出您的问题, 方便我们更好的理解问题, 从而帮您解决问题
        </li>
      </ul>
      <p>如果您在尝试以上两点, 仍然解决不了您的问题, 我们很乐意帮助您</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tip {
  margin-bottom: 17px;

  ul {
    padding-left: 17px;
    font-size: 15px;

    a {
      font-weight: bold;
      color: var(--kungalgame-blue-5);
    }

    li {
      list-style: none;
      margin-bottom: 5px;
    }
  }
}
</style>
