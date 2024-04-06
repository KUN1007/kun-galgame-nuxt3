import { usePersistUserStore } from '~/store/modules/kungalgamer'

export const kungalgameStoreReset = () => {
  const userStore = usePersistUserStore()
  userStore.$reset()
}
