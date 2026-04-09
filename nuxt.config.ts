// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'push',
      short_name: 'push',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    }
  }
})
