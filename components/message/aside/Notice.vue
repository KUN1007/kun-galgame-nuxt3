<script setup lang="ts">
import { getMessageI18n } from '../utils/getMessageI18n'
import type { Message } from '~/types/api/message'

const props = defineProps<{
  message: Message
  refresh: () => void
}>()

const handleDeleteMessage = async (mid: number) => {
  const res = await useComponentMessageStore().alert(
    '您确定要删除这条消息吗？此操作不可撤销。'
  )
  if (!res) {
    return
  }

  const result = await $fetch(`/api/message/delete`, {
    method: 'DELETE',
    query: { mid },
    watch: false,
    ...kungalgameResponseHandler
  })

  if (result) {
    props.refresh()
    useMessage(10106, 'success')
  }
}
</script>

<template>
  <div
    class="space-y-2 rounded-lg p-2"
    :class="message.status === 'read' ? 'message-read' : ''"
  >
    <div class="flex items-center gap-2 break-all">
      <div class="flex text-lg">
        <KunIcon
          class="text-secondary"
          v-if="message.status === 'unread'"
          name="lucide:info"
        />
        <KunIcon
          class="text-default"
          v-if="message.status === 'read'"
          name="lucide:check-check"
        />
      </div>

      <div>
        <KunLink :to="`/user/${message.sender.id}/info`">
          {{ message.sender.name }}
        </KunLink>
        <span>{{ getMessageI18n(message) }}</span>
      </div>
    </div>

    <div class="flex gap-2">
      <KunAvatar :disable-floating="true" :user="message.sender" />

      <KunLink
        color="default"
        underline="none"
        class="hover:text-primary cursor-pointer transition-colors"
        :to="message.link"
      >
        <pre
          class="break-word text-sm leading-8 whitespace-pre-line text-inherit"
        >
          {{ markdownToText(message.content) }}
        </pre>
      </KunLink>
    </div>

    <div class="flex justify-between">
      <span class="text-default-500 text-sm">
        {{
          formatDate(message.created, {
            isShowYear: true,
            isPrecise: true
          })
        }}
      </span>

      <KunButton
        :is-icon-only="true"
        variant="light"
        color="danger"
        size="sm"
        @click="handleDeleteMessage(message.id)"
      >
        <KunIcon name="lucide:trash-2" />
      </KunButton>
    </div>
  </div>
</template>
