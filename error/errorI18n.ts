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
  10110: `Avatar image upload error. The image is null or an array. (-B)`,
  10111: `Avatar image upload error. The final compressed size of the image exceeds 50KB. (-B)`,
  10112: `In cooldown for login, two identical login attempts should have a 17 seconds interval. (-B)`,
  10113: `In cooldown for register, two identical register attempts should have a one-minute interval. (-B)`,
  10114: `Invalid user uid (-B)`,
  10115: `Login expired, please login to use this feature (-B)`,
  10116: `Upload image error, unknown server error (-B)`,
  10117: `Update username failed, invalid username (-B)`,
  10118: `Update username failed, your moemoepoints are less than 1017 (-B)`,
  10119: `You have already checked in today (-B)`,

  // Topic Part
  10201: `Your daily topic limit has been reached for today. (-B)`,
  10202: `Your moemoepoints are less than 1100, so you can't use the upvote topic feature (-B)`,
  10204: `Topic title length exceed 40 characters. Or empty. (-B)`,
  10205: `Topic content length exceed 100007 characters. Or empty. (-B)`,
  10206: `Topic with a maximum of 7 tags. Minimum one tag. (-B)`,
  10207: `Topic with a maximum of 2 categories. Minimum one category. (-B)`,
  10208: `Invalid topics timestamp. (-B)`,
  10209: `We currently do not allow customizing the number of items per single page query. (-B)`,
  10210: `Read topic ID failed. (-B)`,
  10211: `Topic not found. (-B)`,
  10212: `You've already liked this topic. (-B)`,
  10213: `You've already disliked this topic. (-B)`,
  10214: `Upload image size is too large, maximum allowed is 10 MB. (-B)`,
  10215: `The compressed image still exceeds 1007 kb. Please upload again.`,
  10216: `Image upload error. The image is null or an array. (-B)`,
  10217: `You have reached the limit of 50 uploaded images today. (-B)`,

  // Auth Part
  10301: `Sending emails too frequently, please waiting 30s (-B)`,
  10302: `Invalid Email Format (-B)`,
  10303: `Invalid Email, Password, or Verification Code Format (-B)`,
  10304: `Email address not registered. (-B)`,

  // Comment Part
  10401: `Comment length exceed 1007 characters. Or empty. (-B)`,

  // Reply Part
  10501: `Reply with a maximum of 7 tags. (-B)`,
  10502: `Single tag maximum length is 17 characters (-B)`,
  10503: `Reply content is empty (-B)`,
  10504: `Reply maximum length is 10007 characters (-B)`,
  10505: `Invalid reply timestamp. (-B)`,
  10506: `Reply not found. (-B)`,
  10507: `Insufficient parameters to get a reply request, or failed to parse the request (-B)`,
  10508: `Your moemoepoints are less than 1100, so you can't use the upvote reply feature (-B)`,
  10509: `You've already liked this reply. (-B)`,
  10510: `You've already disliked this reply. (-B)`,
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
  10110: `头像上传错误. 图片为空或数组 (-B)`,
  10111: `头像上传错误. 图片最终压缩大小超过 50kb (-B)`,
  10112: `登陆冷却中，两次相同登陆时间间隔 17 秒 (-B)`,
  10113: `注册冷却中，两次相同注册时间间隔一分钟 (-B)`,
  10114: `非法的用户 UID (-B)`,
  10115: `登陆过期, 请登录使用该功能 (-B)`,
  10116: `上传图片错误，未知的服务器错误 (-B)`,
  10117: `更新用户名错误，非法的用户名 (-B)`,
  10118: `更新用户名错误，您的萌萌点不足 1017 (-B)`,
  10119: `您今日已经签到过了 (-B)`,

  10201: `您今日可以发表的话题数已达上限 (-B)`,
  10202: `您的萌萌点不足 1100, 无法使用推话题功能 (-B)`,
  10204: `话题标题长度超过 40 个字符, 或为空 (-B)`,
  10205: `话题内容长度超过 100007 个字符, 或为空 (-B)`,
  10206: `话题最多 7 个标签, 最少一个标签 (-B)`,
  10207: `话题最多 2 个分类, 最少一个分类 (-B)`,
  10208: `非法的话题时间戳 (-B)`,
  10209: `我们暂时还没有允许自定义单页查询的项目数 (-B)`,
  10210: `读取话题 ID 失败 (-B)`,
  10211: `未找到话题 (-B)`,
  10212: `您已经点赞过这个话题了 (-B)`,
  10213: `您已经点踩过这个话题了 (-B)`,
  10214: `上传图片大小过大，最大为 10 MB (-B)`,
  10215: `图片压缩后超过 1007 KB, 请重新上传`,
  10216: `图片上传错误，图片为空或数组 (-B)`,
  10217: `您今天上传图片已达 50 张限制 (-B)`,

  10301: `发送邮件频率过快, 请等待 30 秒 (-B)`,
  10302: `非法的邮箱格式 (-B)`,
  10303: `非法的邮箱, 密码, 或验证码 (-B)`,
  10304: `该邮箱地址未注册 (-B)`,

  10401: `评论内容长度超过 1007 个字符, 或为空 (-B)`,

  10501: `回复最多 7 个标签 (-B)`,
  10502: `单个标签最长 17 个字符 (-B)`,
  10503: `回复内容不可为空 (-B)`,
  10504: `回复内容最大长度为 10007 个字符 (-B)`,
  10505: `非法的回复时间戳 (-B)`,
  10506: `回复未找到 (-B)`,
  10507: `获取回复请求参数不足, 或解析请求参数失败 (-B)`,
  10508: `您的萌萌点不足 1100, 无法使用推回复功能 (-B)`,
  10509: `您已经点赞过这个回复了 (-B)`,
  10510: `您已经点踩过这个回复了 (-B)`,
}

export const getErrorMessageEN = (errorCode: number) => {
  return errorMessagesEN[errorCode] || `Unknown server error (-B)`
}

export const getErrorMessageCN = (errorCode: number) => {
  return errorMessagesCN[errorCode] || `未知的服务器错误 (-B)`
}
