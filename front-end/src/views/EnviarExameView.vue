<template>
  <div class="min-h-screen">
    <AppHeader title="Enviar Exame" subtitle="Envie imagens de exames para análise por IA" />

    <div class="p-6 max-w-4xl mx-auto">
      <!-- Steps -->
      <div class="mb-8">
        <div class="flex items-center justify-center">
          <template v-for="(s, i) in 3" :key="s">
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all text-sm',
              step >= s ? 'bg-[#24b6a1] text-white' : 'bg-slate-100 text-slate-500']">
              <svg v-if="step > s" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span v-else>{{ s }}</span>
            </div>
            <div v-if="i < 2" :class="['w-20 h-1 mx-2 rounded-full transition-all', step > s ? 'bg-[#24b6a1]' : 'bg-slate-100']" />
          </template>
        </div>
        <div class="flex justify-center mt-3 gap-16 text-sm">
          <span :class="step >= 1 ? 'text-slate-900 font-medium' : 'text-slate-400'">Paciente</span>
          <span :class="step >= 2 ? 'text-slate-900 font-medium' : 'text-slate-400'">Exame</span>
          <span :class="step >= 3 ? 'text-slate-900 font-medium' : 'text-slate-400'">Análise</span>
        </div>
      </div>

      <!-- Step 1 -->
      <div v-if="step === 1" class="bg-white rounded-xl border border-slate-200 p-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-[#24b6a1]/10 flex items-center justify-center text-[#24b6a1]">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Dados do Paciente</h2>
            <p class="text-sm text-slate-500">Informe os dados do paciente para vincular ao laudo</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="md:col-span-2">
            <label class="label">Nome Completo *</label>
            <input v-model="form.patientName" placeholder="Nome completo do paciente" class="inp h-12" />
          </div>
          <div>
            <label class="label">CPF *</label>
            <input v-model="form.patientCPF" placeholder="000.000.000-00" maxlength="14" class="inp h-12" />
          </div>
          <div>
            <label class="label">Data de Nascimento *</label>
            <input v-model="form.patientBirthDate" type="date" class="inp h-12" />
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button @click="step = 2" :disabled="!step1Valid"
            class="px-8 py-2 rounded-lg bg-[#24b6a1] text-white text-sm font-medium hover:bg-[#1fa090] transition disabled:opacity-40 disabled:cursor-not-allowed">
            Próximo
          </button>
        </div>
      </div>

      <!-- Step 2 -->
      <div v-if="step === 2" class="bg-white rounded-xl border border-slate-200 p-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-[#24b6a1]/10 flex items-center justify-center text-[#24b6a1]">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Dados do Exame</h2>
            <p class="text-sm text-slate-500">Selecione o biomédico, tipo de exame e faça upload da imagem</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="label">Biomédico Responsável *</label>
            <select v-model="form.biomedic" class="inp h-12">
              <option value="">Selecione o biomédico</option>
              <option v-for="b in biomedics" :key="b.id" :value="b.id">{{ b.name }} ({{ b.crm }})</option>
            </select>
          </div>
          <div>
            <label class="label">Tipo de Exame *</label>
            <select v-model="form.examType" class="inp h-12">
              <option value="">Selecione o exame</option>
              <option v-for="e in examTypes" :key="e" :value="e">{{ e }}</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="label">Data da Coleta *</label>
            <input v-model="form.collectionDate" type="date" class="inp h-12" />
          </div>
        </div>

        <!-- Upload -->
        <div class="mt-5">
          <label class="label">Imagem do Exame *</label>
          <div
            @dragenter.prevent="drag = true" @dragleave.prevent="drag = false"
            @dragover.prevent @drop.prevent="onDrop"
            :class="['relative border-2 border-dashed rounded-xl p-8 transition-all text-center',
              drag ? 'border-[#24b6a1] bg-[#24b6a1]/5' : 'border-slate-200 hover:border-[#24b6a1]/50',
              image ? 'bg-slate-50' : '']">
            <div v-if="image" class="relative inline-block">
              <img :src="image" alt="Prévia" class="max-h-64 rounded-lg shadow-md mx-auto" />
              <button @click="image = null"
                class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div v-else>
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#24b6a1]/10 flex items-center justify-center text-[#24b6a1]">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
              </div>
              <p class="font-medium text-slate-700 mb-1">Arraste e solte a imagem aqui</p>
              <p class="text-sm text-slate-500 mb-4">ou clique para selecionar</p>
              <label class="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Selecionar Imagem
                <input type="file" accept="image/*" class="hidden" @change="onFileInput" />
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-6">
          <button @click="step = 1" class="px-6 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">Voltar</button>
          <button @click="submit" :disabled="!step2Valid || submitting"
            class="flex items-center gap-2 px-8 py-2 rounded-lg bg-[#24b6a1] text-white text-sm font-medium hover:bg-[#1fa090] transition disabled:opacity-40 disabled:cursor-not-allowed">
            <svg v-if="submitting" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            {{ submitting ? 'Enviando...' : 'Enviar para Análise' }}
          </button>
        </div>
      </div>

      <!-- Step 3 -->
      <div v-if="step === 3" class="bg-white rounded-xl border border-slate-200 p-6">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-[#24b6a1]/10 flex items-center justify-center text-[#24b6a1]">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-slate-900">Análise por IA</h2>
            <p class="text-sm text-slate-500">O sistema está processando o exame</p>
          </div>
        </div>

        <!-- Analyzing -->
        <div v-if="analyzing" class="text-center py-12">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-[#24b6a1]/10 flex items-center justify-center animate-pulse text-[#24b6a1]">
            <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-900 mb-2">Analisando exame...</h3>
          <p class="text-slate-500 mb-6">Nossa IA está processando a imagem do exame</p>
          <div class="max-w-xs mx-auto h-2 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full bg-[#24b6a1] rounded-full animate-progress" />
          </div>
        </div>

        <!-- Done -->
        <div v-if="done" class="space-y-6">
          <div class="text-center py-6">
            <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-[#24b6a1]/10 flex items-center justify-center text-[#24b6a1]">
              <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 class="text-xl font-semibold text-slate-900 mb-2">Análise Concluída!</h3>
            <p class="text-slate-500">O laudo foi gerado e está disponível para consulta</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-6 space-y-4">
            <h4 class="font-semibold text-slate-900">Resumo do Laudo</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div><span class="text-slate-500">Paciente:</span><p class="font-medium text-slate-900">{{ form.patientName }}</p></div>
              <div><span class="text-slate-500">CPF:</span><p class="font-medium text-slate-900">{{ form.patientCPF }}</p></div>
              <div><span class="text-slate-500">Exame:</span><p class="font-medium text-slate-900">{{ form.examType }}</p></div>
              <div><span class="text-slate-500">Data da Coleta:</span><p class="font-medium text-slate-900">{{ fmtDate(form.collectionDate) }}</p></div>
            </div>
            <div class="pt-4 border-t border-slate-200 flex items-start gap-2 text-sm">
              <svg class="w-5 h-5 text-[#24b6a1] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              <div>
                <p class="font-medium text-slate-900">Resultado da Análise</p>
                <p class="text-slate-500 mt-1">Valores dentro dos parâmetros de referência. Sem alterações significativas identificadas pela análise automatizada. Recomenda-se validação pelo biomédico responsável.</p>
              </div>
            </div>
          </div>
          <div class="flex justify-center gap-4">
            <button @click="reset"
              class="px-6 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">Novo Exame</button>
            <RouterLink to="/dashboard/laudos"
              class="px-6 py-2 rounded-lg bg-[#24b6a1] text-white text-sm font-medium hover:bg-[#1fa090] transition">Ver Laudo Completo</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'

const step = ref(1)
const submitting = ref(false)
const analyzing = ref(false)
const done = ref(false)
const drag = ref(false)
const image = ref(null)

const form = ref({ patientName: '', patientCPF: '', patientBirthDate: '', biomedic: '', examType: '', collectionDate: '' })

const step1Valid = computed(() => form.value.patientName && form.value.patientCPF && form.value.patientBirthDate)
const step2Valid = computed(() => form.value.biomedic && form.value.examType && form.value.collectionDate && image.value)

const biomedics = [
  { id: '1', name: 'Dra. Ana Paula Ferreira',   crm: 'CRM-SP 123456' },
  { id: '2', name: 'Dr. Carlos Eduardo Santos', crm: 'CRM-SP 234567' },
  { id: '3', name: 'Dra. Marina Costa',         crm: 'CRM-SP 345678' },
]

const examTypes = ['Hemograma Completo','Glicemia em Jejum','Colesterol Total e Frações','TSH','T4 Livre','Ureia','Creatinina','TGO (AST)','TGP (ALT)','Ácido Úrico','Triglicerídeos','Vitamina D','Vitamina B12','Ferro Sérico','Ferritina']

function onDrop(e) {
  drag.value = false
  const file = e.dataTransfer.files[0]
  if (file?.type.startsWith('image/')) loadFile(file)
}
function onFileInput(e) {
  const file = e.target.files[0]
  if (file) loadFile(file)
}
function loadFile(file) {
  const reader = new FileReader()
  reader.onload = (e) => { image.value = e.target.result }
  reader.readAsDataURL(file)
}
async function submit() {
  submitting.value = true
  await delay(1000)
  submitting.value = false
  step.value = 3
  analyzing.value = true
  await delay(3000)
  analyzing.value = false
  done.value = true
}
function reset() {
  step.value = 1
  done.value = false
  analyzing.value = false
  image.value = null
  form.value = { patientName: '', patientCPF: '', patientBirthDate: '', biomedic: '', examType: '', collectionDate: '' }
}
function fmtDate(d) { return d ? new Date(d).toLocaleDateString('pt-BR') : '' }
function delay(ms) { return new Promise(r => setTimeout(r, ms)) }
</script>

<style scoped>
@reference "../tailwind.css";
.label { @apply block text-sm font-medium text-slate-700 mb-1; }
.inp { @apply w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none transition focus:border-[#24b6a1] focus:ring-2 focus:ring-[#24b6a1]/20; }
@keyframes progress { from { width: 0% } to { width: 100% } }
.animate-progress { animation: progress 3s ease-in-out forwards; }
</style>
