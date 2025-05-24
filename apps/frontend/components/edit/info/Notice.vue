<script setup lang="ts">
const { section: rewriteSection } = storeToRefs(useTempEditStore())
const { section: editSection } = storeToRefs(usePersistEditTopicStore())

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
        <KunLink
          to="https://www.kungal.com/zh-cn/topic/1223"
          target="_blank"
          rel="noopener noreferrer"
        >
          此话题
        </KunLink>
        , 确认此话题中提到的网站没有您要找的游戏
      </li>
    </ul>
    <p>如果您在尝试以上三点后, 仍然解决不了资源问题, 我们很乐意帮助您</p>
  </div>

  <div class="tip" v-if="isShowRequestHelpNotice">
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
        <KunLink
          to="https://www.kungal.com/zh-cn/topic/1483"
          target="_blank"
          rel="noopener noreferrer"
        >
          此话题
        </KunLink>
        , 以明确提出您的问题, 方便我们更好的理解问题, 从而帮您解决问题
      </li>
    </ul>
    <p>如果您在尝试以上两点, 仍然解决不了您的问题, 我们很乐意帮助您</p>
  </div>
</template>
