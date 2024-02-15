<script setup lang="ts">
import 'animate.css'

const MilkdownEditor = defineAsyncComponent(
  () => import('~/components/kun/milkdown/Wrapper.vue')
)
const Tags = defineAsyncComponent(() => import('~/components/edit/Tags.vue'))

const messageStore = useTempMessageStore()
const { isShowAdvance } = storeToRefs(usePersistKUNGalgameTopicStore())
const { isReplyRewriting } = storeToRefs(useTempReplyStore())
const { replyDraft, replyPanelWidth } = storeToRefs(
  usePersistKUNGalgameReplyStore()
)

const { isEdit } = storeToRefs(useTempReplyStore())

const position = computed(() => {
  return replyDraft.value.toFloor === 0 ? 'master' : 'reply'
})

const panelWidth = computed(() => `${replyPanelWidth.value}%`)

const handleClosePanel = async () => {
  if (isReplyRewriting.value) {
    const res = await messageStore.alert('AlertInfo.edit.closePanel', true)

    if (res) {
      useTempReplyStore().resetRewriteReplyData()
    } else {
      return
    }
  }
  isShowAdvance.value = false
  isEdit.value = false
}
</script>

<template>
  <Teleport to="body" :disabled="isEdit">
    <Transition
      enter-active-class="animate__animated animate__fadeInUp animate__faster"
      leave-active-class="animate__animated animate__fadeOutDown animate__faster"
    >
      <div class="root" v-if="isEdit">
        <div class="container" :style="`width: ${panelWidth}`">
          <div class="title">
            <h3>
              <span>{{ $t('topic.panel.to') + ' @' }}</span>
              <span>{{ replyDraft.toUserName }}</span>
              <span>
                <span class="emoji">(⋈◍＞◡＜◍)。✧♡ </span>
                {{ `${$t(`topic.panel.${position}`)} ${replyDraft.toFloor}` }}
              </span>
            </h3>
            <Icon
              @click="handleClosePanel"
              class="close"
              name="line-md:close"
            />
          </div>

          <div class="content">
            <MilkdownEditor :is-show-menu="isShowAdvance" />
          </div>

          <div class="footer">
            <Tags
              style="margin-top: 10px; padding: 10px"
              v-if="isShowAdvance"
            />
            <TopicReplyPanelBtn />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.close {
  font-size: 30px;
  cursor: pointer;
  color: var(--kungalgame-font-color-1);
}

.root {
  position: fixed;
  bottom: 0;
  width: 100%;
  opacity: 0.92;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.container {
  transition: all 0.2s;
  max-width: 1000px;
  max-height: 77vh;
  overflow-y: scroll;
  color: var(--kungalgame-font-color-3);
  background-color: var(--kungalgame-white);
  border-radius: 5px;
  border: 1px solid var(--kungalgame-blue-5);
  box-shadow: var(--shadow);
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  padding-left: 20px;

  span {
    &:nth-child(2) {
      margin: 0 5px;
      cursor: pointer;
      color: var(--kungalgame-blue-5);
      border-bottom: 2px solid var(--kungalgame-white-9);

      &:hover {
        border-bottom: 2px solid var(--kungalgame-blue-5);
      }
    }

    &:nth-child(3) {
      margin-left: 40px;
    }

    .emoji {
      color: var(--kungalgame-pink-3);
    }
  }
}

@media (max-width: 700px) {
  .emoji {
    display: none;
  }
}
</style>
