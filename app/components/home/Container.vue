<script setup lang="ts"></script>

<template>
  <div class="flex flex-col justify-between gap-3 rounded-lg lg:flex-row">
    <div class="w-full space-y-3">
      <HomeCarousel />

      <HomeTopicContainer />

      <HomeGalgameContainer />

      <HomeFooter />
    </div>

    <div class="w-full shrink-0 space-y-3 lg:w-72">
      <HomeRecent />

      <HomeResourceContainer />
    </div>
  </div>
</template>
