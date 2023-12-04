/**
 * 错误代码与之对应的消息
 */

/**
 * @number {1....}
 * @number {.1...}
 * @number {..1..} - 1 -> userService
 * @number {...1.}
 * @number {....1} - 某个 service 错误的序号，从上到下
 */

// 定义错误码和错误消息的映射
export const errorMessages: Record<number, string> = {
  // User Part
  10101: `User not found`,
  10102: `User password error`,
  10103: `Email verification code error`,
  10104: `Email is already registered`,
  10105: `Username is already registered`,
  10106: `User bio is too long`,
  10107: `Invalid Email, Name, Password, or Verification Code Format`,
  10108: `Invalid password format`,
  10109: `Invalid Email or Verification Code Format`,
  10110: `Avatar image upload error. The image is an array.`,
  10111: `Avatar image upload error. The final compressed size of the image exceeds 50KB.`,
  10112: `In cooldown for login, two identical login attempts should have a one-minute interval.`,

  // Topic Part
  10201: `Your daily topic limit has been reached for today.`,
  10202: `Your moemoepoints are less than 1100, so you can't use the topic suggestion feature`,
  10204: `Topic title length exceed 40 characters. Or empty.`,
  10205: `Topic content length exceed 100007 characters. Or empty.`,
  10206: `Topic with a maximum of 7 tags. Minimum one tag.`,
  10207: `Topic with a maximum of 2 categories. Minimum one category.`,
  10208: `Invalid topics timestamp.`,

  // Auth Part
  10301: `Sending emails too frequently`,
  10302: `Invalid Email Format`,
  10303: `Invalid Email, Password, or Verification Code Format`,

  // Comment Part
  10401: `Comment length exceed 1007 characters. Or empty.`,

  // Reply Part
  10501: `Reply with a maximum of 7 tags.`,
  10502: `Single tag maximum length is 17 characters`,
  10503: `Reply content is empty`,
  10504: `Reply maximum length is 10007 characters`,
  10505: `Invalid reply timestamp.`,
}
