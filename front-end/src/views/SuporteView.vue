<template>
  <div class="min-h-screen">
    <AppHeader title="Suporte" subtitle="Central de ajuda e atendimento" />

    <div class="p-6">
      <div class="flex flex-col lg:flex-row gap-6 h-[calc(100vh-160px)]">

        <!-- Chat Area -->
        <div class="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col min-h-[500px]">
          <div class="p-5 border-b border-slate-200 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#24b6a1] flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <div>
              <p class="font-semibold text-slate-900">Assistente CarjimLabs</p>
              <p class="text-xs text-[#24b6a1] flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[#24b6a1] inline-block"></span>Online
              </p>
            </div>
          </div>

          <!-- Messages -->
          <div ref="messagesEl" class="flex-1 overflow-y-auto p-5 space-y-4">
            <div v-for="msg in messages" :key="msg.id" :class="['flex', msg.from === 'user' ? 'justify-end' : 'justify-start']">
              <div v-if="msg.from === 'bot'" class="flex items-end gap-2 max-w-[75%]">
                <div class="w-8 h-8 rounded-full bg-[#24b6a1] flex items-center justify-center flex-shrink-0 mb-0.5">
                  <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                </div>
                <div>
                  <div class="bg-slate-100 text-slate-800 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed">{{ msg.text }}</div>
                  <p class="text-[11px] text-slate-400 mt-1 ml-1">{{ msg.time }}</p>
                </div>
              </div>
              <div v-else class="flex items-end gap-2 max-w-[75%]">
                <div>
                  <div class="bg-[#24b6a1] text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed">{{ msg.text }}</div>
                  <p class="text-[11px] text-slate-400 mt-1 text-right mr-1">{{ msg.time }}</p>
                </div>
              </div>
            </div>

            <!-- Typing indicator -->
            <div v-if="typing" class="flex items-end gap-2">
              <div class="w-8 h-8 rounded-full bg-[#24b6a1] flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <div class="bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay:0ms"></span>
                <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay:150ms"></span>
                <span class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay:300ms"></span>
              </div>
            </div>
          </div>

          <!-- Quick actions -->
          <div class="px-5 py-3 border-t border-slate-100">
            <p class="text-xs text-slate-500 mb-2">Perguntas frequentes:</p>
            <div class="flex flex-wrap gap-2">
              <button v-for="q in quickQuestions" :key="q"
                @click="sendQuick(q)"
                class="text-xs px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-[#24b6a1] hover:text-[#24b6a1] transition">
                {{ q }}
              </button>
            </div>
          </div>

          <!-- Input -->
          <div class="p-4 border-t border-slate-200 flex gap-3">
            <input v-model="input" @keydown.enter="send"
              placeholder="Digite sua mensagem..."
              class="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#24b6a1] focus:ring-2 focus:ring-[#24b6a1]/20 transition" />
            <button @click="send"
              :disabled="!input.trim() || typing"
              class="bg-[#24b6a1] text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-[#1fa090] transition disabled:opacity-50 disabled:cursor-not-allowed">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              <span class="hidden sm:inline">Enviar</span>
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="w-full lg:w-80 flex flex-col gap-4">

          <!-- Help Center -->
          <div class="bg-white rounded-xl border border-slate-200 p-5">
            <h3 class="font-semibold text-slate-900 flex items-center gap-2 mb-4">
              <svg class="w-5 h-5 text-[#24b6a1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
              Central de Ajuda
            </h3>
            <div class="space-y-2">
              <button v-for="link in helpLinks" :key="link.label"
                @click="sendQuick(link.label)"
                class="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-slate-50 transition group">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="link.iconBg" v-html="link.icon" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-slate-900 group-hover:text-[#24b6a1] transition truncate">{{ link.label }}</p>
                  <p class="text-xs text-slate-500 truncate">{{ link.desc }}</p>
                </div>
                <svg class="w-4 h-4 text-slate-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="bg-white rounded-xl border border-slate-200 p-5">
            <h3 class="font-semibold text-slate-900 flex items-center gap-2 mb-4">
              <svg class="w-5 h-5 text-[#24b6a1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Horário de Atendimento
            </h3>
            <div class="space-y-2 text-sm">
              <div v-for="h in hours" :key="h.day" class="flex justify-between">
                <span class="text-slate-500">{{ h.day }}</span>
                <span :class="['font-medium', h.open ? 'text-slate-900' : 'text-slate-400']">{{ h.hours }}</span>
              </div>
            </div>
            <div class="mt-4 p-3 rounded-lg bg-[#24b6a1]/5 border border-[#24b6a1]/20 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#24b6a1] flex-shrink-0"></span>
              <p class="text-xs text-slate-700">Suporte via chat disponível 24/7</p>
            </div>
          </div>

          <!-- Contact -->
          <div class="bg-white rounded-xl border border-slate-200 p-5">
            <h3 class="font-semibold text-slate-900 flex items-center gap-2 mb-4">
              <svg class="w-5 h-5 text-[#24b6a1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.9a16 16 0 0 0 6.01 6.01l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Contato Direto
            </h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3 text-sm">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div><p class="text-xs text-slate-500">E-mail</p><p class="font-medium text-slate-900">suporte@carjimlabs.com</p></div>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.9a16 16 0 0 0 6.01 6.01l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div><p class="text-xs text-slate-500">Telefone</p><p class="font-medium text-slate-900">(11) 3000-0000</p></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import AppHeader from '../components/AppHeader.vue'

const input = ref('')
const typing = ref(false)
const messagesEl = ref(null)

const iconSvg = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px">${inner}</svg>`

let nextId = 10
function nowTime() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

const messages = ref([
  { id: 1, from: 'bot', text: 'Olá! Sou o assistente virtual da CarjimLabs. Como posso ajudá-lo hoje?', time: '09:00' },
  { id: 2, from: 'bot', text: 'Posso ajudar com dúvidas sobre o sistema, laudos, exames e muito mais. Use os botões abaixo ou digite sua pergunta!', time: '09:00' },
])

const quickQuestions = [
  'Como enviar um exame?',
  'Como baixar um laudo?',
  'Como cadastrar um paciente?',
  'Problemas com login',
]

const autoReplies = {
  'Como enviar um exame?':       'Para enviar um exame, acesse "Enviar Exame" no menu lateral. Preencha os dados do paciente, selecione o tipo de exame e faça o upload da imagem. O sistema analisará automaticamente com IA em segundos.',
  'Como baixar um laudo?':       'Acesse a seção "Laudos" no menu lateral, localize o exame desejado e clique no botão de ações (⋮) ao lado do laudo. Selecione "Baixar PDF" para obter o documento completo.',
  'Como cadastrar um paciente?': 'Vá até "Pacientes" no menu lateral e clique em "Cadastrar Paciente". Preencha nome completo, CPF, data de nascimento e informações de contato.',
  'Problemas com login':         'Se estiver com problemas de login, certifique-se de usar o e-mail e senha cadastrados pela sua clínica. Caso o problema persista, entre em contato pelo e-mail suporte@carjimlabs.com.',
}

const helpLinks = [
  { label: 'Como enviar um exame?',       desc: 'Guia passo a passo',        iconBg: 'bg-[#24b6a1]/10 text-[#24b6a1]', icon: iconSvg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>') },
  { label: 'Como baixar um laudo?',       desc: 'Exportar resultados em PDF', iconBg: 'bg-sky-100 text-sky-500',         icon: iconSvg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/>') },
  { label: 'Como cadastrar um paciente?', desc: 'Adicionar novos pacientes',   iconBg: 'bg-violet-100 text-violet-500',   icon: iconSvg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>') },
  { label: 'Problemas com login',         desc: 'Acesso e autenticação',      iconBg: 'bg-amber-100 text-amber-500',     icon: iconSvg('<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>') },
]

const hours = [
  { day: 'Segunda – Sexta', hours: '08h – 18h', open: true  },
  { day: 'Sábado',          hours: '08h – 12h', open: true  },
  { day: 'Domingo',         hours: 'Fechado',   open: false },
  { day: 'Feriados',        hours: 'Fechado',   open: false },
]

async function scrollToBottom() {
  await nextTick()
  if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight
}

async function send() {
  const text = input.value.trim()
  if (!text || typing.value) return
  input.value = ''
  messages.value.push({ id: nextId++, from: 'user', text, time: nowTime() })
  await scrollToBottom()

  typing.value = true
  await new Promise(r => setTimeout(r, 1500))
  typing.value = false

  const reply = autoReplies[text] ||
    'Obrigado pela sua mensagem! Nossa equipe de suporte entrará em contato em breve. Para assistência imediata, ligue para (11) 3000-0000 ou envie um e-mail para suporte@carjimlabs.com.'

  messages.value.push({ id: nextId++, from: 'bot', text: reply, time: nowTime() })
  await scrollToBottom()
}

function sendQuick(q) {
  input.value = q
  send()
}
</script>
