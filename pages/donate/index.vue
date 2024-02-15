<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('seo.donate.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.donate.description'),
    },
  ],
})

const handleClickDonate = () => {
  useMessage(
    `Let's talk about it when we're in a loss, and first of all, thank you for your support.`,
    '等我们亏钱再说啦，先感谢您的支持',
    'info',
    7777
  )
}
</script>

<template>
  <div class="root">
    <div class="container">
      <div class="title">{{ $t('donate.donate') }}</div>
      <p class="warning">
        {{ $t('donate.donate') }}
        <span>{{ $t('donate.no') }}</span>
        {{ $t('donate.server') }}
      </p>
      <div class="btn">
        <span @click="handleClickDonate">{{ $t('donate.confirm') }}</span>
        <span @click="navigateTo('/')">{{ $t('donate.back') }}</span>
      </div>
    </div>

    <KunFooter style="margin-bottom: 20px; white-space: nowrap" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100vh - 75px);
  width: 100vw;
  min-width: 500px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--kungalgame-font-color-3);
}

.container {
  width: 400px;
  height: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: var(--kungalgame-trans-white-2);
  backdrop-filter: blur(5px);
  box-shadow: var(--kungalgame-shadow-0);
  padding: 20px;
  position: relative;
  border-radius: 7px;

  &:hover {
    box-shadow: var(--kungalgame-shadow-1);
    transition: 0.3s;
  }
}

.title {
  height: 77px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  font-size: 30px;
}

.warning span {
  text-transform: uppercase;
  color: var(--kungalgame-red-5);
}

.btn {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;

  span {
    padding: 7px 10px;
    border-radius: 5px;

    &:nth-child(1) {
      color: var(--kungalgame-green-4);
      border: 1px solid var(--kungalgame-green-4);
      cursor: pointer;

      &:hover {
        background-color: var(--kungalgame-green-4);
        color: var(--kungalgame-white);
      }
    }

    &:nth-child(2) {
      color: var(--kungalgame-blue-5);
      border: 1px solid var(--kungalgame-blue-5);
      cursor: pointer;

      &:hover {
        background-color: var(--kungalgame-blue-5);
        color: var(--kungalgame-white);
      }
    }
  }
}

@media (max-width: 700px) {
  .root {
    min-width: 100%;
  }

  .container {
    width: 90%;
  }
}
</style>
