<template>
    <div class="min-h-screen flex-col flex items-center justify-between bg-gray-100 ">
        <!-- ========== MAIN CONTENT ========== -->
        <main class=" md:w-3/4 lg:w-3/4 xl:w-1/2 flex flex-col items-center justify-center flex-grow">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h1 class="text-4xl font-bold text-slate-700 mb-6 text-center">
                    About
                </h1>
                <p class="text-lg text-slate-600 leading-relaxed">
                    I was struggling to find a domain name for a new project because of, you know,
                    <NuxtLink class="underline font-bold" to="/what-is-a-domain-squatter">
                        Domain fu***g squatters!!
                    </NuxtLink>
                    <br>
                    And I thought, I might as well laugh about it, since there's nothing else I can do anyway.... <br>
                </p>
                <p class="text-lg text-slate-600 leading-relaxed mt-2">
                    So here it is, enjoy the game!
                </p>
                <p class="text-lg text-slate-600 leading-relaxed mt-2">
                    And if you want to check out my other projects, you can visit:
                    <ul class="list-disc list-inside mt-4 text-lg text-slate-600 leading-relaxed">
                        <li>
                            <a href="https://eventuallymaking.io" class="underline font-bold">My blog</a>
                        </li>
                        <li>
                            <a href="https://bloggrify.com" class="underline font-bold">Bloggrify</a>
                            , an open source project I've made to help bloggers to create a static blog
                        </li>
                        <li>
                            <a href="https://rssfeedpulse.com" class="underline font-bold">RssFeedPulse</a>
                            , a service I've made to provide a newsletter service to bloggers
                        </li>
                    </ul>
                </p>


                <h2 class="text-2xl font-bold text-slate-700 mb-6 text-center">
                    Warning
                </h2>
                <p class="text-lg text-slate-600 leading-relaxed mt-4">
                    Yes, it's a drinking game but I don't encourage you to drink alcohol. You can play with water, juice, or whatever you want. <br>
                </p>
                <div class="flex items-center justify-center mt-4">
                    <NuxtLink
                        to="/"
                        class="inline-flex justify-center items-center gap-x-3 text-center
                bg-gradient-to-tl from-orange-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent
                text-white text-xl font-medium rounded-2xl focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 focus:ring-offset-gray-800 "
                    >
                        Come back to the game
                    </NuxtLink>
                </div>
            </div>
        </main>
        <!-- ========== END MAIN CONTENT ========== -->
        <footer class="bg-gray-400 w-full py-4">
            <div class="text-center text-slate-900 font-semibold">
                &copy; {{ new Date().getFullYear() }} DNS Drinking Game. All rights reserved.

                &nbsp;
                <NuxtLink to="/about" class="text-slate-900 underline">
                    About
                </NuxtLink>
            </div>
        </footer>
    </div>
</template>
<script setup lang="ts">
</script>
