<script setup lang="ts">
const uploadedImage = ref<Blob>()
const isUploading = ref(false)
const { avatar, avatarMin } = storeToRefs(usePersistUserStore())

const handleChangeAvatar = async () => {
  if (!uploadedImage.value) {
    useMessage(10113, 'warn')
    return
  }

  const formData = new FormData()
  formData.append('avatar', uploadedImage.value, usePersistUserStore().name)

  isUploading.value = true
  useMessage(10114, 'info')

  const avatarLink = await $fetch('/api/user/avatar', {
    method: 'POST',
    body: formData,
    watch: false,
    ...kungalgameResponseHandler
  })

  if (avatarLink) {
    avatar.value = avatarLink
    avatarMin.value = avatarLink.replace(/\.webp$/, '-100.webp')
    isUploading.value = false
    useMessage(10115, 'success')
  }
}
</script>

<template>
  <KunCard :is-hoverable="false" content-class="space-y-3">
    <div class="flex justify-between gap-3">
      <div>
        <span class="text-xl">更改头像</span>
        <p class="text-default-500 text-sm">
          更改头像不是必须, 但是还是有头像比较好, 最好是小只可爱软萌的孩子, 嗯。
        </p>
        <p class="text-default-500 text-sm">
          您的默认头像将会从
          <KunLink size="sm" :to="kungal.domain.sticker" target="_blank">
            鲲 Galgame 表情包
          </KunLink>
          中随机选取, 每一次都是不同的孩子哦, 欸嘿嘿嘿
        </p>
      </div>

      <KunUpload
        class-name="w-24"
        :size="1920"
        :aspect="1 / 1"
        @set-image="(img) => (uploadedImage = img)"
      />
    </div>

    <div class="flex justify-end">
      <KunButton :loading="isUploading" @click="handleChangeAvatar">
        确定更改
      </KunButton>
    </div>
  </KunCard>
</template>
