<script setup lang="ts">
const { galgamePR } = storeToRefs(useTempGalgamePRStore())
const title = computed(() => galgamePR.value[0].name)
</script>

<template>
  <KunHeader :size="2" :show-help="true">
    <template #header>标题</template>

    <template #help>
      标题要求至少写一种, 非常建议全部填写 (如果游戏没有对应翻译可以不填写,
      英语标题可以从 VNDB 自动获取到)
    </template>
  </KunHeader>

  <div class="titles">
    <KunInput placeholder="英语" v-model="title['en-us']" />
    <KunInput placeholder="日语" v-model="title['ja-jp']" />
    <KunInput placeholder="简体中文" v-model="title['zh-cn']" />
    <KunInput placeholder="繁体中文" v-model="title['zh-tw']" />
  </div>
</template>

<style lang="scss" scoped>
.titles {
  display: flex;
  flex-direction: column;
  margin-bottom: 17px;

  input {
    margin-bottom: 7px;
  }
}
</style>
