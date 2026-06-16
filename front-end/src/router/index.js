import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import DashboardLayout from '../views/DashboardLayout.vue'
import DashboardView from '../views/DashboardView.vue'
import BioMedicosView from '../views/BioMedicosView.vue'
import PacientesView from '../views/PacientesView.vue'
import EnviarExameView from '../views/EnviarExameView.vue'
import LaudosView from '../views/LaudosView.vue'
import SuporteView from '../views/SuporteView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/dashboard',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '', name: 'dashboard', component: DashboardView },
            { path: 'biomedicos', name: 'biomedicos', component: BioMedicosView },
            { path: 'pacientes', name: 'pacientes', component: PacientesView },
            { path: 'enviar-exame', name: 'enviar-exame', component: EnviarExameView },
            { path: 'laudos', name: 'laudos', component: LaudosView },
            { path: 'suporte', name: 'suporte', component: SuporteView },
            { path: 'cadastrar-clinica', name: 'cadastrar-clinica', component: RegisterView, meta: { requiresAdmin: true } },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isLoggedIn) {
        return { name: 'login' }
    }

    if (to.meta.requiresAdmin && !auth.isAdmin) {
        return { name: 'dashboard' }
    }
})

export default router
