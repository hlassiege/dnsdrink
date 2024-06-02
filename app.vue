<script setup lang="ts">
const title = 'Dns Drinking Game'
const description = 'One rule: try to find a brand name that is not a domain name. If the domain name exists, you drink. Basic.'

useSeoMeta({
    title: title,
    description: description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
})

const pirschCode = process.env.PIRSCH_CODE
if (pirschCode) {
    useHead(() => ({
        script: [
            {
                src: 'https://api.pirsch.io/pa.js',
                id: 'pianjs',
                defer: true,
                'data-code': pirschCode,
                type: 'text/javascript',
            },
        ],
    }))
}


useHead({
    htmlAttrs: {
        lang: 'en'
    },
    link: [
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
    ],

})

</script>

<template>
    <NuxtPage />
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');

.font-bruno {
  font-family: 'Bruno Ace', sans-serif;
}
</style>
