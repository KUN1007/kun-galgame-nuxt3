<script setup lang="ts">
import { TooltipProvider } from '@milkdown/plugin-tooltip'
import { linkSchema, updateLinkCommand } from '@milkdown/preset-commonmark'
import { TextSelection } from '@milkdown/prose/state'
import { callCommand } from '@milkdown/utils'
import { useInstance } from '@milkdown/vue'
import { usePluginViewContext } from '@prosemirror-adapter/vue'
import type { VNodeRef } from 'vue'

const { view, prevState } = usePluginViewContext()

const linkUpdPopRef = ref<VNodeRef>()
const linkHref = ref('')
const hide = ref(true)
const [_, get] = useInstance()

let tooltipProvider: TooltipProvider

onMounted(() => {
  const ctx = useTempEditStore().$state.editorContext
  if (!ctx) {
    return
  }

  tooltipProvider = new TooltipProvider({
    content: linkUpdPopRef.value as any,
    debounce: 50,
    shouldShow: (view, prevState) => {
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
  <div ref="linkUpdPopRef">
    <div v-if="!hide" class="wrapper">
      <input
        class="input"
        type="url"
        @keydown.enter="handleUpdateLink"
        v-model="linkHref"
      />
      <button class="confirm-btn" @click="handleUpdateLink">
        {{ $t('edit.link.confirmUpdate') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 350px;
  display: inline-flex;
  border: 1px solid var(--kungalgame-blue-5);
  border-radius: 5px;
  background-color: var(--kungalgame-trans-white-5);
  backdrop-filter: blur(10px);
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
