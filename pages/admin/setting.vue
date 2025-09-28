<script setup lang="ts">
useKunDisableSeo('网站设置')

const { data } = await useFetch('/api/admin/setting/register', {
  method: 'GET',
  ...kungalgameResponseHandler
})

const registerStatus = ref(data.value ? !data.value.registerStatus : true)

const handleUpdateRegisterStatus = async () => {
  const res = await useComponentMessageStore().alert(
    registerStatus.value ? '要禁止网站注册新用户吗' : '要允许网站注册新用户吗',
    registerStatus.value
      ? '网站受攻击时, 请诸位管理员关闭注册'
      : '这会使网站重新允许新用户注册'
  )
  if (!res) {
    return
  }

  await $fetch('/api/admin/setting/register', {
    method: 'PUT',
    ...kungalgameResponseHandler
  })

  registerStatus.value = !registerStatus.value
}
</script>

<template>
  <KunCard
    :is-hoverable="false"
    :is-pressable="false"
    :is-transparent="false"
    class="w-full"
    content-class="space-y-6"
  >
    <KunHeader
      name="网站设置"
      description="有时网站会不间断涌入大量发布违规信息的用户, 这是有人在攻击网站, 此时请各位管理员关闭网站注册"
    >
    </KunHeader>

    <KunCard
      :is-hoverable="false"
      :is-pressable="false"
      :is-transparent="true"
      content-class="space-y-1"
    >
      <h2 class="text-xl">网站注册状态</h2>
      <p class="text-default-500 text-sm">
        有时网站会不间断涌入大量发布违规信息的用户, 这是有人在攻击网站,
        此时请各位管理员关闭网站注册
      </p>
      <KunSwitch
        :label="
          registerStatus ? '网站当前允许注册新用户' : '网站当前已关闭注册'
        "
        :model-value="registerStatus"
        @update:model-value="handleUpdateRegisterStatus"
      />
    </KunCard>
  </KunCard>
</template>
