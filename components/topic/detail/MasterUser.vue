<script setup lang="ts">
const props = defineProps<{
  user: {
    id: number
    name: string
    avatar: string
    moemoepoint: number
  }
}>()

const user = computed(() => props.user)
</script>

<template>
  <div class="hidden w-52 shrink-0 lg:block">
    <div class="sticky top-3">
      <KunCard
        :is-transparent="false"
        :is-hoverable="false"
        class-name="shrink-0 z-1 hidden lg:flex"
        content-class="justify-start items-center gap-3"
      >
        <KunAvatar
          :disable-floating="true"
          class-name="w-46 h-46 hover:scale-100"
          size="original"
          image-class-name="w-46 h-46 shrink-0 rounded-lg"
          :user="user"
        />

        <KunLink
          underline="hover"
          :aria-label="props.user.name"
          :to="`/user/${user.id}/info`"
        >
          {{ user.name }}
        </KunLink>

        <p class="text-secondary flex items-center gap-1">
          <KunIcon class="text-inherit" name="lucide:lollipop" />
          {{ user.moemoepoint }}
        </p>

        <TopicDetailTableOfContent />
      </KunCard>
    </div>
  </div>
</template>
