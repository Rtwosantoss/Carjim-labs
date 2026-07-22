<template>
  <div class="bg-slate-50 min-h-screen">

    <!-- cabeçalho -->
    <header
      class="sticky top-0 z-50 bg-white border-b border-slate-200"
    >
      <div
        class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold"
          >
            +
          </div>

          <span class="font-semibold text-slate-800">
            Carjim Labs
          </span>
        </div>

        <nav class="hidden md:flex gap-8 text-sm text-slate-600">
          <a href="#funcionalidades">Funcionalidades</a>
          <a href="#como-funciona">Como Funciona</a>
          <a href="#beneficios">Benefícios</a>
          <a href="#contato">Contato</a>
        </nav>

        <div class="flex gap-3">
          <button class="text-sm">
            Entrar
          </button>

          <button
            class="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Solicitar Demonstração
          </button>
        </div>
      </div>
    </header>

    <!-- main -->
    <section class="py-24">
      <div class="max-w-5xl mx-auto text-center px-6">

        <span
          class="inline-flex px-4 py-2 rounded-full border border-emerald-200 text-emerald-600 text-sm"
        >
          Tecnologia de Ponta em IA Médica
        </span>

        <h1
          class="mt-8 text-5xl font-bold leading-tight text-slate-900"
        >
          Análise de Exames com
          <span class="text-emerald-600">
            Inteligência Artificial
          </span>
        </h1>

        <p
          class="max-w-2xl mx-auto mt-6 text-slate-600"
        >
          Transforme a análise de imagens médicas da sua clínica
          com nossa plataforma de IA.
          Laudos precisos, rápidos e confiáveis.
        </p>

        <div
          class="mt-8 flex justify-center gap-4"
        >
          <button
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg"
          >
            Solicitar Demonstração
          </button>

          <button
            class="border border-slate-300 px-6 py-3 rounded-lg"
          >
            Como Funciona
          </button>
        </div>

        <!-- dashboard-->
        <div
          class="mt-20 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div
            class="h-10 border-b bg-slate-50 flex items-center px-4 gap-2"
          >
            <div class="w-3 h-3 rounded-full bg-red-400"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div class="w-3 h-3 rounded-full bg-green-400"></div>
          </div>

          <div class="grid md:grid-cols-3 gap-6 p-8">

            <div
              class="border rounded-xl p-6 text-left"
            >
              <h3 class="text-3xl font-bold">
                1.247
              </h3>
              <p class="text-slate-500">
                Laudos Gerados
              </p>
            </div>

            <div
              class="border rounded-xl p-6 text-left"
            >
              <h3 class="text-3xl font-bold">
                856
              </h3>
              <p class="text-slate-500">
                Pacientes
              </p>
            </div>

            <div
              class="border rounded-xl p-6 text-left"
            >
              <h3 class="text-3xl font-bold">
                99.2%
              </h3>
              <p class="text-slate-500">
                Precisão
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- funcionalidades -->
    <section
      id="funcionalidades"
      class="py-24 bg-white"
    >
      <div class="max-w-6xl mx-auto px-6">

        <div class="text-center">
          <p class="text-emerald-600 uppercase text-sm">
            Funcionalidades
          </p>

          <h2 class="text-4xl font-bold mt-3">
            Tudo que sua clínica precisa
          </h2>
        </div>

        <div
          class="grid md:grid-cols-3 gap-6 mt-14"
        >

          <FeatureCard
            title="Upload de Imagens"
            description="Envie imagens de exames de forma simples e segura."
          />

          <FeatureCard
            title="Análise por IA"
            description="Laudos automáticos em segundos."
          />

          <FeatureCard
            title="Gestão de Pacientes"
            description="Histórico completo de exames."
          />

          <FeatureCard
            title="Biomédicos Vinculados"
            description="Rastreabilidade dos laudos."
          />

          <FeatureCard
            title="Resultados Rápidos"
            description="Reduza o tempo de espera."
          />

          <FeatureCard
            title="Suporte Dedicado"
            description="Equipe especializada."
          />

        </div>

      </div>
    </section>

    <!-- como funciona -->
    <section
      id="como-funciona"
      class="py-24"
    >
      <div class="max-w-6xl mx-auto px-6">

        <div class="text-center">
          <p class="text-emerald-600 text-sm uppercase">
            Processo
          </p>

          <h2 class="text-4xl font-bold mt-3">
            Como Funciona
          </h2>
        </div>

        <div
          class="grid md:grid-cols-4 gap-8 mt-16"
        >
          <StepCard number="01" title="Envie a Imagem" />
          <StepCard number="02" title="Processamento IA" />
          <StepCard number="03" title="Laudo Gerado" />
          <StepCard number="04" title="Consulta e Histórico" />
        </div>

      </div>
    </section>

    <!-- benefícios -->
    <section
      id="beneficios"
      class="py-24 bg-white"
    >
      <div
        class="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16"
      >
        <div>
          <h2 class="text-5xl font-bold">
            Por que escolher o Cajim Labs?
          </h2>

          <div class="mt-10 space-y-6">
            <BenefitItem title="Agilidade" />
            <BenefitItem title="Precisão" />
            <BenefitItem title="Produtividade" />
            <BenefitItem title="Segurança" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <StatCard value="95%" text="mais rápido" />
          <StatCard value="99.2%" text="precisão" />
          <StatCard value="3x" text="mais exames" />
          <StatCard value="100%" text="seguro" />
        </div>
      </div>
    </section>

    <!-- cta -->
    <section
      id="contato"
      class="py-24"
    >
      <div
        class="max-w-3xl mx-auto bg-white border rounded-3xl p-12 text-center"
      >
        <h2 class="text-5xl font-bold">
          Pronto para transformar sua clínica?
        </h2>

        <p class="mt-6 text-slate-600">
          Solicite uma demonstração gratuita.
        </p>

        <div
          class="flex flex-col md:flex-row gap-4 mt-8 justify-center"
        >
          <input
            type="email"
            placeholder="Seu e-mail corporativo"
            class="border rounded-lg px-4 py-3 md:w-80"
          />

          <button
            class="bg-emerald-600 text-white px-6 rounded-lg"
          >
            Solicitar Demo
          </button>
        </div>
      </div>
    </section>

    <!-- rodapé -->
    <footer class="bg-slate-950 text-white py-12">
      <div
        class="max-w-6xl mx-auto px-6"
      >
        <h3 class="font-bold text-xl">
          Carjim Lab
        </h3>

        <p class="text-slate-400 mt-3">
          Plataforma de análise automatizada de exames.
        </p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import FeatureCard from '@/components/FeatureCard.vue'
import StepCard from '@/components/StepCard.vue'
import BenefitItem from '@/components/BenefitItem.vue'
import StatCard from '@/components/StatCard.vue'
</script>