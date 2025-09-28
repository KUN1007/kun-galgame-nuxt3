<script setup lang="ts">
import { languageItems } from '~/constants/edit'
import type { VNDB, VNDBResponse } from '../utils/VNDB'

const introductionLanguage = ref<Language>('zh-cn')
const isSuccess = ref(false)
const isFetching = ref(false)

const data = ref<VNDB>({
  title: '',
  titles: [],
  description: '',
  aliases: []
})

const { vndbId, name, introduction, aliases } = storeToRefs(
  usePersistEditGalgameStore()
)

const handleGetVNData = async () => {
  if (!VNDBPattern.test(vndbId.value)) {
    useMessage(10501, 'warn')
    return
  }

  const isDuplicate = await $fetch('/api/galgame/check', {
    method: 'GET',
    query: { vndbId: vndbId.value },
    ...kungalgameResponseHandler
  })
  if (!isDuplicate) {
    return
  }

  if (isFetching.value) {
    return
  } else {
    isFetching.value = true
    useMessage(10502, 'info')
  }

  const vndbData = await $fetch<VNDBResponse>(`https://api.vndb.org/kana/vn`, {
    method: 'POST',
    body: {
      filters: ['id', '=', vndbId.value],
      fields: 'title, titles.title, description, aliases'
    }
  })

  if (vndbData) {
    if (!vndbData.results.length) {
      isFetching.value = false
      useMessage(10503, 'error')
      return
    }

    isFetching.value = false
    useMessage(10504, 'info')

    data.value = vndbData.results[0]
    name.value['en-us'] = data.value.title
    introduction.value['en-us'] = data.value.description ?? ''
    aliases.value = data.value.aliases

    // For reactivity
    if (introductionLanguage.value !== 'en-us') {
      introductionLanguage.value = 'en-us'
    } else {
      isSuccess.value = !isSuccess.value
    }
  }
}
</script>

<template>
  <div class="contents">
    <ClientOnly>
      <KunCard
        :is-hoverable="false"
        :is-transparent="false"
        content-class="space-y-6"
      >
        <KunHeader
          name="发布 Galgame"
          description="您需要创建 Galgame 才可以在对应的 Galgame 下发布 Galgame 资源, 如果这个 Galgame 已经存在, 直接在这个 Galgame 下添加资源即可"
        >
          <template #endContent>
            <KunLink target="_blank" to="/doc/notice/galgame-publish-help">
              Galgame 发布系统帮助文档、教程、介绍
            </KunLink>
            <EditGalgameSite class="mt-2" />
          </template>
        </KunHeader>

        <KunDivider>
          <span class="mx-2">必要信息</span>
        </KunDivider>

        <div>
          <h2 class="text-xl">VNDB 编号</h2>
          <div class="my-2 flex items-center justify-center gap-2">
            <KunInput v-model="vndbId" placeholder="例如: v19658" />
            <KunButton class-name="whitespace-nowrap" @click="handleGetVNData">
              获取数据
            </KunButton>
          </div>
          <p class="text-default-500 text-sm">
            在您获取数据时，我们会自动为您检查该游戏是否重复
          </p>
          <p class="text-default-500 text-sm">
            我们要求每一部游戏必须有 VNDB ID。VNDB ID 需要在页面上方的 VNDB 官网
            (vndb.org) 获取，当进入对应游戏的页面，游戏页面的 URL (形如
            https://vndb.org/v19658) 中的 v19658 就是 VNDB ID。输入 ID
            后点击'获取数据'，会根据该 ID 尝试从 VNDB 获取游戏的标题和介绍
            (均为英语)
          </p>
        </div>

        <div class="space-y-2">
          <h2 class="text-xl">游戏名</h2>
          <p class="text-default-500 text-sm">
            游戏名要求至少写一种, 非常建议全部填写
            (如果游戏没有对应翻译可以不填写, 英语标题可以从 VNDB 自动获取到)
          </p>
          <div class="space-y-2" v-if="data.titles.length">
            <p>参考标题（点击复制）</p>
            <div>
              <KunButton
                size="sm"
                variant="flat"
                v-for="(title, index) in data.titles"
                :key="index"
                @click="useKunCopy(title.title)"
              >
                {{ title.title }}
              </KunButton>
            </div>
          </div>
          <div class="space-y-2">
            <KunInput placeholder="英语" v-model="name['en-us']" />
            <KunInput placeholder="日语" v-model="name['ja-jp']" />
            <KunInput placeholder="简体中文" v-model="name['zh-cn']" />
            <KunInput placeholder="繁体中文" v-model="name['zh-tw']" />
          </div>
        </div>

        <div class="space-y-2">
          <h2 class="text-xl">介绍</h2>
          <p class="text-default-500 text-sm">
            介绍要求至少写一种。英语介绍在点击 '获取数据' 时可以自动获取,
            有概率获取不到; 日语介绍可以点击页面上方的 DLsite 网站,
            进入游戏详情页面, 该页面的 ストーリー 部分就是日语介绍;
            汉语介绍可以在 Bangumi
            或者萌娘百科获得。您也可以抛弃官方对游戏的介绍，自己介绍游戏
          </p>
          <p class="text-default-500 text-sm">
            请不要在介绍部分放置任何 R18 图片, 我们的系统还没有开发完毕,
            之后会有专门处理图片的展示方式, 切记, 一定不要放置。R18
            的定义很严格, 过于露骨的图片都视为 R18。一般图片尽可能少的放置,
            能不放置图片就不要放置图片, 因为我们之后会专门做放图片的位置。
          </p>
          <KunTab
            :items="languageItems"
            v-model="introductionLanguage"
            variant="underlined"
            color="primary"
            size="sm"
          />
          <EditGalgameEditor :lang="introductionLanguage" type="publish" />
        </div>

        <EditGalgameBanner />

        <EditGalgameContentLimit type="create" />

        <EditGalgamePrAlias type="create" />

        <KunInfo
          title="其它 Galgame 信息"
          description="我们在发布 Galgame 时会自动为您添加所有的 Galgame 标签、Galgame 会社、Galgame 引擎 等信息, 您无需关心这些信息"
          color="info"
        />

        <EditGalgameFooter />
      </KunCard>
    </ClientOnly>
  </div>
</template>
