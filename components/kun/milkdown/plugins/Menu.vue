<script setup lang="ts">
import { callCommand } from '@milkdown/utils'
import { insertImageCommand } from '@milkdown/preset-commonmark'
import { insertLinkPlugin } from './hyperlinkInsert'
import { commands } from './_buttonList'
import type { UseEditorReturn } from '@milkdown/vue'
import type { CmdKey } from '@milkdown/core'

const props = defineProps<{
  editorInfo: UseEditorReturn
  isShowUploadImage: boolean
}>()

const { get } = props.editorInfo
const input = ref<HTMLElement>()
const isShowInsertLink = ref(false)

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
    const fileName = file.name.replace(/[^a-zA-Z0-9 ]/g, '')
    const userName = usePersistUserStore().name
    const imageName = `${userName}-${Date.now()}-${fileName}`
    call(insertImageCommand.key, {
      src: result ?? '',
      title: imageName,
      alt: imageName
    })
    useMessage(10108, 'success')
  }
}
</script>

<template>
  <div class="flex items-center space-x-1">
    <KunMilkdownPluginsModeToggle />

    <KunButton
      :is-icon-only="true"
      v-for="(btn, index) in commands"
      :key="index"
      class="btn"
      variant="light"
      size="xl"
      @click="call(btn.command, btn.payload)"
    >
      <Icon class="text-foreground" :name="btn.icon" />
    </KunButton>

    <KunButton
      :is-icon-only="true"
      variant="light"
      size="xl"
      @click="isShowInsertLink = true"
    >
      <Icon class="text-foreground" name="lucide:link" />
      <KunMilkdownPluginsLinkInsertDialog
        :show="isShowInsertLink"
        @insert="
          call(
            insertLinkPlugin.key,
            undefined,
            () => (isShowInsertLink = false)
          )
        "
        @cancel="isShowInsertLink = false"
      />
    </KunButton>

    <KunButton
      :is-icon-only="true"
      v-if="props.isShowUploadImage"
      variant="light"
      size="xl"
      @click="input?.click()"
    >
      <Icon class="text-foreground" name="lucide:image-plus" />
      <input
        hidden
        ref="input"
        type="file"
        accept=".jpg, .jpeg, .png, .webp"
        @change="handleFileChange($event)"
      />
    </KunButton>

    <KunButton variant="light" size="xl" :is-icon-only="true">
      <Icon class="text-foreground" name="lucide:smile-plus" />
      <KunMilkdownPluginsEmojiContainer :editor-info="editorInfo" />
    </KunButton>
  </div>
</template>
