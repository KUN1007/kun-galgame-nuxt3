// import { onMounted } from 'vue'
// import { useTempMessageStore } from '@/store/temp/message'
// import { isValidEmail, isValidName, isValidPassword } from '@/utils/validate'

// const info = useTempMessageStore()

// const checkUsername = (name: string) => {
//   if (!name.trim()) {
//     useMessage('Username cannot be empty', '用户名不可为空', 'warn')
//     return false
//   }

//   if (!isValidName(name) && !isValidEmail(name)) {
//     onMounted(() => {
//       info.info('AlertInfo.login.invalidUsername')
//     })
//     return false
//   }

//   return true
// }

// const checkPassword = (password: string) => {
//   if (!password.trim()) {
//     useMessage('Password cannot be empty', '密码不可为空', 'warn')
//     return false
//   }
//   if (!isValidPassword(password)) {
//     onMounted(() => {
//       info.info('AlertInfo.login.invalidPassword')
//     })
//     return false
//   }

//   return true
// }

// export const checkLogin = (
//   name: string,
//   password: string,
//   isCaptureSuccessful: boolean
// ) => {
//   if (!checkUsername(name) || !checkPassword(password)) {
//     return false
//   }

//   if (!isCaptureSuccessful) {
//     useMessage(
//       'Please click above to complete the human verification',
//       '请点击上方完成人机身份验证',
//       'warn'
//     )
//     return false
//   }

//   return true
// }
