<script setup lang="ts">
import { Icon } from '#components'
import { TooltipProvider } from '@milkdown/kit/plugin/tooltip'
import {
  toggleStrongCommand,
  toggleEmphasisCommand,
  toggleInlineCodeCommand
} from '@milkdown/kit/preset/commonmark'
import { toggleStrikethroughCommand } from '@milkdown/kit/preset/gfm'
import { callCommand } from '@milkdown/kit/utils'
import { useInstance } from '@milkdown/vue'
import { usePluginViewContext } from '@prosemirror-adapter/vue'
import type { VNodeRef } from 'vue'
import type { CmdKey } from '@milkdown/kit/core'

const { view, prevState } = usePluginViewContext()
const [loading, get] = useInstance()

const divRef = ref<VNodeRef>()
let tooltipProvider: TooltipProvider

const KunBold = h(Icon, { name: 'lucide:bold' })
const KunItalic = h(Icon, { name: 'lucide:italic' })
const KunStrikethrough = h(Icon, { name: 'lucide:strikethrough' })
const KunCode = h(Icon, { name: 'lucide:code-xml' })

onMounted(() => {
  tooltipProvider = new TooltipProvider({
    content: divRef.value as unknown as HTMLElement
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
  <div v-if="loading" class="tooltip" ref="divRef">
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
