// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
        },
    },

    devtools: { enabled: true },
    modules: ['@nuxthub/core', '@nuxtjs/tailwindcss', '@nuxt/image'],

    hub: {
        database: true,
        kv: true,
        blob: true,
        cache: true,
    },
    nitro: {
        scheduledTasks: {
            '0 * * * *': ['schema'],
            '0 0 1 * *': ['purge'],
        },
        experimental: {
            tasks: true
        }
    }
})
