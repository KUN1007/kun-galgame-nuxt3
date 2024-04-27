<script setup lang="ts">
import 'animate.css'

const MilkdownEditor = defineAsyncComponent(() => import('./Editor.vue'))
const Tags = defineAsyncComponent(
  () => import('~/components/edit/topic/Tags.vue')
)

const { isShowAdvance } = storeToRefs(usePersistKUNGalgameTopicStore())
const { isReplyRewriting } = storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())
const { isEdit } = storeToRefs(useTempReplyStore())

const position = computed(() => {
  return replyDraft.value.toFloor === 0 ? 'master' : 'reply'
})

const handleClosePanel = async () => {
  if (isReplyRewriting.value) {
    const res = await useTempMessageStore().alert({
      'en-us': 'Confirm closing the panel? Your changes will not be saved',
      'ja-jp': '',
      'zh-cn': '确认关闭面板吗？您的更改将不会被保存'
    })

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
        <div class="container">
          <div class="title">
            <h3>
              <span>{{ $t('topic.panel.to') + ' @' }}</span>
              <span>{{ replyDraft.toUserName }}</span>
              <span>
                <span class="emoji">(⋈◍＞◡＜◍)。✧♡ </span>
                {{ `${$t(`topic.panel.${position}`)} ${replyDraft.toFloor}` }}
              </span>
            </h3>
            <Icon @click="handleClosePanel" class="close" name="lucide:x" />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.container {
  transition: all 0.2s;
  width: 90%;
  max-width: 60rem;
  max-height: 77vh;
  overflow-y: scroll;
  color: var(--kungalgame-font-color-3);
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
  will-change: transform;
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
