<script setup lang="ts">
import { languageItems } from '../utils/options'

defineProps<{
  introductionLanguage: Language
  type: 'publish' | 'rewrite'
  isSuccess?: boolean
}>()

const emits = defineEmits<{
  set: [value: Language]
}>()
</script>

<template>
  <KunHeader :size="2" :show-help="true">
    <template #header>介绍</template>

    <template #help>
      介绍要求至少写一种。英语介绍在点击 '获取数据' 时可以自动获取,
      有概率获取不到; 日语介绍可以点击页面上方的 DLsite 网站, 进入游戏详情页面,
      该页面的 ストーリー 部分就是日语介绍; 汉语介绍可以在 Bangumi
      或者萌娘百科获得。您也可以抛弃官方对游戏的介绍，自己介绍游戏
    </template>
  </KunHeader>

  <KunTab
    class="nav"
    :items="languageItems"
    :default-value="introductionLanguage"
    @set="(value) => emits('set', value as Language)"
  />
  <EditGalgameEditor
    :lang="introductionLanguage"
    :type="type"
    :pending="isSuccess"
  />
</template>

<style lang="scss" scoped>
.nav {
  margin-bottom: 17px;
}
</style>
