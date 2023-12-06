/* -B means backend, message error code is defined by backend */

const errorMessagesEN: Record<number, string> = {
  // User Part
  10101: `User not found (-B)`,
  10102: `User password error (-B)`,
  10103: `Email verification code error (-B)`,
  10104: `Email is already registered, please change it (-B)`,
  10105: `Username is already registered, please change it (-B)`,
  10106: `User bio is too long (-B)`,
  10107: `Invalid Email, Name, Password, or Verification Code Format (-B)`,
  10108: `Invalid password format (-B)`,
  10109: `Invalid Email or Verification Code Format (-B)`,
  10110: `Avatar image upload error. The image is an array. (-B)`,
  10111: `Avatar image upload error. The final compressed size of the image exceeds 50KB. (-B)`,
  10112: `In cooldown for login, two identical login attempts should have a one-minute interval. (-B)`,

  // Topic Part
  10201: `Your daily topic limit has been reached for today. (-B)`,
  10202: `Your moemoepoints are less than 1100, so you can't use the topic suggestion feature (-B)`,
  10204: `Topic title length exceed 40 characters. Or empty. (-B)`,
  10205: `Topic content length exceed 100007 characters. Or empty. (-B)`,
  10206: `Topic with a maximum of 7 tags. Minimum one tag. (-B)`,
  10207: `Topic with a maximum of 2 categories. Minimum one category. (-B)`,
  10208: `Invalid topics timestamp. (-B)`,

  // Auth Part
  10301: `Sending emails too frequently, please waiting 30s (-B)`,
  10302: `Invalid Email Format (-B)`,
  10303: `Invalid Email, Password, or Verification Code Format (-B)`,

  // Comment Part
  10401: `Comment length exceed 1007 characters. Or empty. (-B)`,

  // Reply Part
  10501: `Reply with a maximum of 7 tags. (-B)`,
  10502: `Single tag maximum length is 17 characters (-B)`,
  10503: `Reply content is empty (-B)`,
  10504: `Reply maximum length is 10007 characters (-B)`,
  10505: `Invalid reply timestamp. (-B)`,
}

const errorMessagesCN: Record<number, string> = {
  10101: `用户未找到 (-B)`,
  10102: `用户密码错误 (-B)`,
  10103: `邮箱验证码错误 (-B)`,
  10104: `邮箱已被注册，请更改 (-B)`,
  10105: `用户名已被注册，请修改 (-B)`,
  10106: `用户签名过长 (-B)`,
  10107: `非法的邮箱, 用户名, 密码, 或验证码 (-B)`,
  10108: `非法的密码格式 (-B)`,
  10109: `非法的邮箱或验证码格式 (-B)`,
  10110: `头像上传错误. 图片为数组 (-B)`,
  10111: `头像上传错误. 图片最终压缩大小超过 50kb (-B)`,
  10112: `登陆冷却中，两次相同登陆时间间隔一分钟 (-B)`,

  10201: `您今日可以发表的话题数已达上限 (-B)`,
  10202: `您的萌萌点不足 1100, 无法使用推话题功能 (-B)`,
  10204: `话题标题长度超过 40 个字符, 或为空 (-B)`,
  10205: `话题内容长度超过 100007 个字符, 或为空 (-B)`,
  10206: `话题最多 7 个标签, 最少一个标签 (-B)`,
  10207: `话题最多 2 个分类, 最少一个分类 (-B)`,
  10208: `非法的话题时间戳. (-B)`,

  10301: `发送邮件频率过快, 请等待 30 秒 (-B)`,
  10302: `非法的邮箱格式 (-B)`,
  10303: `非法的邮箱, 密码, 或验证码 (-B)`,

  10401: `评论内容长度超过 1007 个字符, 或为空 (-B)`,

  10501: `回复最多 7 个标签 (-B)`,
  10502: `单个标签最长 17 个字符 (-B)`,
  10503: `回复内容不可为空 (-B)`,
  10504: `回复内容最大长度为 10007 个字符 (-B)`,
  10505: `非法的回复时间戳 (-B)`,
}

export const getErrorMessageEN = (errorCode: number) => {
  return errorMessagesEN[errorCode] || `Unknown server error (-B)`
}

export const getErrorMessageCN = (errorCode: number) => {
  return errorMessagesCN[errorCode] || `未知的服务器错误 (-B)`
}
