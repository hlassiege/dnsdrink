<template>
    <div class="min-h-screen flex flex-col items-center justify-between bg-gray-100 ">
        <!-- ========== MAIN CONTENT ========== -->
        <main class="p-8 md:w-3/4 lg:w-3/4 xl:w-1/2">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h1 class="text-4xl font-bold text-slate-700 mb-6 text-center">
                    What is a Domain Squatter?
                </h1>
                <p class="text-lg text-slate-600 leading-relaxed">
                    You know what it's hard when you try to create a new product ? Finding a domain name that is not already taken.
                    Because there is a high chance that the domain name you want is already taken by a domain squatter. <br>
                </p>
                <p class="text-lg text-slate-600 leading-relaxed mt-2">
                    Domain squatting can be a lucrative business and a real <strong>pain in the ***</strong> for people that want to create a new product or service. <br>
                    <br>
                    Cybersquatters are individuals who register domain names with the intent of reselling them at a profit.
                    <br>
                    They often target domain names:
                </p>
                <ul class="list-disc list-inside mt-4 text-lg text-slate-600 leading-relaxed">
                    <li>
                        that are similar to established brand names, hoping to sell them back at a significant profit, or using it to redirect traffic to their own websites or preparing phishing attacks.
                    </li>
                    <li>
                        that are associated with popular trends or events, hoping to capitalize on the traffic generated by these terms.
                    </li>
                    <li>
                        that are generic terms or phrases, hoping to sell them to businesses or individuals looking for a domain name that matches their industry or interests.
                    </li>
                </ul>
                <h2 class="text-2xl font-bold text-slate-700 mb-6 text-center">
                    Is it legal ?
                </h2>
                <p class="text-lg text-slate-600 leading-relaxed mt-4">
                    It depends. <br>
                    Domain squatting is not illegal per se, but it can violate trademark laws if the domain name is similar to an established brand name and is being used in bad faith. <br>
                    <br>
                    There are laws and policies in place to combat domain squatting. For instance, the Uniform Domain-Name Dispute-Resolution Policy (UDRP) established by the Internet Corporation for Assigned Names and Numbers (ICANN) provides a mechanism for resolving disputes involving domain names. Under UDRP, trademark owners can file a complaint against domain squatters, and if successful, the domain name can be transferred back to the trademark owner.
                </p>
                <div class="flex items-center justify-center mt-4">
                    <NuxtLink
                        to="/"
                        class="inline-flex justify-center items-center gap-x-3 text-center
                bg-gradient-to-tl from-orange-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent
                text-white text-xl font-medium rounded-2xl focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 focus:ring-offset-gray-800 "
                    >
                        Forget about it and play another game
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
                -
                <NuxtLink to="https://github.com/hlassiege/dnsdrink" class="text-slate-900 underline">
                    Github
                </NuxtLink>
            </div>
        </footer>
    </div>
</template>
<script setup lang="ts">
</script>
