<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { CmdKey } from '@milkdown/core'
import { TooltipProvider } from '@milkdown/plugin-tooltip'
import {
  toggleStrongCommand,
  toggleEmphasisCommand,
  toggleInlineCodeCommand,
} from '@milkdown/preset-commonmark'
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm'
import { callCommand } from '@milkdown/utils'
import { useInstance } from '@milkdown/vue'
import { usePluginViewContext } from '@prosemirror-adapter/vue'
import { onMounted, onUnmounted, ref, VNodeRef, watch } from 'vue'

const { view, prevState } = usePluginViewContext()
const [loading, get] = useInstance()

const divRef = ref<VNodeRef>()

let tooltipProvider: TooltipProvider

onMounted(async () => {
  tooltipProvider = new TooltipProvider({
    content: divRef.value as any,
  })

  tooltipProvider.update(view.value, prevState.value)
})

watch([view, prevState], () => {
  tooltipProvider?.update(view.value, prevState.value)
})

onUnmounted(() => {
  tooltipProvider.destroy()
})

const call = <T>(command: CmdKey<T>, payload?: T) => {
  return get()?.action(callCommand(command, payload))
}
</script>

<template>
  <div v-if="loading" class="tooltip" ref="divRef">
    <button @click="call(toggleStrongCommand.key)">
      <Icon icon="material-symbols:format-bold-rounded" />
    </button>

    <button @click="call(toggleEmphasisCommand.key)">
      <Icon icon="material-symbols:format-italic-rounded" />
    </button>

    <button @click="call(toggleStrikethroughCommand.key)">
      <Icon icon="material-symbols:strikethrough-s-rounded" />
    </button>

    <button @click="call(toggleInlineCodeCommand.key)">
      <Icon icon="material-symbols:code-rounded" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  display: flex;
  background-color: var(--kungalgame-trans-white-2);
  border: 1px solid var(--kungalgame-blue-4);
  border-radius: 5px;
  backdrop-filter: blur(5px);

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
    background-color: var(--kungalgame-trans-white-9);
    border: 1px solid var(--kungalgame-trans-white-9);
    transition: all 0.2s;

    &:hover {
      border: 1px solid var(--kungalgame-blue-4);
      color: var(--kungalgame-blue-4);
    }
  }
}
</style>
