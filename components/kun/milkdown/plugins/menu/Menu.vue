<script setup lang="ts">
import { callCommand } from '@milkdown/kit/utils'
import { insertImageCommand } from '@milkdown/kit/preset/commonmark'
import { commands } from './_buttonList'
import { tabs, activeTab } from '../../atom'
import type { UseEditorReturn } from '@milkdown/vue'
import type { CmdKey } from '@milkdown/kit/core'

const props = defineProps<{
  editorInfo: UseEditorReturn
  isShowUploadImage: boolean
}>()

const { get } = props.editorInfo
const input = ref<HTMLElement>()

const call = <T,>(command: CmdKey<T>, payload?: T, callback?: () => void) => {
  const result = get()?.action(callCommand(command, payload))
  if (callback) {
    callback()
  }
  return result
}

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) {
    return
  }
  const file = input.files[0]

  const formData = new FormData()
  formData.append('image', file)

  useMessage(10107, 'info')
  const result = await $fetch('/api/image/topic', {
    method: 'POST',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    const filename = file.name.replace(/[^a-zA-Z0-9 ]/g, '')
    const userName = usePersistUserStore().name
    const imageName = `${userName}-${Date.now()}-${filename}`
    call(insertImageCommand.key, {
      src: result ?? '',
      title: imageName,
      alt: imageName
    })
    useMessage(10108, 'success')
  }
}

const toggleTab = () => {
  activeTab.value = activeTab.value === 'preview' ? 'code' : 'preview'
}

const currentTabLabel = computed(() => {
  return activeTab.value === 'preview' ? tabs[1].textValue : tabs[0].textValue
})
</script>

<template>
  <div class="flex flex-wrap items-center space-x-1">
    <KunButton variant="light" @click="toggleTab">
      {{ currentTabLabel }}
    </KunButton>

    <template v-if="activeTab === 'preview'">
      <KunMilkdownPluginsHeader :editor-info="editorInfo" />

      <KunButton
        :is-icon-only="true"
        v-for="(btn, index) in commands"
        :key="index"
        class-name="text-xl"
        variant="light"
        @click="call(btn.command.key, btn.payload)"
      >
        <KunIcon class="text-foreground" :name="btn.icon" />
      </KunButton>

      <KunButton
        :is-icon-only="true"
        v-if="props.isShowUploadImage"
        variant="light"
        class-name="text-xl"
        @click="input?.click()"
      >
        <KunIcon class="text-foreground" name="lucide:image-plus" />
        <input
          hidden
          ref="input"
          type="file"
          accept=".jpg, .jpeg, .png, .webp"
          @change="handleFileChange($event)"
        />
      </KunButton>

      <KunPopover inner-class="-left-28">
        <template #trigger>
          <KunButton variant="light" class-name="text-xl" :is-icon-only="true">
            <KunIcon class="text-foreground" name="lucide:smile-plus" />
          </KunButton>
        </template>

        <KunMilkdownPluginsEmojiContainer :editor-info="editorInfo" />
      </KunPopover>

      <KunPopover inner-class="-left-28">
        <template #trigger>
          <KunButton variant="light" class-name="text-xl" :is-icon-only="true">
            <KunIcon class="text-foreground" name="lucide:sticker" />
          </KunButton>
        </template>

        <KunMilkdownPluginsStickerContainer :editor-info="editorInfo" />
      </KunPopover>
    </template>
  </div>
</template>
