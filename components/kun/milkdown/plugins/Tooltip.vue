<script setup lang="ts">
import { Icon } from '#components'
import { TooltipProvider } from '@milkdown/plugin-tooltip'
import {
  toggleStrongCommand,
  toggleEmphasisCommand,
  toggleInlineCodeCommand
} from '@milkdown/preset-commonmark'
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm'
import { callCommand } from '@milkdown/utils'
import { useInstance } from '@milkdown/vue'
import { usePluginViewContext } from '@prosemirror-adapter/vue'
import type { VNodeRef } from 'vue'
import type { CmdKey } from '@milkdown/core'

const { view, prevState } = usePluginViewContext()
const [_, get] = useInstance()

const divRef = ref<VNodeRef>()
let tooltipProvider: TooltipProvider

const KunBold = h(Icon, { name: 'lucide:bold' })
const KunItalic = h(Icon, { name: 'lucide:italic' })
const KunStrikethrough = h(Icon, { name: 'lucide:strikethrough' })
const KunCode = h(Icon, { name: 'lucide:code-xml' })

onMounted(() => {
  tooltipProvider = new TooltipProvider({
    content: divRef.value as any
  })

  tooltipProvider.update(view.value, prevState.value)
})

watch([view, prevState], () => {
  tooltipProvider?.update(view.value, prevState.value)
})

onUnmounted(() => {
  tooltipProvider.destroy()
})

const call = <T,>(command: CmdKey<T>, payload?: T) => {
  return get()?.action(callCommand(command, payload))
}
</script>

<template>
  <div class="tooltip" ref="divRef">
    <button @click="call(toggleStrongCommand.key)">
      <KunBold name="lucide:bold" />
    </button>

    <button @click="call(toggleEmphasisCommand.key)">
      <KunItalic name="lucide:italic" />
    </button>

    <button @click="call(toggleStrikethroughCommand.key)">
      <KunStrikethrough name="lucide:strikethrough" />
    </button>

    <button @click="call(toggleInlineCodeCommand.key)">
      <KunCode name="lucide:code-xml" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  display: flex;
  background-color: var(--kungalgame-trans-white-2);
  border: 1px solid var(--kungalgame-blue-5);
  border-radius: 5px;
  backdrop-filter: blur(10px);
  z-index: 9999;

  &[data-show='false'] {
    display: none;
  }

  button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: none;
    border-radius: 5px;
    margin: 5px;
    font-size: 22px;
    color: var(--kungalgame-font-color-3);
    background-color: transparent;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid var(--kungalgame-blue-5);
      color: var(--kungalgame-blue-5);
    }
  }
}
</style>
