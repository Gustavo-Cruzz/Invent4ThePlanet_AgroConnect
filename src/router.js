import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import ProducerDashboard from './views/ProducerDashboard.vue'
import PredictiveAnalysis from './views/PredictiveAnalysis.vue'
import BuyerDashboard from './views/BuyerDashboard.vue'
import OrderClosing from './views/OrderClosing.vue'
import Routing from './views/Routing.vue'

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/produtor', name: 'ProducerDashboard', component: ProducerDashboard },
    { path: '/analise', name: 'PredictiveAnalysis', component: PredictiveAnalysis },
    { path: '/comprador', name: 'BuyerDashboard', component: BuyerDashboard },
    { path: '/fechamento', name: 'OrderClosing', component: OrderClosing },
    { path: '/roteamento', name: 'Routing', component: Routing },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
