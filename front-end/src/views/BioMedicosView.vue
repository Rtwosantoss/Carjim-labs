<template>
  <div class="min-h-screen">
    <AppHeader title="Biomédicos" subtitle="Gerencie os profissionais da sua clínica" />

    <div class="p-6 space-y-6">
      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-[#24b6a1]/10 flex items-center justify-center text-[#24b6a1]">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 8-3 3-1.5-1.5"/></svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-900">{{ biomedics.filter(b => b.status === 'active').length }}</p>
            <p class="text-sm text-slate-500">Ativos</p>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-500">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-900">{{ biomedics.length }}</p>
            <p class="text-sm text-slate-500">Total Cadastrados</p>
          </div>
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-6 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-slate-900">{{ biomedics.reduce((a, b) => a + b.examsCount, 0) }}</p>
            <p class="text-sm text-slate-500">Exames Realizados</p>
          </div>
        </div>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-xl border border-slate-200">
        <div class="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Lista de Biomédicos</h2>
            <p class="text-sm text-slate-500">Cadastre e gerencie os biomédicos responsáveis pelos exames</p>
          </div>
          <button @click="showModal = true"
            class="flex items-center gap-2 bg-[#24b6a1] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1fa090] transition">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
            Adicionar Biomédico
          </button>
        </div>
        <div class="p-6">
          <div class="relative max-w-sm mb-6">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input v-model="search" placeholder="Buscar por nome ou CRM..."
              class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#24b6a1] focus:ring-2 focus:ring-[#24b6a1]/20" />
          </div>
          <div class="rounded-lg border border-slate-200 overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-slate-50">
                <tr>
                  <th class="text-left px-4 py-3 font-medium text-slate-600">Profissional</th>
                  <th class="text-left px-4 py-3 font-medium text-slate-600">CRM</th>
                  <th class="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Especialidade</th>
                  <th class="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">Contato</th>
                  <th class="text-center px-4 py-3 font-medium text-slate-600">Exames</th>
                  <th class="text-center px-4 py-3 font-medium text-slate-600">Status</th>
                  <th class="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr v-for="b in filtered" :key="b.id" class="hover:bg-slate-50">
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-[#24b6a1]/10 flex items-center justify-center flex-shrink-0">
                        <span class="text-sm font-semibold text-[#24b6a1]">{{ initials(b.name) }}</span>
                      </div>
                      <span class="font-medium text-slate-900">{{ b.name }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-slate-500">{{ b.crm }}</td>
                  <td class="px-4 py-3 text-slate-500 hidden md:table-cell">{{ b.specialty }}</td>
                  <td class="px-4 py-3 hidden lg:table-cell text-xs text-slate-500 space-y-0.5">
                    <p>{{ b.email }}</p><p>{{ b.phone }}</p>
                  </td>
                  <td class="px-4 py-3 text-center font-medium text-slate-900">{{ b.examsCount }}</td>
                  <td class="px-4 py-3 text-center">
                    <span :class="['inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium', b.status === 'active' ? 'bg-[#24b6a1]/10 text-[#24b6a1]' : 'bg-slate-100 text-slate-500']">
                      {{ b.status === 'active' ? 'Ativo' : 'Inativo' }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <div class="relative">
                      <button @click.stop="openMenu = openMenu === b.id ? null : b.id"
                        class="p-1.5 rounded-lg hover:bg-slate-100 transition">
                        <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                      </button>
                      <div v-if="openMenu === b.id"
                        class="absolute right-0 top-8 z-10 bg-white border border-slate-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                        <button class="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          Editar
                        </button>
                        <button @click="remove(b.id)"
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
            <div v-if="filtered.length === 0" class="py-12 text-center text-slate-500">Nenhum biomédico encontrado</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40" @click.self="showModal = false">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
        <h3 class="text-lg font-semibold text-slate-900 mb-1">Novo Biomédico</h3>
        <p class="text-sm text-slate-500 mb-5">Preencha os dados do biomédico para cadastrá-lo no sistema</p>
        <div class="space-y-4">
          <div v-for="field in formFields" :key="field.key">
            <label class="block text-sm font-medium text-slate-700 mb-1">{{ field.label }}</label>
            <input v-model="form[field.key]" :type="field.type || 'text'" :placeholder="field.placeholder"
              class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none transition focus:border-[#24b6a1] focus:ring-2 focus:ring-[#24b6a1]/20" />
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showModal = false"
            class="flex-1 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">Cancelar</button>
          <button @click="add"
            class="flex-1 py-2 rounded-lg bg-[#24b6a1] text-white text-sm font-medium hover:bg-[#1fa090] transition">Cadastrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'

const search = ref('')
const showModal = ref(false)
const openMenu = ref(null)
const form = ref({ name: '', crm: '', specialty: '', email: '', phone: '' })

const formFields = [
  { key: 'name',      label: 'Nome Completo', placeholder: 'Dr. Nome Completo' },
  { key: 'crm',       label: 'CRM',           placeholder: 'CRM-SP 123456'     },
  { key: 'specialty', label: 'Especialidade', placeholder: 'Análises Clínicas' },
  { key: 'email',     label: 'E-mail',        placeholder: 'email@clinica.com', type: 'email' },
  { key: 'phone',     label: 'Telefone',      placeholder: '(11) 98765-4321'   },
]

const biomedics = ref([
  { id: '1', name: 'Dra. Ana Paula Ferreira',   crm: 'CRM-SP 123456', specialty: 'Análises Clínicas', email: 'ana.ferreira@clinica.com',  phone: '(11) 98765-4321', status: 'active',   examsCount: 234 },
  { id: '2', name: 'Dr. Carlos Eduardo Santos', crm: 'CRM-SP 234567', specialty: 'Hematologia',       email: 'carlos.santos@clinica.com', phone: '(11) 98765-4322', status: 'active',   examsCount: 189 },
  { id: '3', name: 'Dra. Marina Costa',         crm: 'CRM-SP 345678', specialty: 'Bioquímica',        email: 'marina.costa@clinica.com',  phone: '(11) 98765-4323', status: 'active',   examsCount: 156 },
  { id: '4', name: 'Dr. Roberto Lima',          crm: 'CRM-SP 456789', specialty: 'Microbiologia',     email: 'roberto.lima@clinica.com',  phone: '(11) 98765-4324', status: 'inactive', examsCount: 98  },
])

const filtered = computed(() =>
  biomedics.value.filter(b =>
    b.name.toLowerCase().includes(search.value.toLowerCase()) ||
    b.crm.toLowerCase().includes(search.value.toLowerCase())
  )
)

function initials(name) { return name.split(' ').slice(0, 2).map(n => n[0]).join('') }
function add() {
  if (!form.value.name || !form.value.crm) return
  biomedics.value.unshift({ id: String(Date.now()), ...form.value, status: 'active', examsCount: 0 })
  form.value = { name: '', crm: '', specialty: '', email: '', phone: '' }
  showModal.value = false
}
function remove(id) { biomedics.value = biomedics.value.filter(b => b.id !== id); openMenu.value = null }

function closeMenus() { openMenu.value = null }
</script>
