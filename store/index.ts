import { useKUNGalgameUserStore } from '~/store/modules/kungalgamer'

export const kungalgameStoreReset = () => {
  const userStore = useKUNGalgameUserStore()
  userStore.$reset()
}
