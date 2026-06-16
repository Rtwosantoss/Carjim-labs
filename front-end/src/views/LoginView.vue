<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const showPassword = ref(false)
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()
const auth = useAuthStore()

function handleLogin() {
  errorMsg.value = ''
  const ok = auth.login(email.value, password.value)
  if (ok) {
    router.push('/dashboard')
  } else {
    errorMsg.value = 'Credenciais inválidas.'
  }
}
</script>


<template>
    <main class="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <!--Lado Esquerdo Inscrição-->
        <section class="bg-[#01110f] text-white px-6 lg:px-14 py-10 flex flex-col justify-center">
            <div class="flex items-center gap-4 mb-6">
                <div class="w-14 h-14 rounded-xl bg-[#24b6a1] flex items-center justify-center">
                    <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        aria-hidden="true">
                        <path
                            d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                        <path d="M9 13a4.5 4.5 0 0 0 3-4" />
                        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                        <path d="M6 18a4 4 0 0 1-1.967-.516" />
                        <path d="M12 13h4" />
                        <path d="M12 18h6a2 2 0 0 1 2 2v1" />
                        <path d="M12 8h8" />
                        <path d="M16 8V5a2 2 0 0 1 2-2" />
                        <circle cx="16" cy="13" r=".5" />
                        <circle cx="18" cy="3" r=".5" />
                        <circle cx="20" cy="21" r=".5" />
                        <circle cx="20" cy="8" r=".5" />
                    </svg>
                </div>
                <div>
                    <h1 class="text-4xl font-bold leading-none">CarjimLabs</h1>
                    <p class="text-lg text-slate-200">IA para decisões clínicas mais rápidas</p>
                </div>
            </div>
            <div class="max-w-xl">
                <h2 class="text-3xl font-bold leading-tight mb-8">Análise de Exames com Inteligência Artificial</h2>
                <p class="text-lg text-slate-200 mb-12 leading-relaxed max-w-md">
                    Transforme a forma como sua clínica analisa exames médicos. Nossa IA oferece resultados precisos em
                    segundos.
                </p>
            </div>

            <div class="mt-16 space-y-8">
                <!--Beneficio 1-->
                <div class="flex items-center gap-5">
                    <!--icon 1-->
                    <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#24b6a1]">
                        <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            aria-hidden="true">
                            <path d="M6 18h8" />
                            <path d="M3 22h18" />
                            <path d="M14 22a7 7 0 1 0 0-14h-1" />
                            <path d="M9 14h2" />
                            <path d="M8 6h6" />
                            <path d="M9 2h4v10H9z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold">Análise Inteligente</h3>
                        <p class="text-sm text-slate-200">Apoio inteligente para analisar exames.</p>
                    </div>
                </div>

                <!--Beneficio 2-->
                <div class="flex items-center gap-5">
                    <!--icon 2-->
                    <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#24b6a1]">
                        <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            aria-hidden="true">
                            <path d="M10 2h4" />
                            <path d="M12 14l3-3" />
                            <circle cx="12" cy="14" r="8" />
                            <path d="M3 10h3" />
                            <path d="M2 14h4" />
                            <path d="M3 18h3" />
                        </svg>
                    </div>

                    <div>
                        <h3 class="text-xl font-bold">Resultados Rápidos</h3>
                        <p class="text-sm text-slate-200">Menos tempo entre exame e decisão.</p>
                    </div>
                </div>

                <!--Beneficio 3-->
                <div class="flex items-center gap-5">
                    <!--icon 3-->
                    <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#24b6a1]">
                        <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            aria-hidden="true">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="M9 12l2 2 4-4" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold">Dados Seguros</h3>
                        <p class="text-sm text-slate-200">Proteção para informações sensíveis.</p>
                    </div>
                </div>
            </div>

        </section>

        <!--Meio dos lados-->

        <!--Lado Direito Login-->
        <section class="bg-[#f4faf8] px-6 lg:px-10 py-10 flex items-center justify-center">
            <div class="w-full max-w-xl rounded-2xl bg-white p-10 shadow-xl shadow-black/10 transition hover:shadow-2xl hover:shadow-black/50">
                <div class="text-center mb-10">
                    <h2 class="text-3xl font-bold text-slate-950">Seja Bem-vindo</h2>
                    <p class="mt-4 text-lg text-slate-600">Entre com suas credenciais para acessar nosso sistema</p>
                </div>

                <form class="space-y-6" @submit.prevent="handleLogin">
                    <div>
                        <label for="email" class="block text-base font-medium text-slate-950 mb-2">
                            E-mail</label>

                        <input id="email" type="email" placeholder="seu@email.com" v-model="email"
                            class="w-full rounded-xl border border-slate-300 px-4 py-4 text-base text-slate-900 outline-none transition focus:border-[#24b6a1] focus:ring-4 focus:ring-[#24b6a1]/20">
                    </div>


                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <label for="password" class="text-base font-medium text-slate-950">
                                Senha
                            </label>

                            <!-- 
                            <a href="#" class="text-sm text-[#24b6a1] font-medium hover:underline">
                                Esqueceu sua senha?
                            </a>
                            -->
                            
                        </div>
                        <!--Mostrar/Ocultar Senha-->
                        <div class="relative">
                            <input id="password" :type="showPassword ? 'text' : 'password'" placeholder="********" v-model="password"
                                class="w-full rounded-xl border border-slate-300 px-4 py-4 pr-12 text-base text-black outline-none transition focus:border-[#24b6a1] focus:ring-4 focus:ring-[#24b6a1]/20">

                            <button type="button"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-[#24b6a1]"
                                aria-label="Mostrar ou ocultar senha"
                                @click="showPassword = !showPassword">
                                <svg v-if="!showPassword" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M2.1 12s3.6-7 9.9-7 9.9 7 9.9 7-3.6 7-9.9 7-9.9-7-9.9-7Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>

                                <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M3 3l18 18" />
                                    <path d="M10.6 10.6A3 3 0 0 0 13.4 13.4" />
                                    <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c6.3 0 9.9 8 9.9 8a18 18 0 0 1-2.9 4.2" />
                                    <path d="M6.1 6.1C3.5 8 2.1 12 2.1 12s3.6 8 9.9 8a9.7 9.7 0 0 0 4-.8" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <p v-if="errorMsg" class="text-sm text-red-500 text-center -mb-2">{{ errorMsg }}</p>

                    <button type="submit"
                        class="w-full rounded-xl bg-[#24b6a1] px-4 py-4 text-lg font-bold text-white shadow-[0_4px_0_#178b7d] transition hover:bg-[#1fa491] active:translate-y-1 active:shadow-[0_2px_0_#178b7d]">
                        Entrar
                    </button>
                    <p class="text-center text-sm text-slate-600">
                        Problemas para acessar?
                        <a href="#" class="text-[#24b6a1] font-medium hover:underline">
                            Entre em contato com o suporte
                        </a>
                    </p>
                </form>
                
                <p class="mt-8 text-center text-xs text-slate-500">
                    Ao acessar, você concorda com nossos
                    <a href="#" class="text-[#24b6a1] hover:underline">Termos de Uso</a>
                    e
                    <a href="#" class="text-[#24b6a1] hover:underline">Política de Privacidade</a>
                </p>
            </div>
        </section>
    </main>
</template>
