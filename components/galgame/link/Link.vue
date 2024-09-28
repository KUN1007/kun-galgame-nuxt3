<script setup lang="ts">
import { checkGalgameLinkPublish } from '../utils/checkGalgameLinkPublish'

const { uid } = usePersistUserStore()
const route = useRoute()
const gid = computed(() => {
  return parseInt((route.params as { gid: string }).gid)
})

const isShowEdit = ref(false)
const isFetching = ref(false)
const linkModel = reactive({
  name: '',
  link: ''
})

const { data, pending, refresh } = await useLazyFetch(
  `/api/galgame/${gid.value}/link/all`,
  {
    method: 'GET',
    watch: false,
    ...kungalgameResponseHandler
  }
)

const handlePublishLink = async () => {
  if (!checkGalgameLinkPublish(linkModel.name, linkModel.link)) {
    return
  }

  isFetching.value = true
  const result = await $fetch(`/api/galgame/${gid.value}/link`, {
    method: 'POST',
    body: linkModel,
    watch: false,
    ...kungalgameResponseHandler
  })
  isFetching.value = false

  if (result) {
    linkModel.name = ''
    linkModel.link = ''
    refresh()
  }
}

const handleDeleteLink = async (gid: number, glid: number) => {
  const res = await useComponentMessageStore().alert({
    'en-us': 'Are you sure you want to delete this visualnovel-related link?',
    'ja-jp': 'このギャルゲーム関連リンクを削除してもよろしいですか？',
    'zh-cn': '您确定删除该 Galgame 相关链接吗？',
    'zh-tw': '您確定刪除該 Galgame 相關鏈接嗎？'
  })
  if (!res) {
    return
  }

  const result = await $fetch(`/api/galgame/${gid}/link`, {
    method: 'DELETE',
    query: { glid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    refresh()
  }
}
</script>

<template>
  <div class="container">
    <KunHeader :size="2">
      <template #header>
        <span>{{ $t('galgame.link.name') }}</span>

        <span class="contribute" @click="isShowEdit = !isShowEdit">
          <Icon class="icon" name="lucide:circle-plus" />
        </span>
      </template>
    </KunHeader>

    <div class="link-edit" v-if="isShowEdit">
      <GalgameLinkHelp />

      <KunInput
        :placeholder="`${$t('galgame.link.label')}`"
        v-model="linkModel.name"
      />
      <KunInput
        :placeholder="`${$t('galgame.link.url')}`"
        v-model="linkModel.link"
      />
      <KunButton @click="handlePublishLink" :pending="isFetching">
        {{ $t('galgame.link.create') }}
      </KunButton>
    </div>

    <div class="links" v-if="data && !pending">
      <span class="link" v-for="(link, index) in data" :key="index">
        <KunCopy
          :text="link.link"
          :name="link.name"
          v-tooltip="{
            message: `${link.link.slice(0, 30)}...`,
            position: 'bottom'
          }"
        />
        <a :href="link.link" target="_blank" rel="noopener noreferrer">
          <Icon class="icon" name="lucide:external-link" />
        </a>
        <span
          v-if="uid === link.uid"
          class="delete"
          @click="handleDeleteLink(link.gid, link.glid)"
          :pending="isFetching"
        >
          <Icon class="icon" name="lucide:trash-2" />
        </span>
      </span>
    </div>
    <KunSkeletonGalgameLink v-if="pending" />

    <GalgameNull class="null" v-if="!pending && !data?.length" />
  </div>
</template>

<style lang="scss" scoped>
.container {
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

.link-edit {
  margin-bottom: 17px;

  input {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.links {
  .link {
    cursor: pointer;
    margin-bottom: 10px;
    margin-right: 17px;
    display: inline-block;

    & > a {
      margin-left: 10px;
      font-size: 20px;
      color: var(--kungalgame-font-color-0);

      &:hover {
        color: var(--kungalgame-blue-5);
      }
    }

    .delete {
      font-size: 20px;
      color: var(--kungalgame-red-5);
      margin-left: 10px;
    }
  }
}
</style>
