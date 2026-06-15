<template>
  <div class="flex min-h-screen flex-col bg-[#f4faf8]">

    <!-- cabeçalho -->
    <header class="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-6 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
        <div class="flex items-center gap-3 justify-self-start">
          <div class="w-12 h-12 rounded-xl bg-[#24b6a1] text-white flex items-center justify-center">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
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

          <span class="text-lg font-bold text-slate-800">
            CarjimLabs
          </span>
        </div>

        <nav class="hidden md:flex gap-8 text-sm text-slate-600 font-bold justify-self-center">
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#como-funciona">Como Funciona</a>
        </nav>
      </div>

    </header>

    <!-- main -->
    <section class="py-24">
      <div class="max-w-5xl mx-auto text-center px-6">

        <span class="inline-flex px-4 py-2 rounded-full border border-[#24b6a1]/30 text-[#24b6a1] text-sm">
          Plataforma em desenvolvimento
        </span>

        <h1 class="mt-8 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
          Análise de Exames com
          <span class="text-[#24b6a1]">
            Inteligência Artificial
          </span>
        </h1>

        <p class="max-w-2xl mx-auto mt-6 text-slate-600">
          A CarjimLabs é um projeto de apoio à análise de exames para clínicas,
          com acesso controlado pela equipe e funcionalidades em construção.
        </p>

        <div class="mt-8 flex justify-center gap-4">
          <a href="#como-funciona"
            class="border border-slate-300 px-6 py-3 rounded-lg transition hover:border-[#24b6a1] hover:text-[#24b6a1]">
            Como Funciona
          </a>
        </div>
      </div>
    </section>

    <!-- funcionalidades -->
    <section id="funcionalidades" class="py-24 bg-white">
      <div class="max-w-6xl mx-auto px-6">

        <div class="text-center">
          <p class="text-[#24b6a1] uppercase text-sm">
            Funcionalidades
          </p>

          <h2 class="text-4xl font-bold mt-3">
            Tudo que sua clínica precisa
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mt-14">
          <FuncionalidadeCard title="Upload de Imagens"
            description="Envie imagens de exames de forma simples e segura." />

          <FuncionalidadeCard title="Apoio de IA"
            description="Funcionalidade planejada para auxiliar a análise de exames." />

          <FuncionalidadeCard title="Histórico de Exames"
            description="Organização de exames e dados dos pacientes em um painel." />

          <FuncionalidadeCard title="Acesso por Clínica" description="Credenciais fornecidas pela equipe CarjimLabs." />

        </div>

      </div>
    </section>

    <!-- como funciona -->
    <section id="como-funciona" class="py-24">
      <div class="max-w-6xl mx-auto px-6">

        <div class="text-center">
          <p class="text-[#24b6a1] text-sm uppercase">
            Processo
          </p>

          <h2 class="text-4xl font-bold mt-3">
            Como Funciona
          </h2>
        </div>

        <div class="grid md:grid-cols-4 gap-8 mt-16">
          <EtapaCard number="01" title="Contratação"
            description="A clínica contrata a CarjimLabs e solicita o acesso ao sistema." />

          <EtapaCard number="02" title="Geração de Acesso"
            description="A equipe CarjimLabs cadastra a clínica e fornece as credenciais." />

          <EtapaCard number="03" title="Login da Clínica"
            description="O cliente acessa a plataforma usando o login recebido." />

          <EtapaCard number="04" title="Uso da Plataforma"
            description="As funcionalidades de envio, análise e histórico serão evoluídas no sistema." />
        </div>

      </div>
    </section>

    <!-- rodapé -->
    <footer class="mt-auto bg-slate-950 text-white py-12">
      <div class="max-w-6xl mx-auto px-6">
        <h3 class="font-bold text-xl">
          CarjimLabs
        </h3>

        <p class="text-slate-400 mt-3">
          Plataforma de análise automatizada de exames.
        </p>
      </div>
    </footer>

  </div>
</template>


<script setup>
import FuncionalidadeCard from '../components/FuncionalidadeCard.vue'
import EtapaCard from '../components/EtapaCard.vue'
</script>
