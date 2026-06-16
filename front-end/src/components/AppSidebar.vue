<template>
  <aside :class="[
    'bg-[#01110f] text-white flex flex-col h-screen transition-all duration-300 border-r border-white/10 relative',
    collapsed ? 'w-20' : 'w-64'
  ]">
    <!-- Logo -->
    <div class="p-6 flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-[#24b6a1] flex items-center justify-center flex-shrink-0">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M9 13a4.5 4.5 0 0 0 3-4" />
          <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
          <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
          <path d="M6 18a4 4 0 0 1-1.967-.516" />
          <path d="M12 13h4" /><path d="M12 18h6a2 2 0 0 1 2 2v1" />
          <path d="M12 8h8" /><path d="M16 8V5a2 2 0 0 1 2-2" />
          <circle cx="16" cy="13" r=".5" /><circle cx="18" cy="3" r=".5" />
          <circle cx="20" cy="21" r=".5" /><circle cx="20" cy="8" r=".5" />
        </svg>
      </div>
      <div v-if="!collapsed">
        <h1 class="text-lg font-bold leading-none">CarjimLabs</h1>
        <p class="text-xs text-white/50">Análise Inteligente</p>
      </div>
    </div>

    <!-- Collapse Button -->
    <button
      @click="collapsed = !collapsed"
      class="absolute top-6 -right-3 w-6 h-6 bg-[#01110f] border border-white/20 rounded-full flex items-center justify-center hover:bg-[#24b6a1] transition-colors z-10"
    >
      <svg v-if="collapsed" class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
      <svg v-else class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
    </button>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 space-y-1">
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group',
          $route.path === item.to
            ? 'bg-[#24b6a1] text-white'
            : 'text-white/60 hover:bg-white/10 hover:text-white'
        ]"
      >
        <span class="w-5 h-5 flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5" v-html="item.icon" />
        <span v-if="!collapsed" class="font-medium text-sm">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Bottom Actions -->
    <div class="p-3 space-y-1 border-t border-white/10">
      <RouterLink
        to="/dashboard/configuracoes"
        :class="[
          'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
          $route.path === '/dashboard/configuracoes'
            ? 'bg-[#24b6a1] text-white'
            : 'text-white/60 hover:bg-white/10 hover:text-white'
        ]"
      >
        <span v-html="icons.settings" class="flex-shrink-0" />
        <span v-if="!collapsed" class="font-medium text-sm">Configurações</span>
      </RouterLink>

      <RouterLink
        v-if="auth.isAdmin"
        to="/dashboard/cadastrar-clinica"
        :class="[
          'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
          $route.path === '/dashboard/cadastrar-clinica'
            ? 'bg-[#24b6a1] text-white'
            : 'text-white/60 hover:bg-white/10 hover:text-white'
        ]"
      >
        <span v-html="icons.clinic" class="flex-shrink-0" />
        <span v-if="!collapsed" class="font-medium text-sm">Cadastrar Clínica</span>
      </RouterLink>

      <button
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
      >
        <span v-html="icons.logout" class="flex-shrink-0" />
        <span v-if="!collapsed" class="font-medium text-sm">Sair</span>
      </button>
    </div>

    <!-- User Info -->
    <div v-if="!collapsed" class="p-4 border-t border-white/10">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <span class="text-sm font-semibold text-white">{{ auth.isAdmin ? 'ADM' : 'CL' }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">{{ auth.isAdmin ? 'Administrador' : 'Clínica' }}</p>
          <p class="text-xs text-white/50 truncate">{{ auth.user?.email }}</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const collapsed = ref(false)
const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/')
}

const svg = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px">${inner}</svg>`

const icons = {
  dashboard:  svg('<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'),
  users:      svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
  userPlus:   svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>'),
  fileImage:  svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="12" r="2"/><path d="m20 17-1.296-1.296a2 2 0 0 0-2.703-.146L14 17"/>'),
  fileText:   svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'),
  message:    svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
  clinic:     svg('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),
  settings:   svg('<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>'),
  logout:     svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>'),
}

const menuItems = [
  { icon: icons.dashboard, label: 'Dashboard',    to: '/dashboard' },
  { icon: icons.users,     label: 'Biomédicos',   to: '/dashboard/biomedicos' },
  { icon: icons.userPlus,  label: 'Pacientes',    to: '/dashboard/pacientes' },
  { icon: icons.fileImage, label: 'Enviar Exame', to: '/dashboard/enviar-exame' },
  { icon: icons.fileText,  label: 'Laudos',       to: '/dashboard/laudos' },
  { icon: icons.message,   label: 'Suporte',      to: '/dashboard/suporte' },
]
</script>
