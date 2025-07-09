import type { ReplyStorePersist } from '~/store/types/topic/reply'

export const usePersistKUNGalgameReplyStore = defineStore(
  'KUNGalgameTopicReply',
  {
    persist: true,
    state: (): ReplyStorePersist => ({
      mode: 'preview',
      replyDraft: {
        targets: [],
        mainContent: ''
      }
    }),
    actions: {
      addTarget(target: {
        targetReplyId: number
        targetFloor: number
        targetUserName: string
      }) {
        if (
          this.replyDraft.targets.some(
            (t) => t.targetReplyId === target.targetReplyId
          )
        ) {
          return
        }
        if (this.replyDraft.targets.length >= 10) {
          useMessage('最多只能同时回复 10 个目标', 'warn')
          return
        }

        this.replyDraft.targets.push({
          ...target,
          content: ''
        })
      },

      removeTarget(targetReplyId: number) {
        this.replyDraft.targets = this.replyDraft.targets.filter(
          (t) => t.targetReplyId !== targetReplyId
        )
      },

      resetReplyDraft() {
        this.replyDraft.targets = []
        this.replyDraft.mainContent = ''
      },

      resetReplyContent() {
        this.replyDraft.targets.forEach((t) => (t.content = ''))
        this.replyDraft.mainContent = ''
      }
    }
  }
)
