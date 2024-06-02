<template>
    <div class="min-h-screen flex flex-col justify-between bg-gray-100">
        <main class="flex flex-col items-center justify-center flex-grow p-4 ">
            <NuxtImg
                src="/images/logo.png"
                alt="DNS Drinking Game"
                width="200"
                height="200"
            />
            <h1 class="text-4xl font-bold text-slate-700 mb-6 font-bruno">
                DNS Drinking Game!
            </h1>
            <div class="text-left text-lg mb-6 text-slate-700">
                <span class="font-bold text-slate-600">One rule:</span> try to create an available domain name. <br>
                If the domain name exists, you drink. <br>
                <br>
            </div>
            <div class="w-full max-w-sm mx-auto">
                <div class="flex items-center justify-center">
                    <transition name="slide-fade" mode="out-in">
                        <div v-if="endGame">
                            <div v-if="endGame && gameWin" key="win" class="bg-lime-200 border border-lime-300 text-gray-800 rounded-lg p-4 mb-4" role="alert">
                                <client-only>
                                    <Vue3Lottie
                                        animation-link="/animation/win.json"
                                        :height="200"
                                        :width="200"
                                    />
                                </client-only>
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg
                                            class="flex-shrink-0 size-4 mt-1 text-lime-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 16v-4" />
                                            <path d="M12 8h.01" />
                                        </svg>
                                    </div>
                                    <div class="ms-3">
                                        <h3 class="font-semibold">
                                            You win !
                                        </h3>
                                        <div class="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                                            The domain {{ domainNameCorrected }}  is not registered. You are safe!
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="endGame && gameLost" key="lose" class="bg-red-200 border border-red-300 text-gray-800 rounded-lg p-4 mb-4" role="alert">
                                <client-only>
                                    <Vue3Lottie
                                        animation-link="/animation/drink.json"
                                        :height="200"
                                        :width="200"
                                    />
                                </client-only>
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg
                                            class="flex-shrink-0 size-4 mt-1 text-red-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 16v-4" />
                                            <path d="M12 8h.01" />
                                        </svg>
                                    </div>
                                    <div class="ms-3">
                                        <h3 class="font-semibold">
                                            You lose !
                                        </h3>
                                        <div class="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                                            The domain {{ domainNameCorrected }} is already registered. <strong>Drink up!</strong> <br>
                                            <br>

                                            <span v-if="gameLostBecauseOfDomainSquatter">
                                                <strong>Unfortunately, this domain is for sale. You should have won but <NuxtLink class="underline text-blue-700" to="/what-is-a-domain-squatter">the domain squatter got you</NuxtLink>!</strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                class="w-full inline-flex justify-center items-center gap-x-3 text-center
                bg-gradient-to-tl from-orange-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent
                text-white text-xl font-medium rounded-2xl focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 focus:ring-offset-gray-800"
                                @click="resetGame()"
                            >
                                Play again!
                            </button>
                        </div>
                    </transition>
                    <transition name="slide-fade" mode="out-in">
                        <div v-if="!endGame">
                            <input
                                v-if="!endGame"
                                v-model="brandName"
                                type="text"
                                placeholder="Domain name"
                                class="w-full p-4 border border-gray-300 rounded-2xl mb-4 focus:outline-none focus:border-blue-500"
                                @keydown.enter="checkDomain"
                            >
                            <button
                                v-if="loading"
                                disabled
                                type="button"
                                class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg
                                                disabled:opacity-50 disabled:pointer-events-none
                                            border border-transparent bg-sky-600 text-white hover:bg-blue-700"
                            >
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    class="inline w-4 h-4 me-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                Loading...
                            </button>
                            <button
                                v-if="!loading && !endGame"
                                class="w-full inline-flex justify-center items-center gap-x-3 text-center
                bg-gradient-to-tl from-orange-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent
                text-white text-xl font-medium rounded-2xl focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 focus:ring-offset-gray-800"
                                @click="checkDomain"
                            >
                                Play!
                            </button>
                        </div>
                    </transition>
                </div>
            </div>
        </main>
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
import { ref } from 'vue'

const loading = ref(false)
const endGame = ref(false)
const gameWin = ref(false)
const gameLost = ref(false)
const gameLostBecauseOfDomainSquatter = ref(false)

type ResultType = {
    isForSale: boolean
    isDomainActive: boolean
    domain: string
}

const brandName = ref('')
const domainNameCorrected = ref('')

const resetGame = () => {
    endGame.value = false
    gameWin.value = false
    gameLost.value = false
    gameLostBecauseOfDomainSquatter.value = false
    brandName.value = ''
}

const checkDomain = async () => {
    try {
        loading.value = true
        const result = await $fetch<ResultType>(`/api/domains?domain=${brandName.value}`, {
            method: 'POST'
        })
        domainNameCorrected.value = result.domain
        if (result.isDomainActive) {
            gameLost.value = true
            if (result.isForSale) {
                gameLostBecauseOfDomainSquatter.value = true
            }
        } else {
            gameWin.value = true
        }
    } catch (error) {
        console.error(error)
    }
    endGame.value = true
    loading.value = false
}
</script>
<style>
.slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.5s ease;
}
.slide-fade-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}
.slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
