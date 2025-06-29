<script setup lang="ts">
const { showAlert, alertTitle, alertMsg, isShowCancel } = storeToRefs(
  useComponentMessageStore()
)

const handleClose = () => {
  showAlert.value = false
  useComponentMessageStore().handleClose()
}

const handleConfirm = () => {
  showAlert.value = false
  useComponentMessageStore().handleConfirm()
}
</script>

<template>
  <KunModal
    :modal-value="showAlert"
    @update:modal-value="(value) => (showAlert = value)"
    class-name="z-2000 fixed"
  >
    <div class="max-w-80">
      <div class="space-y-2">
        <h3 class="text-lg" v-if="alertTitle">{{ alertTitle }}</h3>
        <p class="text-sm" v-if="alertMsg">{{ alertMsg }}</p>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <KunButton
          v-if="isShowCancel ?? true"
          variant="light"
          color="danger"
          @click="handleClose"
        >
          取消
        </KunButton>
        <KunButton @click="handleConfirm">确定</KunButton>
      </div>
    </div>
  </KunModal>
</template>
