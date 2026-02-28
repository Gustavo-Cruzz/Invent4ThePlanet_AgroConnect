import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import ProducerDashboard from './views/ProducerDashboard.vue'
import PredictiveAnalysis from './views/PredictiveAnalysis.vue'
import BuyerDashboard from './views/BuyerDashboard.vue'
import BeneficiadorDashboard from './views/BeneficiadorDashboard.vue'
import TransportadorDashboard from './views/TransportadorDashboard.vue'
import OrderClosing from './views/OrderClosing.vue'
import Routing from './views/Routing.vue'

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/produtor', name: 'ProducerDashboard', component: ProducerDashboard, meta: { requiredRole: 'produtor' } },
    { path: '/analise', name: 'PredictiveAnalysis', component: PredictiveAnalysis, meta: { requiredRole: 'produtor' } },
    { path: '/varejista', name: 'VarejistaDashboard', component: BuyerDashboard, meta: { requiredRole: 'varejista' } },
    { path: '/beneficiador', name: 'BeneficiadorDashboard', component: BeneficiadorDashboard, meta: { requiredRole: 'beneficiador' } },
    { path: '/transportador', name: 'TransportadorDashboard', component: TransportadorDashboard, meta: { requiredRole: 'transportador' } },
    { path: '/fechamento', name: 'OrderClosing', component: OrderClosing, meta: { requiredRole: 'produtor' } },
    { path: '/roteamento', name: 'Routing', component: Routing, meta: { requiredRole: ['produtor', 'transportador'] } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// RBAC navigation guard
router.beforeEach((to, from, next) => {
    if (to.meta.requiredRole) {
        const savedType = localStorage.getItem('fc_userType')
        const required = to.meta.requiredRole
        const allowed = Array.isArray(required) ? required.includes(savedType) : required === savedType

        if (!savedType) {
            next('/')
        } else if (!allowed) {
            next('/')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
