import { usePersistEditGalgameRatingStore } from './modules/edit/rating'
import { usePersistKUNGalgameAdvancedFilterStore } from './modules/galgame'

export const kungalgameStoreReset = () => {
  usePersistEditGalgameStore().$reset()
  usePersistEditTopicStore().$reset()
  usePersistEditGalgameRatingStore().$reset()
  usePersistKUNGalgameReplyStore().$reset()
  usePersistKUNGalgameTopicStore().$reset()
  usePersistCategoryStore().$reset()
  usePersistKUNGalgameHomeStore().$reset()
  usePersistUserStore().$reset()
  usePersistSettingsStore().$reset()
  usePersistKUNGalgameAdvancedFilterStore().$reset()

  useTempEditStore().$reset()
  useTempGalgamePRStore().$reset()
  useTempGalgameResourceStore().$reset()
  useTempReplyStore().$reset()
  useTempSearchStore().$reset()
  useComponentMessageStore().$reset()
  useTempSettingStore().$reset()
}
