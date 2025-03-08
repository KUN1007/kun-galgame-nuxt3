<script setup lang="ts"></script>

<template>
  <div class="bg-background flex justify-between gap-3 rounded-lg p-3">
    <div class="w-full space-y-12">
      <HomeTopicContainer />

      <HomeGalgameContainer />

      <HomeFooter />
    </div>

    <div class="w-72 shrink-0 space-y-12">
      <HomeRecent />

      <HomeResourceContainer />
    </div>
  </div>
</template>
