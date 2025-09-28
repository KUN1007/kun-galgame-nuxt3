import {
  createCodeBlockCommand,
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
  insertHrCommand,
  toggleInlineCodeCommand
} from '@milkdown/kit/preset/commonmark'
import { toggleStrikethroughCommand } from '@milkdown/kit/preset/gfm'

export const commands = [
  { command: toggleStrongCommand, icon: 'lucide:bold', label: '加粗' },
  { command: toggleEmphasisCommand, icon: 'lucide:italic', label: '斜体' },
  {
    command: toggleStrikethroughCommand,
    icon: 'lucide:strikethrough',
    label: '删除线'
  },
  {
    command: wrapInBulletListCommand,
    icon: 'lucide:list',
    label: '无序列表'
  },
  {
    command: wrapInOrderedListCommand,
    icon: 'lucide:list-ordered',
    label: '有序列表'
  },
  {
    command: wrapInBlockquoteCommand,
    icon: 'lucide:quote',
    label: '引用块'
  },
  { command: insertHrCommand, icon: 'lucide:minus', label: '水平线' },
  {
    command: toggleInlineCodeCommand,
    icon: 'lucide:code-xml',
    label: '行内代码'
  },
  {
    command: createCodeBlockCommand,
    icon: 'lucide:square-code',
    label: '代码块',
    payload: 'javascript'
  }
]
