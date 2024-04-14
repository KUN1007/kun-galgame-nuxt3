<script setup lang="ts">
const props = defineProps<{
  type: 'publish' | 'rewrite'
}>()

const initialImageUrl = ref('')

const { rewriteDraft } = storeToRefs(useTempGalgameRewriteStore())

onMounted(async () => {
  if (props.type === 'publish') {
    const imageBlob = await getImage('kun-galgame-publish-banner')
    if (imageBlob) {
      initialImageUrl.value = URL.createObjectURL(imageBlob)
    }
  } else {
    initialImageUrl.value = rewriteDraft.value[0].banner
  }
})
</script>

<template>
  <KunHeader :size="2" :show-help="true">
    <template #header>{{ $t('edit.galgame.banner.name') }}</template>

    <template #help>{{ $t('edit.galgame.banner.help') }}</template>
  </KunHeader>
  <KunUpload
    class="upload"
    :initial-image="initialImageUrl"
    width="300px"
    :size="1920"
    :aspect="16 / 9"
    @set-image="(img) => saveImage(img, `kun-galgame-${type}-banner`)"
  />
</template>

<style lang="scss" scoped>
.upload {
  margin-bottom: 17px;
}
</style>
