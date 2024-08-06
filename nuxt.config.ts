// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  app: {
    head: {
      title: "My test app",
      titleTemplate: " %s | hello from title template",
    },
  },

  $development: {
    app: {
      head: {
        title: "Dev",
      },
    },
  },

  $production: {
    app: {
      head: {
        title: "Prod",
      },
    },
  },

  modules: [
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "@nuxt/content",
    "@nuxtjs/color-mode",
  ],
  colorMode: {
    classSuffix: "",
  },
});
