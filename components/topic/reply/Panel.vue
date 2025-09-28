<script setup lang="ts">
const { isReplyRewriting, replyRewrite } = storeToRefs(useTempReplyStore())
const { isEdit } = storeToRefs(useTempReplyStore())
const replyStore = usePersistKUNGalgameReplyStore()
const { replyDraft } = storeToRefs(replyStore)

const activeTab = ref<number | 'main'>('main')

const currentData = computed(() =>
  isReplyRewriting.value ? replyRewrite.value : replyDraft.value
)

watch(
  () => [isEdit.value, currentData.value?.targets],
  ([editing, targets]) => {
    if (editing && Array.isArray(targets)) {
      if (targets.length > 0) {
        const lastTarget = targets[targets.length - 1]
        if (!targets.some((t) => t.targetReplyId === activeTab.value)) {
          activeTab.value = lastTarget.targetReplyId
        }
      } else {
        activeTab.value = 'main'
      }
    }
  },
  { deep: true, immediate: true }
)

const handleRemoveTarget = (id: number) => {
  replyStore.removeTarget(id)
}
</script>

<template>
  <Teleport to="body" :disabled="!isEdit">
    <Transition
      enter-active-class="animate-fadeInUp"
      leave-active-class="animate-fadeOutDown"
    >
      <div
        class="fixed bottom-0 z-100 flex max-h-[80%] w-full flex-col items-center"
        v-if="isEdit && currentData"
      >
        <div
          class="bg-content1/85 border-default/20 scrollbar-hide w-full max-w-4xl space-y-2 overflow-scroll rounded-t-lg border p-3"
        >
          <div class="scrollbar-hide flex items-center gap-1 overflow-x-auto">
            <KunButton
              size="xs"
              rounded="full"
              v-for="target in currentData.targets"
              :key="target.targetReplyId"
              :variant="activeTab === target.targetReplyId ? 'solid' : 'flat'"
              @click="activeTab = target.targetReplyId"
            >
              {{ `@${target.targetUserName} #${target.targetFloor}` }}
              <KunButton
                :is-icon-only="true"
                size="xs"
                rounded="full"
                v-if="!isReplyRewriting"
                @click.stop="handleRemoveTarget(target.targetReplyId)"
                color="primary"
                :variant="
                  activeTab === target.targetReplyId ? 'solid' : 'light'
                "
              >
                <KunIcon name="lucide:x" size="12" />
              </KunButton>
            </KunButton>

            <KunButton
              size="xs"
              rounded="full"
              :variant="activeTab === 'main' ? 'solid' : 'flat'"
              @click="activeTab = 'main'"
            >
              回复内容
              <span
                v-if="activeTab === 'main'"
                class="bg-primary absolute bottom-0 left-0 h-0.5 w-full"
              />
            </KunButton>
          </div>

          <div :key="activeTab">
            <template
              v-for="target in currentData.targets"
              :key="target.targetReplyId"
            >
              <div v-show="activeTab === target.targetReplyId">
                <TopicReplyTargetEditor v-model="target.content" />
              </div>
            </template>
            <div v-show="activeTab === 'main'">
              <TopicReplyTargetEditor v-model="currentData.mainContent" />
            </div>
          </div>

          <TopicReplyPanelBtn class="mt-3" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
