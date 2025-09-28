import type { KunSelectOption } from '~/components/kun/select/type'
import type { KunTabItem } from '~/components/kun/tab/type'

export const kunUpdateLogTabItem: KunTabItem[] = [
  {
    value: 'history',
    textValue: '更新历史',
    href: '/update/history'
  },
  {
    value: 'todo',
    textValue: '待办列表',
    href: '/update/todo'
  }
]

export const KUN_UPDATE_LOG = [
  'feat',
  'pref',
  'fix',
  'styles',
  'mod',
  'chore',
  'sec',
  'refactor',
  'docs',
  'test'
] as const
export type KUN_UPDATE_LOG_TYPE = (typeof KUN_UPDATE_LOG)[number]
export const KUN_UPDATE_LOG_TYPE_MAP: Record<string, string> = {
  feat: '增加功能',
  pref: '性能优化',
  fix: '错误修复',
  styles: '样式修改',
  mod: '功能更改',
  chore: '其它修改',
  sec: '安全提升',
  refactor: '代码重构',
  docs: '文档修改',
  test: '测试用例'
}

export const KUN_TODO_TYPE_MAP: Record<string, string> = {
  forum: '论坛',
  patch: '补丁站'
}
export const kunTodoTypeOptions: KunSelectOption[] = [
  { value: 'forum', label: '论坛' },
  { value: 'patch', label: '补丁站' }
]
export const KUN_TODO_TYPE_CONST = ['forum', 'patch'] as const

export const KUN_UPDATE_LOG_STATUS_MAP: Record<string, string> = {
  0: '待处理',
  1: '进行中',
  2: '已完成',
  3: '已废弃'
}
