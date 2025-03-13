import {
  createCodeBlockCommand,
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBlockquoteCommand,
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
  insertHrCommand,
  toggleInlineCodeCommand
} from '@milkdown/preset-commonmark'
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm'

export const commands = [
  { command: toggleStrongCommand.key, icon: 'lucide:bold', label: '加粗' },
  { command: toggleEmphasisCommand.key, icon: 'lucide:italic', label: '斜体' },
  {
    command: toggleStrikethroughCommand.key,
    icon: 'lucide:strikethrough',
    label: '删除线'
  },
  {
    command: wrapInBulletListCommand.key,
    icon: 'lucide:list',
    label: '无序列表'
  },
  {
    command: wrapInOrderedListCommand.key,
    icon: 'lucide:list-ordered',
    label: '有序列表'
  },
  {
    command: wrapInBlockquoteCommand.key,
    icon: 'lucide:quote',
    label: '引用块'
  },
  { command: insertHrCommand.key, icon: 'lucide:minus', label: '水平线' },
  {
    command: toggleInlineCodeCommand.key,
    icon: 'lucide:code-xml',
    label: '行内代码'
  },
  {
    command: createCodeBlockCommand.key,
    icon: 'lucide:square-code',
    label: '代码块',
    payload: 'javascript'
  }
]
