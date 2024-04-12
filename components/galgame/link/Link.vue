<script setup lang="ts">
import { checkGalgameLinkPublish } from '../utils/checkGalgameLinkPublish'

const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const isShowEdit = ref(false)
const linkModel = reactive({
  name: '',
  link: ''
})

const handlePublishLink = async () => {
  if (!checkGalgameLinkPublish(linkModel.name, linkModel.link)) {
    return
  }

  const { data } = await useFetch(`/api/galgame/${gid.value}/link`, {
    method: 'POST',
    body: linkModel,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (data.value) {
    linkModel.name = ''
    linkModel.link = ''
    console.log(data.value)
  }
}
</script>

<template>
  <div class="links">
    <KunHeader :size="2">
      <template #header>
        <span>相关链接</span>

        <span class="contribute" @click="isShowEdit = !isShowEdit">
          <Icon name="lucide:circle-plus" />
        </span>
      </template>
    </KunHeader>

    <!-- <div v-if="isShowEdit"> -->
    <div>
      <KunInput placeholder="链接名" v-model="linkModel.name" />
      <KunInput placeholder="链接地址" v-model="linkModel.link" />
      <KunButton @click="handlePublishLink">确定发布</KunButton>
    </div>

    <!-- <GalgameNull class="null" v-if="!resourceData?.length" /> -->
  </div>
</template>

<style lang="scss" scoped>
.links {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.contribute {
  cursor: pointer;
  margin-left: 17px;
  padding: 3px;
  border-radius: 20px;
  color: var(--kungalgame-blue-5);
}

.null {
  margin-bottom: 17px;
}
</style>
