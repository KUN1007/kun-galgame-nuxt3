<script setup lang="ts">
const props = defineProps<{
  lang: Language
  type: 'publish' | 'rewrite'
}>()

const { introduction } = storeToRefs(usePersistEditGalgameStore())
const { galgamePR } = storeToRefs(useTempGalgamePRStore())

const valueMarkdown = computed(() => {
  if (props.type === 'publish') {
    return introduction.value[props.lang]
  } else {
    return galgamePR.value[0].introduction[props.lang]
  }
})

const saveMarkdown = debounce((editorMarkdown: string) => {
  if (props.type === 'publish') {
    introduction.value[props.lang] = editorMarkdown
  } else {
    galgamePR.value[0].introduction[props.lang] = editorMarkdown
  }
}, 107)
</script>

<template>
  <KunMilkdownDualEditorProvider
    :value-markdown="valueMarkdown"
    @set-markdown="saveMarkdown"
    :language="lang ?? 'zh-cn'"
  >
    <div>
      <p>
        提示, 请不要在介绍部分放置任何 R18 图片, 我们的系统还没有开发完毕,
        之后会有专门处理图片的展示方式, 切记, 一定不要放置。R18 的定义很严格,
        过于露骨的图片都视为 R18
      </p>
      <p>
        一般图片尽可能少的放置, 能不放置图片就不要放置图片,
        因为我们之后会专门做放图片的位置。
      </p>
      <KunLink target="_blank" to="/doc/notice/galgame-publish-rule">
        Galgame 发布规定
      </KunLink>
    </div>
  </KunMilkdownDualEditorProvider>
</template>
