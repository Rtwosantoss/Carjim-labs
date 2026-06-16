<template>
  <div class="min-h-screen">
    <AppHeader title="Dashboard" subtitle="Visão geral do sistema" />

    <div class="p-6 space-y-6">
      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="stat in stats" :key="stat.title" class="bg-white rounded-xl border border-slate-200 p-6">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="stat.iconBg"
              v-html="stat.icon" />
            <span class="text-sm font-medium text-[#24b6a1] flex items-center gap-1">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m23 6-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
              {{ stat.change }}
            </span>
          </div>
          <div class="mt-4">
            <p class="text-3xl font-bold text-slate-900">{{ stat.value }}</p>
            <p class="text-sm text-slate-500 mt-1">{{ stat.title }}</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl border border-slate-200 p-6">
        <h2 class="text-lg font-semibold text-slate-900">Ações Rápidas</h2>
        <p class="text-sm text-slate-500 mt-1 mb-4">Acesse as principais funcionalidades do sistema</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <RouterLink v-for="action in quickActions" :key="action.to" :to="action.to"
            class="flex flex-col items-center gap-2 py-6 rounded-xl border border-slate-200 hover:border-[#24b6a1] hover:bg-[#24b6a1]/5 transition-all text-[#24b6a1]">
            <span v-html="action.icon" />
            <span class="text-sm font-medium text-slate-700">{{ action.label }}</span>
          </RouterLink>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Exams -->
        <div class="bg-white rounded-xl border border-slate-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-lg font-semibold text-slate-900">Exames Recentes</h2>
              <p class="text-sm text-slate-500">Últimos exames enviados ao sistema</p>
            </div>
            <RouterLink to="/dashboard/laudos" class="text-sm text-[#24b6a1] hover:underline flex items-center gap-1">
              Ver todos
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </RouterLink>
          </div>
          <div class="space-y-3">
            <div v-for="exam in recentExams" :key="exam.id"
              class="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#24b6a1]/10 flex items-center justify-center">
                  <span class="text-sm font-semibold text-[#24b6a1]">{{ initials(exam.patient) }}</span>
                </div>
                <div>
                  <p class="font-medium text-slate-900 text-sm">{{ exam.patient }}</p>
                  <p class="text-xs text-slate-500">{{ exam.exam }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs text-slate-400">{{ exam.time }}</span>
                <span :class="['flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium', statusConfig[exam.status].color]">
                  {{ statusConfig[exam.status].label }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Stats -->
        <div class="bg-white rounded-xl border border-slate-200 p-6">
          <h2 class="text-lg font-semibold text-slate-900">Análise por IA</h2>
          <p class="text-sm text-slate-500 mt-1 mb-6">Performance do sistema de análise</p>
          <div class="space-y-6">
            <div v-for="metric in aiMetrics" :key="metric.label" class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-slate-500">{{ metric.label }}</span>
                <span class="font-medium text-slate-900">{{ metric.value }}</span>
              </div>
              <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all" :class="metric.barColor" :style="{ width: metric.percent }" />
              </div>
            </div>
            <div class="pt-4 border-t border-slate-200">
              <div class="flex items-center gap-3 p-4 rounded-lg bg-[#24b6a1]/5 border border-[#24b6a1]/20">
                <svg class="w-8 h-8 text-[#24b6a1] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                <div>
                  <p class="font-medium text-slate-900">Sistema Operacional</p>
                  <p class="text-sm text-slate-500">Todos os serviços de IA funcionando normalmente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'

const svg = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px">${inner}</svg>`

const stats = [
  { title: 'Exames Hoje', value: '24', change: '+12%', iconBg: 'bg-[#24b6a1]/10 text-[#24b6a1]',
    icon: svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="12" r="2"/>') },
  { title: 'Pacientes Ativos', value: '1.284', change: '+8%', iconBg: 'bg-sky-100 text-sky-500',
    icon: svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>') },
  { title: 'Laudos Gerados', value: '156', change: '+23%', iconBg: 'bg-violet-100 text-violet-500',
    icon: svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>') },
  { title: 'Taxa de Sucesso', value: '98.5%', change: '+2%', iconBg: 'bg-amber-100 text-amber-500',
    icon: svg('<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>') },
]

const quickActions = [
  { label: 'Enviar Exame',       to: '/dashboard/enviar-exame', icon: svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="12" r="2"/>') },
  { label: 'Cadastrar Paciente', to: '/dashboard/pacientes',    icon: svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>') },
  { label: 'Cadastrar Biomédico',to: '/dashboard/biomedicos',   icon: svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>') },
  { label: 'Ver Laudos',         to: '/dashboard/laudos',       icon: svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>') },
]

const recentExams = [
  { id: 1, patient: 'Maria Silva',   exam: 'Hemograma Completo', status: 'completed', time: '10 min' },
  { id: 2, patient: 'João Santos',   exam: 'Glicemia',           status: 'analyzing', time: '25 min' },
  { id: 3, patient: 'Ana Oliveira',  exam: 'Colesterol Total',   status: 'completed', time: '45 min' },
  { id: 4, patient: 'Carlos Mendes', exam: 'TSH',                status: 'pending',   time: '1h'     },
  { id: 5, patient: 'Paula Costa',   exam: 'Ureia',              status: 'completed', time: '2h'     },
]

const statusConfig = {
  completed: { label: 'Concluído',  color: 'bg-[#24b6a1]/10 text-[#24b6a1]' },
  analyzing: { label: 'Analisando', color: 'bg-amber-100 text-amber-600'    },
  pending:   { label: 'Pendente',   color: 'bg-slate-100 text-slate-500'    },
  error:     { label: 'Erro',       color: 'bg-red-100 text-red-600'        },
}

const aiMetrics = [
  { label: 'Precisão da IA',             value: '98.5%', percent: '98.5%', barColor: 'bg-[#24b6a1]' },
  { label: 'Tempo Médio de Análise',     value: '2.3s',  percent: '23%',   barColor: 'bg-sky-400'   },
  { label: 'Exames Processados Hoje',    value: '24/30', percent: '80%',   barColor: 'bg-amber-400' },
]

function initials(name) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('')
}
</script>
