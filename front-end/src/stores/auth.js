import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const ADMIN_EMAIL = 'admin@carjimlabs.com'
const ADMIN_PASSWORD = 'Admin123'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const isLoggedIn = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function login(email, password) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      user.value = { email, role: 'admin' }
      return true
    }
    // futuramente: validar credenciais de clínica via backend
    user.value = { email, role: 'clinic' }
    return true
  }

  function logout() {
    user.value = null
  }

  return { user, isLoggedIn, isAdmin, login, logout }
})
