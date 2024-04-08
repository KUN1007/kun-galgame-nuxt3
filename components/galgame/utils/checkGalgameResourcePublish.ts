import { typeOptions, languageOptions, platformOptions } from './options'
import type { GalgameResourceStorePersist } from '~/store/types/galgame/resource'

export const checkGalgameResourcePublish = (
  link: GalgameResourceStorePersist
) => {
  if (!typeOptions.includes(link.type)) {
    useMessage(
      'Please select the correct resource type!',
      '请选择正确的资源类型!',
      'warn'
    )
    return false
  }

  if (!link.link.trim()) {
    useMessage('Resource link cannot be empty!', '资源链接不能为空!', 'warn')
    return false
  }

  if (link.link.length > 1007) {
    useMessage(
      'The maximum length of resource link is 1007!',
      '资源链接最大长度为 1007!',
      'warn'
    )
    return false
  }

  if (!languageOptions.includes(link.language)) {
    useMessage(
      'Please select the correct resource language!',
      '请选择正确的资源语言!',
      'warn'
    )
    return false
  }

  if (!platformOptions.includes(link.platform)) {
    useMessage(
      'Please select the correct resource platform!',
      '请选择正确的资源平台!',
      'warn'
    )
    return false
  }

  if (!ResourceSizePattern.test(link.size)) {
    useMessage(
      'Please enter the correct resource size, which must include MB or GB!',
      '请输入正确的资源大小，必须包含 MB 或 GB!',
      'warn'
    )
    return false
  }

  if (link.code.length > 1007) {
    useMessage(
      'The maximum length of resource link extraction code is 1007!',
      '资源提取码最大长度为 1007!',
      'warn'
    )
    return false
  }

  if (link.password.length > 1007) {
    useMessage(
      'The maximum length of resource decompression code is 1007!',
      '资源解压码最大长度为 1007!',
      'warn'
    )
    return false
  }

  if (link.note.length > 1007) {
    useMessage(
      'The maximum length of resource note is 1007!',
      '资源备注最大长度为 1007!',
      'warn'
    )
    return false
  }

  return true
}
