<script setup lang="ts">
const initialImageUrl = ref('')

onMounted(async () => {
  const imageBlob = await getImage('kun-galgame-publish-banner')
  if (imageBlob) {
    initialImageUrl.value = URL.createObjectURL(imageBlob)
  }
})
</script>

<template>
  <div class="space-y-2">
    <h2 class="text-xl">预览图</h2>
    <p class="text-default-500 text-sm">
      Galgame
      预览图请尽量在游戏内截取原始分辨率，不要拍屏，尽量不要包含设备窗口的边，宽度大于高度为好。预览图最终加载大小会变为不大于
      1920 × 1080 分辨率
    </p>
    <KunUpload
      :initial-image="initialImageUrl"
      :size="1920"
      :aspect="16 / 9"
      hint="预览图不可包含 R18 等敏感内容"
      @set-image="(img) => saveImage(img, `kun-galgame-publish-banner`)"
      class-name="w-64"
    />
  </div>
</template>
