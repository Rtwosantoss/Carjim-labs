<template>
  <div class="min-h-screen">
    <AppHeader title="Laudos" subtitle="Consulte todos os laudos gerados pelo sistema" />

    <div class="p-6 space-y-6">
      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div v-for="s in stats" :key="s.label" class="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" :class="s.iconBg" v-html="s.icon" />
          <div><p class="text-2xl font-bold text-slate-900">{{ s.value }}</p><p class="text-sm text-slate-500">{{ s.label }}</p></div>
        </div>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-xl border border-slate-200">
        <div class="p-6 border-b border-slate-200">
          <h2 class="text-lg font-semibold text-slate-900">Lista de Laudos</h2>
          <p class="text-sm text-slate-500">Visualize e gerencie todos os laudos gerados pela análise de IA</p>
        </div>
        <div class="p-6">
          <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <div class="relative flex-1 max-w-sm">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input v-model="search" placeholder="Buscar por paciente, CPF ou exame..."
                class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#24b6a1] focus:ring-2 focus:ring-[#24b6a1]/20" />
            </div>
            <select v-model="statusFilter"
              class="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#24b6a1] sm:w-48">
              <option value="all">Todos os status</option>
              <option value="completed">Concluídos</option>
              <option value="analyzing">Analisando</option>
              <option value="pending">Pendentes</option>
              <option value="error">Com erro</option>
            </select>
          </div>

          <div class="rounded-lg border border-slate-200 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left px-4 py-3 font-medium text-slate-600">Paciente</th>
                  <th class="text-left px-4 py-3 font-medium text-slate-600">Exame</th>
                  <th class="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Biomédico</th>
                  <th class="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Data Coleta</th>
                  <th class="text-center px-4 py-3 font-medium text-slate-600">Status</th>
                  <th class="text-center px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Confiança</th>
                  <th class="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="r in filtered" :key="r.id" class="hover:bg-slate-50">
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-[#24b6a1]/10 flex items-center justify-center flex-shrink-0">
                        <span class="text-sm font-semibold text-[#24b6a1]">{{ initials(r.patientName) }}</span>
                      </div>
                      <div>
                        <p class="font-medium text-slate-900">{{ r.patientName }}</p>
                        <p class="text-xs text-slate-500 font-mono">{{ r.patientCPF }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-slate-500">{{ r.examType }}</td>
                  <td class="px-4 py-3 text-slate-500 hidden md:table-cell">{{ r.biomedic }}</td>
                  <td class="px-4 py-3 text-slate-500 hidden lg:table-cell">{{ fmtDate(r.collectionDate) }}</td>
                  <td class="px-4 py-3 text-center">
                    <span :class="['inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border', statusCfg[r.status].color]">
                      {{ statusCfg[r.status].label }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-center hidden lg:table-cell">
                    <span v-if="r.confidence > 0" class="font-medium text-[#24b6a1]">{{ r.confidence }}%</span>
                    <span v-else class="text-slate-400">-</span>
                  </td>
                  <td class="px-4 py-3">
                    <div class="relative">
                      <button @click.stop="openMenu = openMenu === r.id ? null : r.id"
                        class="p-1.5 rounded-lg hover:bg-slate-100 transition">
                        <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                      </button>
                      <div v-if="openMenu === r.id"
                        class="absolute right-0 top-8 z-10 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[140px]">
                        <button @click="openDetail(r)"
                          class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                          Ver Detalhes
                        </button>
                        <template v-if="r.status === 'completed'">
                          <button class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                            Baixar PDF
                          </button>
                          <button class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                            Imprimir
                          </button>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="filtered.length === 0" class="py-12 text-center text-slate-500">Nenhum laudo encontrado</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" @click.self="selected = null">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">Detalhes do Laudo</h3>
            <p class="text-sm text-slate-500">Informações completas do exame e resultado da análise</p>
          </div>
          <button @click="selected = null" class="p-2 rounded-lg hover:bg-slate-100 transition text-slate-500">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="space-y-4">
          <div class="bg-slate-50 rounded-xl p-4 space-y-3">
            <p class="text-sm font-medium text-slate-700 flex items-center gap-2">
              <svg class="w-4 h-4 text-[#24b6a1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Dados do Paciente
            </p>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div><span class="text-slate-500">Nome:</span><p class="font-medium text-slate-900">{{ selected.patientName }}</p></div>
              <div><span class="text-slate-500">CPF:</span><p class="font-medium text-slate-900 font-mono">{{ selected.patientCPF }}</p></div>
            </div>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 space-y-3">
            <p class="text-sm font-medium text-slate-700 flex items-center gap-2">
              <svg class="w-4 h-4 text-[#24b6a1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
              Dados do Exame
            </p>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div><span class="text-slate-500">Tipo:</span><p class="font-medium text-slate-900">{{ selected.examType }}</p></div>
              <div><span class="text-slate-500">Biomédico:</span><p class="font-medium text-slate-900">{{ selected.biomedic }}</p></div>
              <div><span class="text-slate-500">Data da Coleta:</span><p class="font-medium text-slate-900">{{ fmtDate(selected.collectionDate) }}</p></div>
              <div><span class="text-slate-500">Data da Análise:</span><p class="font-medium text-slate-900">{{ fmtDate(selected.analysisDate) }}</p></div>
            </div>
          </div>
          <div v-if="selected.status === 'completed'" class="bg-[#24b6a1]/5 border border-[#24b6a1]/20 rounded-xl p-4 space-y-3">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-slate-700 flex items-center gap-2">
                <svg class="w-4 h-4 text-[#24b6a1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                Resultado da Análise por IA
              </p>
              <span class="text-xs font-medium bg-[#24b6a1]/10 text-[#24b6a1] px-2.5 py-0.5 rounded-full">Confiança: {{ selected.confidence }}%</span>
            </div>
            <p class="text-sm text-slate-700 leading-relaxed">{{ selected.result }}</p>
          </div>
          <div v-else-if="selected.status === 'analyzing'" class="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <svg class="w-5 h-5 text-amber-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            <div><p class="font-medium text-slate-900">Análise em andamento</p><p class="text-sm text-slate-500">O sistema está processando este exame</p></div>
          </div>
          <div v-else class="bg-slate-100 rounded-xl p-4 flex items-center gap-3">
            <svg class="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div><p class="font-medium text-slate-900">Aguardando análise</p><p class="text-sm text-slate-500">Este exame está na fila para processamento</p></div>
          </div>
          <div v-if="selected.status === 'completed'" class="flex gap-3 pt-2">
            <button class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#24b6a1] text-white text-sm font-medium hover:bg-[#1fa090] transition">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Baixar PDF
            </button>
            <button class="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'

const search = ref('')
const statusFilter = ref('all')
const openMenu = ref(null)
const selected = ref(null)

const svg = (inner, cls = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px" class="${cls}">${inner}</svg>`

const reports = ref([
  { id:'1', patientName:'Maria Silva Santos',    patientCPF:'123.456.789-00', examType:'Hemograma Completo',      biomedic:'Dra. Ana Paula Ferreira',   collectionDate:'2024-01-10', analysisDate:'2024-01-10', status:'completed', result:'Valores dentro dos parâmetros normais. Hemoglobina: 14.2 g/dL, Hematócrito: 42%, Leucócitos: 7.500/mm³, Plaquetas: 250.000/mm³.', confidence:98.5 },
  { id:'2', patientName:'João Pedro Oliveira',   patientCPF:'234.567.890-11', examType:'Glicemia em Jejum',       biomedic:'Dr. Carlos Eduardo Santos', collectionDate:'2024-01-09', analysisDate:'2024-01-09', status:'completed', result:'Glicemia: 92 mg/dL - Dentro dos valores de referência (70-99 mg/dL). Sem indicação de alterações glicêmicas.', confidence:99.2 },
  { id:'3', patientName:'Ana Carolina Ferreira', patientCPF:'345.678.901-22', examType:'Colesterol Total',        biomedic:'Dra. Marina Costa',         collectionDate:'2024-01-12', analysisDate:'2024-01-12', status:'analyzing', result:'', confidence:0 },
  { id:'4', patientName:'Carlos Eduardo Lima',   patientCPF:'456.789.012-33', examType:'TSH',                     biomedic:'Dra. Ana Paula Ferreira',   collectionDate:'2024-01-08', analysisDate:'2024-01-08', status:'completed', result:'TSH: 2.1 mUI/L - Valor normal (0.4-4.0 mUI/L). Função tireoidiana dentro dos parâmetros esperados.', confidence:97.8 },
  { id:'5', patientName:'Paula Regina Costa',    patientCPF:'567.890.123-44', examType:'Vitamina D',              biomedic:'Dr. Carlos Eduardo Santos', collectionDate:'2024-01-11', analysisDate:'2024-01-11', status:'completed', result:'Vitamina D (25-OH): 28 ng/mL - Suficiência vitamínica (30-100 ng/mL). Valor próximo ao limite inferior, considerar suplementação.', confidence:96.3 },
  { id:'6', patientName:'Roberto Almeida',       patientCPF:'678.901.234-55', examType:'Creatinina',             biomedic:'Dra. Marina Costa',         collectionDate:'2024-01-07', analysisDate:'',           status:'pending',   result:'', confidence:0 },
])

const statusCfg = {
  completed: { label: 'Concluído',  color: 'bg-[#24b6a1]/10 text-[#24b6a1] border-[#24b6a1]/20' },
  analyzing: { label: 'Analisando', color: 'bg-amber-100 text-amber-600 border-amber-200'        },
  pending:   { label: 'Pendente',   color: 'bg-slate-100 text-slate-500 border-slate-200'        },
  error:     { label: 'Erro',       color: 'bg-red-100 text-red-600 border-red-200'              },
}

const stats = computed(() => [
  { label: 'Total',      value: reports.value.length,                                           iconBg: 'bg-[#24b6a1]/10 text-[#24b6a1]', icon: svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>') },
  { label: 'Concluídos', value: reports.value.filter(r => r.status==='completed').length,       iconBg: 'bg-[#24b6a1]/10 text-[#24b6a1]', icon: svg('<polyline points="20 6 9 17 4 12"/>') },
  { label: 'Analisando', value: reports.value.filter(r => r.status==='analyzing').length,       iconBg: 'bg-amber-100 text-amber-500',     icon: svg('<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>') },
  { label: 'Pendentes',  value: reports.value.filter(r => r.status==='pending').length,         iconBg: 'bg-slate-100 text-slate-500',     icon: svg('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>') },
])

const filtered = computed(() =>
  reports.value.filter(r => {
    const q = search.value.toLowerCase()
    const matchSearch = r.patientName.toLowerCase().includes(q) || r.patientCPF.includes(q) || r.examType.toLowerCase().includes(q)
    const matchStatus = statusFilter.value === 'all' || r.status === statusFilter.value
    return matchSearch && matchStatus
  })
)

function initials(name) { return name.split(' ').slice(0, 2).map(n => n[0]).join('') }
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('pt-BR') : '-' }
function openDetail(r) { selected.value = r; openMenu.value = null }
</script>
