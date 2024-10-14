<script setup lang="ts">
import { TooltipProvider } from '@milkdown/plugin-tooltip'
import { linkSchema, updateLinkCommand } from '@milkdown/preset-commonmark'
import { TextSelection } from '@milkdown/prose/state'
import { callCommand } from '@milkdown/utils'
import { useInstance } from '@milkdown/vue'
import { usePluginViewContext } from '@prosemirror-adapter/vue'
import type { VNodeRef } from 'vue'

const { view, prevState } = usePluginViewContext()

const linkHref = ref('')
const hide = ref(true)
const [loading, get] = useInstance()

const linkUpdPopRef = ref<VNodeRef>()
let tooltipProvider: TooltipProvider

onMounted(() => {
  const ctx = useTempEditStore().$state.editorContext
  if (!ctx) {
    return
  }

  tooltipProvider = new TooltipProvider({
    content: linkUpdPopRef.value as unknown as HTMLElement,
    debounce: 50,
    shouldShow: (view, _) => {
      if (!view.hasFocus() || !view.editable) {
        return false
      }
      const { selection, doc } = view.state
      const { from, to } = selection

      const linkMarkType = linkSchema.type(ctx)
      if (
        selection instanceof TextSelection &&
        to < doc.content.size &&
        from < doc.content.size &&
        doc.rangeHasMark(from, from === to ? to + 1 : to, linkMarkType)
      ) {
        const cursor = selection.$cursor
        if (!cursor) {
          return false
        }
        const linkMark = doc
          .nodeAt(selection.$cursor.pos)
          ?.marks.find((mark) => mark.type === linkMarkType)
        if (!linkMark) {
          return false
        }
        linkHref.value = linkMark.attrs.href
        hide.value = false
        return selection.empty
      }
      return false
    }
  })

  tooltipProvider.update(view.value, prevState.value)
})

watch([view, prevState], () => {
  tooltipProvider?.update(view.value, prevState.value)
})

onUnmounted(() => {
  tooltipProvider.destroy()
})

const handleUpdateLink = () => {
  get()?.action(callCommand(updateLinkCommand.key, { href: linkHref.value }))
}
</script>

<template>
  <div v-if="loading" class="wrapper" ref="linkUpdPopRef">
    <input
      class="input"
      type="url"
      @keydown.enter="handleUpdateLink"
      v-model="linkHref"
    />
    <button class="confirm-btn" @click="handleUpdateLink">
      {{ $t('edit.topic.link.confirmUpdate') }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 350px;
  display: inline-flex;
  position: absolute;
  border: 1px solid var(--kungalgame-blue-5);
  background-color: var(--kungalgame-white);

  &[data-show='false'] {
    display: none;
  }
}

.input {
  width: 100%;
  border: none;
  padding: 10px;
  background-color: transparent;
}

.confirm-btn {
  width: 65px;
  background-color: transparent;
  border: none;
  color: var(--kungalgame-blue-5);
  font-size: 15px;
  padding: 0 4px;
  flex-shrink: 0;

  &:hover {
    color: var(--kungalgame-white);
    background-color: var(--kungalgame-blue-5);
  }
}
</style>
