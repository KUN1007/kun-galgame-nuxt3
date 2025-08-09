import { KUN_FORUM_DISABLE_REGISTER_KEY } from '~/config/admin'

export default defineEventHandler(async (event) => {
  const res = await useStorage('redis').getItem(KUN_FORUM_DISABLE_REGISTER_KEY)
  return { registerStatus: !!res }
})
