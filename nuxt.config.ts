// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, override: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/image",
    "@pinia-plugin-persistedstate/nuxt",
  ],
})