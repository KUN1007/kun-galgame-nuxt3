<script setup lang="ts">
import { useTopicEditorStore } from '~/composables/topic/useTopicEditorStore'
import { MOEMOEPOINT_COST_FOR_CONSUME_SECTION } from '~/config/moemoepoint'

const { section } = useTopicEditorStore()
const { moemoepoint } = usePersistUserStore()

const isShowSeekGalgameNotice = computed(() =>
  section.value.includes('g-seeking')
)
const isShowRequestHelpNotice = computed(() => section.value.includes('t-help'))

const notices = computed(() => [
  {
    show: isShowSeekGalgameNotice.value,
    title: '寻求 Galgame 资源须知',
    content: [
      `<b class="text-danger-600">1. 发布寻求 Galgame 资源类话题需要消耗 ${MOEMOEPOINT_COST_FOR_CONSUME_SECTION} 萌萌点</b>, 您现在拥有 ${moemoepoint} 萌萌点`,
      '2. 请先使用论坛搜索、搜索引擎（搜索日文原名）进行检索',
      '3. 请阅读<a href="/topic/1223" target="_blank" class="font-semibold text-blue-500 hover:underline">此话题</a>中提到的资源站列表',
      '4. 完成上述步骤仍未找到，我们很乐意帮助您。否则，话题可能会被删除',
      '5. 恶意发布错误的话题分类, 将会被处罚'
    ]
  },
  {
    show: isShowRequestHelpNotice.value,
    title: '技术求助须知',
    content: [
      `<b class="text-danger-600">1. 发布求助类话题需要消耗 ${MOEMOEPOINT_COST_FOR_CONSUME_SECTION} 萌萌点</b>, 您现在拥有 ${moemoepoint} 萌萌点`,
      '2. 请先尝试自行搜索解决方案',
      '3. 请阅读<a href="/topic/1483" target="_blank" class="font-semibold text-blue-500 hover:underline">此话题</a>，清晰地描述您的问题、已做的尝试和结果',
      '4. 问题描述越清晰, 越容易得到帮助。若模糊不清，话题可能会被删除',
      '5. 恶意发布错误的话题分类, 将会被处罚'
    ]
  }
])
</script>

<template>
  <template v-for="(notice, index) in notices" :key="index">
    <div
      v-if="notice.show"
      class="bg-warning-50 rounded-r-lg border-l-4 p-4"
      :class="['border-warning-400']"
    >
      <h4 class="text-warning-800 mb-2 font-bold">
        {{ notice.title }}
      </h4>
      <p
        class="text-sm"
        v-for="(line, i) in notice.content"
        :key="i"
        v-html="line"
      ></p>
    </div>
  </template>
</template>
