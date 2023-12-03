import { useKUNGalgameEditStore } from './modules/edit'
import { usePersistKUNGalgameHomeStore } from './modules/home'
import { useKUNGalgameUserStore } from '@/store/modules/kungalgamer'
import { useKUNGalgameSettingsStore } from '@/store/modules/settings'
import { usePersistKUNGalgameTopicStore } from '@/store/modules/topic/topic'
import { usePersistKUNGalgameReplyStore } from '@/store/modules/topic/reply'

export const kungalgameStoreReset = () => {
  const editStore = useKUNGalgameEditStore()
  const homeStore = usePersistKUNGalgameHomeStore()
  const userStore = useKUNGalgameUserStore()
  const settingsStore = useKUNGalgameSettingsStore()
  const topicStore = usePersistKUNGalgameTopicStore()
  const replyStore = usePersistKUNGalgameReplyStore()

  editStore.$reset()
  homeStore.$reset()
  userStore.$reset()
  settingsStore.$reset()
  topicStore.$reset()
  replyStore.$reset()
}
