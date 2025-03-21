<template>
  <header class="border-b border-gray-200 bg-white">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-900">Blog</NuxtLink>
        </div>
        <div class="flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-gray-900">Home</NuxtLink>
          <NuxtLink to="/blog" class="text-gray-700 hover:text-gray-900">Blog</NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>