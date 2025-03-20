<script setup lang="ts">
const error = useError()

const handleError = async () => {
  clearError({ redirect: '/' })
  await new Promise((resolve) => {
    setTimeout(resolve, 1007)
  })
  location.reload()
}
</script>

<template>
  <KunLayout>
    <div class="root" v-if="error">
      <div class="card" v-if="error.statusCode === 404">
        <h1>404</h1>
        <NuxtImg :src="useRandomSticker" />
        <p>杂~~~鱼~♡杂鱼~♡ 臭杂鱼♡ 页面不见了 ~ 是不是被你吃了?!</p>
        <KunButton color="danger" @click="handleError">
          一键转生为萝莉
        </KunButton>
      </div>

      <div class="card" v-else>
        <h1>{{ error.message }}</h1>
        <p>杂~~~鱼~♡杂鱼~♡ 臭杂鱼♡ 页面出错了 ~ 是不是你干的?!</p>
        <KunButton color="danger" @click="handleError">
          一键转生为萝莉
        </KunButton>
      </div>
    </div>
  </KunLayout>
</template>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100dvh - 75px);
  max-width: 80rem;
  margin: 0 auto;
}

.card {
  margin: 0 auto;
  padding: 17px;

  flex-direction: column;

  h1 {
    color: var(--kungalgame-red-5);

    &::before {
      content: '';
      color: var(--kungalgame-blue-5);
      margin-right: 0;
    }
  }

  img {
    margin: 10px 0;
  }

  p {
    text-align: center;
    font-weight: bold;
    margin-bottom: 17px;
  }
}
</style>
