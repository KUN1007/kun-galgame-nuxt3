<script setup lang="ts">
import 'animate.css'
import { KUN_TOPIC_REPLY_PANEL_POSITION_MAP } from '~/constants/topic'

const { isShowAdvance } = storeToRefs(usePersistKUNGalgameTopicStore())
const { isReplyRewriting } = storeToRefs(useTempReplyStore())
const { replyDraft } = storeToRefs(usePersistKUNGalgameReplyStore())
const { isEdit } = storeToRefs(useTempReplyStore())

const position = computed(() => {
  return replyDraft.value.toFloor === 0 ? 'master' : 'reply'
})

const handleClosePanel = async () => {
  if (isReplyRewriting.value) {
    const res = await useComponentMessageStore().alert(
      '确认关闭面板吗？您的更改将不会被保存。'
    )

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
  <Teleport to="body" :disabled="!isEdit">
    <Transition
      enter-active-class="animate__animated animate__fadeInUp animate__faster"
      leave-active-class="animate__animated animate__fadeOutDown animate__faster"
    >
      <div class="root" v-if="isEdit">
        <div class="container">
          <div class="title">
            <h3>
              <span>回复给 @</span>
              <span class="username">{{ replyDraft.toUserName }}</span>
              <span>
                <span class="emoji">(⋈◍＞◡＜◍)。✧♡ </span>
                {{
                  `${KUN_TOPIC_REPLY_PANEL_POSITION_MAP[position]} ${replyDraft.toFloor}`
                }}
              </span>
            </h3>
            <span class="close">
              <Icon class="icon" @click="handleClosePanel" name="lucide:x" />
            </span>
          </div>

          <div class="content">
            <LazyTopicReplyEditor :is-show-menu="isShowAdvance" />
          </div>

          <div class="footer">
            <LazyEditTopicTags
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
  @include kun-blur;

  .close {
    font-size: 30px;
    cursor: pointer;
    color: var(--kungalgame-font-color-1);
  }
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  padding-left: 20px;

  span {
    user-select: none;

    &:nth-child(3) {
      margin-left: 10px;
    }

    .emoji {
      color: var(--kungalgame-pink-3);
    }
  }

  .username {
    margin: 0 5px;
    cursor: pointer;
    color: var(--kungalgame-blue-5);
    border-bottom: 2px solid var(--kungalgame-white-9);

    &:hover {
      border-bottom: 2px solid var(--kungalgame-blue-5);
    }
  }
}

@media (max-width: 700px) {
  .emoji {
    display: none;
  }
}
</style>
