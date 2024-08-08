<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: `${t('seo.donate.title')} - ${t('head.title')}`,
  meta: [
    {
      name: 'description',
      content: t('seo.donate.description')
    }
  ]
})

const isShowOR = ref(false)
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

      <div class="qr" v-if="isShowOR">
        <div class="trc">
          <NuxtImg src="/donate/afdian.webp" />
          <span>{{ $t('donate.afdian') }}</span>
          <div>
            <KunCopy text="https://afdian.com/a/kun1007" />
            <a
              class="link-open"
              href="https://afdian.com/a/kun1007"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="lucide:external-link" />
            </a>
          </div>
        </div>

        <div class="trc">
          <NuxtImg src="/donate/TRC20.webp" />
          <span>TRC20</span>
          <KunCopy text="TYBoTkYJchunKZ86ctoL9Kf5VSvX7L5P1w" />
        </div>

        <div class="trc">
          <NuxtImg src="/donate/ERC20.webp" />
          <span>ERC20</span>
          <KunCopy text="0x993f858D5B9e1f4Ee8C056C107391d1f670c1017" />
        </div>
      </div>

      <p v-if="isShowOR" class="help">{{ $t('donate.help') }}</p>

      <div class="btn">
        <span @click="isShowOR = !isShowOR">{{ $t('donate.confirm') }}</span>
        <span @click="navigateTo(localePath('/'))">
          {{ $t('donate.back') }}
        </span>
      </div>
    </div>

    <KunFooter style="margin-bottom: 20px; white-space: nowrap" />
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: calc(100vh - 75px);
  max-width: 64rem;
  min-width: 500px;
  min-height: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--kungalgame-font-color-3);
}

.container {
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 20px;
  position: relative;

  @include kun-blur;

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

.warning {
  span {
    text-transform: uppercase;
    color: var(--kungalgame-red-5);
  }
}

.qr {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 10px;

    .kun-copy {
      text-align: center;
    }

    .link-open {
      color: var(--kungalgame-font-color-1);
      margin-left: 5px;
      font-size: 20px;
    }
  }
}

.help {
  margin: 17px 0;
  font-size: small;
  color: var(--kungalgame-font-color-0);
}

.btn {
  margin-top: 17px;
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
