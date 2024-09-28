<script setup lang="ts">
const { showAlert, alertTitle, alertMsg, isShowCancel } = storeToRefs(
  useComponentMessageStore()
)

const { locale } = useI18n()

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
  <KunDialog :is-show-dialog="showAlert">
    <div class="container">
      <div class="header">
        <h3 v-if="alertTitle">{{ alertTitle[locale as Language] }}</h3>
        <p v-if="alertMsg">{{ alertMsg[locale as Language] }}</p>
      </div>

      <div class="footer">
        <button v-if="isShowCancel ?? true" class="button" @click="handleClose">
          {{ $t('ComponentAlert.cancel') }}
        </button>
        <button class="button" @click="handleConfirm">
          {{ $t('ComponentAlert.confirm') }}
        </button>
      </div>
    </div>
  </KunDialog>
</template>

<style lang="scss" scoped>
.container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--kungalgame-trans-white-2);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  .header {
    h3 {
      margin-bottom: 7px;
    }

    p {
      font-size: small;
    }
  }
}

.footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.button {
  width: 70px;
  height: 30px;
  cursor: pointer;
  border-radius: 2px;

  &:nth-child(1) {
    background-color: transparent;
    border: 1px solid var(--kungalgame-blue-5);
    color: var(--kungalgame-blue-5);
  }

  &:nth-child(2) {
    margin-left: 98px;
    background-color: transparent;
    border: 1px solid var(--kungalgame-red-5);
    color: var(--kungalgame-red-5);
  }

  &:active {
    transform: scale(0.9);
    transition: 0.1s;
  }
}
</style>
