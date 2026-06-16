<template>
  <div class="min-h-screen">
    <AppHeader title="Pacientes" subtitle="Gerencie os pacientes cadastrados" />

    <div class="p-6 space-y-6">
      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-[#24b6a1]/10 flex items-center justify-center text-[#24b6a1]">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div><p class="text-2xl font-bold text-slate-900">{{ patients.length }}</p><p class="text-sm text-slate-500">Total de Pacientes</p></div>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-500">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
          </div>
          <div><p class="text-2xl font-bold text-slate-900">{{ patients.reduce((a, p) => a + p.examsCount, 0) }}</p><p class="text-sm text-slate-500">Total de Exames</p></div>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          </div>
          <div><p class="text-2xl font-bold text-slate-900">{{ recentlyActive }}</p><p class="text-sm text-slate-500">Ativos (30 dias)</p></div>
        </div>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-xl border border-slate-200">
        <div class="p-6 border-b border-slate-200">
          <h2 class="text-lg font-semibold text-slate-900">Lista de Pacientes</h2>
          <p class="text-sm text-slate-500">Visualize os pacientes vinculados aos exames e laudos</p>
        </div>
        <div class="p-6">
          <div class="relative max-w-sm mb-6">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input v-model="search" placeholder="Buscar por nome ou CPF..."
              class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#24b6a1] focus:ring-2 focus:ring-[#24b6a1]/20" />
          </div>
          <div class="rounded-lg border border-slate-200 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left px-4 py-3 font-medium text-slate-600">Paciente</th>
                  <th class="text-left px-4 py-3 font-medium text-slate-600">CPF</th>
                  <th class="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Idade</th>
                  <th class="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Contato</th>
                  <th class="text-center px-4 py-3 font-medium text-slate-600">Exames</th>
                  <th class="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Último Exame</th>
                  <th class="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="p in filtered" :key="p.id" class="hover:bg-slate-50">
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-[#24b6a1]/10 flex items-center justify-center flex-shrink-0">
                        <span class="text-sm font-semibold text-[#24b6a1]">{{ initials(p.name) }}</span>
                      </div>
                      <span class="font-medium text-slate-900">{{ p.name }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-slate-500 font-mono text-xs">{{ p.cpf }}</td>
                  <td class="px-4 py-3 text-slate-500 hidden md:table-cell">{{ age(p.birthDate) }} anos</td>
                  <td class="px-4 py-3 hidden lg:table-cell text-xs text-slate-500 space-y-0.5">
                    <p>{{ p.email }}</p><p>{{ p.phone }}</p>
                  </td>
                  <td class="px-4 py-3 text-center font-medium text-slate-900">{{ p.examsCount }}</td>
                  <td class="px-4 py-3 text-slate-500 hidden md:table-cell">{{ p.lastExam ? fmtDate(p.lastExam) : '-' }}</td>
                  <td class="px-4 py-3">
                    <div class="relative">
                      <button @click.stop="openMenu = openMenu === p.id ? null : p.id"
                        class="p-1.5 rounded-lg hover:bg-slate-100 transition">
                        <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                      </button>
                      <div v-if="openMenu === p.id"
                        class="absolute right-0 top-8 z-10 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[130px]">
                        <button class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                          Ver Laudos
                        </button>
                        <button class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          Editar
                        </button>
                        <button @click="remove(p.id)"
                          class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          Excluir
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="filtered.length === 0" class="py-12 text-center text-slate-500">Nenhum paciente encontrado</div>
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
const openMenu = ref(null)

const patients = ref([
  { id: '1', name: 'Maria Silva Santos',    cpf: '123.456.789-00', birthDate: '1985-03-15', email: 'maria.silva@email.com',  phone: '(11) 98765-1234', examsCount: 8,  lastExam: '2024-01-10' },
  { id: '2', name: 'João Pedro Oliveira',   cpf: '234.567.890-11', birthDate: '1990-07-22', email: 'joao.oliveira@email.com', phone: '(11) 98765-2345', examsCount: 5,  lastExam: '2024-01-08' },
  { id: '3', name: 'Ana Carolina Ferreira', cpf: '345.678.901-22', birthDate: '1978-11-30', email: 'ana.ferreira@email.com',  phone: '(11) 98765-3456', examsCount: 12, lastExam: '2024-01-12' },
  { id: '4', name: 'Carlos Eduardo Lima',   cpf: '456.789.012-33', birthDate: '1995-05-18', email: 'carlos.lima@email.com',   phone: '(11) 98765-4567', examsCount: 3,  lastExam: '2024-01-05' },
  { id: '5', name: 'Paula Regina Costa',    cpf: '567.890.123-44', birthDate: '1982-09-08', email: 'paula.costa@email.com',   phone: '(11) 98765-5678', examsCount: 15, lastExam: '2024-01-11' },
])

const recentlyActive = computed(() => {
  const limit = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  return patients.value.filter(p => p.lastExam && new Date(p.lastExam) > limit).length
})

const filtered = computed(() =>
  patients.value.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase()) ||
    p.cpf.includes(search.value)
  )
)

function initials(name) { return name.split(' ').slice(0, 2).map(n => n[0]).join('') }
function age(d) {
  const today = new Date(), b = new Date(d)
  let a = today.getFullYear() - b.getFullYear()
  if (today.getMonth() < b.getMonth() || (today.getMonth() === b.getMonth() && today.getDate() < b.getDate())) a--
  return a
}
function fmtDate(d) { return new Date(d).toLocaleDateString('pt-BR') }
function remove(id) { patients.value = patients.value.filter(p => p.id !== id); openMenu.value = null }
</script>

<style scoped>
@reference "../tailwind.css";
</style>
