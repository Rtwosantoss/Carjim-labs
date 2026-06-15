<template>
    <main class="relative min-h-screen overflow-hidden bg-[#f4faf8] px-6 py-10 text-slate-950">
        <!--Decoração do fundo-->
        <div class="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full border border-[#24b6a1]/50">
        </div>

        <div class="pointer-events-none absolute -left-10 top-20 h-40 w-40 rounded-full bg-[#24b6a1]/40">
        </div>
        
        <div class="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full border border-[#24b6a1]/55">
        </div>
        
        <div class="pointer-events-none absolute bottom-16 right-24 h-24 w-24 rounded-full bg-[#24b6a1]/25">
        </div>

        <section class="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-4xl items-center justify-center">
            <div class="w-full rounded-3xl bg-white p-8 shadow-2xl shadow-black/55 sm:p-10 lg:p-12">
                <div class="mb-10">
                    <!--<div class="mb-8 flex items-center gap-3">
                        <span class="h-2 w-2 rounded-full bg-[#24b6a1]"></span>
                        <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                            CarjimLabs · Painel interno
                        </p>
                    </div>-->

                    <h1 class="text-3xl font-bold text-slate-950">Tela de Cadastro</h1>
                    <p class="mt-4 text-base text-slate-600">
                        Preencha os dados para criar o acesso inicial do cliente.
                    </p>
                </div>

                <form class="space-y-10">
                    <!--Dados da clínica-->
                    <fieldset>
                        <legend class="mb-4 text-base font-bold text-slate-950">Dados da clínica</legend>

                        <div class="grid gap-5 md:grid-cols-2">
                            <div>
                                <label for="clinicName" class="mb-2 block text-sm font-medium text-slate-950">
                                    Nome da clínica
                                </label>
                                <input id="clinicName" type="text" placeholder="Ex: Clínica Carjim"
                                    class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#24b6a1] focus:ring-4 focus:ring-[#24b6a1]/20">
                            </div>

                            <div>
                                <label for="clinicCnpj" class="mb-2 block text-sm font-medium text-slate-950">
                                    CNPJ
                                </label>
                                <input id="clinicCnpj" type="text" placeholder="00.000.000/0000-00"
                                    class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#24b6a1] focus:ring-4 focus:ring-[#24b6a1]/20">
                            </div>

                            <div>
                                <label for="clinicPhone" class="mb-2 block text-sm font-medium text-slate-950">
                                    Telefone
                                </label>
                                <input id="clinicPhone" type="tel" placeholder="(__) _____-____"
                                    class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#24b6a1] focus:ring-4 focus:ring-[#24b6a1]/20">
                            </div>

                            <div>
                                <label for="clinicEmail" class="mb-2 block text-sm font-medium text-slate-950">
                                    E-mail institucional
                                </label>
                                <input id="clinicEmail" type="email" placeholder="contato@clinica.com"
                                    class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#24b6a1] focus:ring-4 focus:ring-[#24b6a1]/20">
                            </div>
                        </div>
                    </fieldset>

                    <div class="h-px bg-slate-200"></div>

                    <!--Responsável pelo acesso-->
                    <fieldset>
                        <legend class="mb-4 text-base font-bold text-slate-950">Responsável pelo acesso</legend>

                        <div class="grid gap-5 md:grid-cols-2">
                            <div>
                                <label for="responsibleName" class="mb-2 block text-sm font-medium text-slate-950">
                                    Nome do responsável
                                </label>
                                <input id="responsibleName" type="text" placeholder="Ex: Maria"
                                    class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#24b6a1] focus:ring-4 focus:ring-[#24b6a1]/20">
                            </div>

                            <div>
                                <label for="accessEmail" class="mb-2 block text-sm font-medium text-slate-950">
                                    E-mail de acesso
                                </label>
                                <input id="accessEmail" type="email" placeholder="Ex: @gmail.com"
                                    class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#24b6a1] focus:ring-4 focus:ring-[#24b6a1]/20">
                            </div>

                            <div>
                                <label for="temporaryPassword" class="mb-2 block text-sm font-medium text-slate-950">
                                    Senha temporária
                                </label>
                                <input id="temporaryPassword" type="password" placeholder="********"
                                    class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#24b6a1] focus:ring-4 focus:ring-[#24b6a1]/20">
                            </div>

                            <div>
                                <label for="confirmTemporaryPassword"
                                    class="mb-2 block text-sm font-medium text-slate-950">
                                    Confirmar senha temporária
                                </label>
                                <input id="confirmTemporaryPassword" type="password" placeholder="********"
                                    class="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#24b6a1] focus:ring-4 focus:ring-[#24b6a1]/20">
                            </div>
                        </div>
                    </fieldset>

                    <div>
                        <button type="submit"
                            class="w-full rounded-xl bg-[#24b6a1] px-4 py-4 text-base font-bold text-white shadow-[0_4px_0_#178b7d] transition hover:bg-[#1fa491] active:translate-y-1 active:shadow-[0_2px_0_#178b7d]">
                            Cadastrar clínica
                        </button>

                        <p class="mt-5 text-center text-sm text-slate-500">
                            Após o cadastro, envie as credenciais ao responsável da clínica.
                        </p>
                    </div>
                </form>
            </div>
        </section>
    </main>
</template>
