import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    // --- Auth state ---
    const userType = ref(null) // 'produtor' | 'varejista' | 'beneficiador' | 'transportador'
    const userName = ref('')
    const userCnpj = ref('')

    // RBAC preparation
    const permissions = ref([])

    const rolePermissions = {
        produtor: ['dashboard', 'analise', 'fechamento', 'roteamento'],
        varejista: ['dashboard', 'pedidos'],
        beneficiador: ['dashboard', 'processamento'],
        transportador: ['dashboard', 'roteamento', 'entregas'],
    }

    const mockNames = {
        produtor: 'Sítio São Jorge',
        varejista: 'Quitanda do Bairro',
        beneficiador: 'Beneficiamento Raízes',
        transportador: 'Frete Rural Expresso',
    }

    // --- Mock data (unchanged from original) ---
    const offers = ref([
        {
            id: 1,
            product: 'Tomate Italiano',
            category: 'Hortaliças',
            quantity: 150,
            unit: 'kg',
            reserved: 110,
            date: '2026-03-15',
            location: 'Campinas, SP',
            price: 5.80,
            status: 'Aberto',
            deadline: '2026-03-14T08:00:00',
        },
        {
            id: 2,
            product: 'Alface Crespa',
            category: 'Hortaliças',
            quantity: 60,
            unit: 'Caixas',
            reserved: 60,
            date: '2026-03-10',
            location: 'Campinas, SP',
            price: 14.00,
            status: 'Fechado',
            deadline: '2026-03-09T08:00:00',
        },
    ])

    const predictions = ref([
        { name: 'Restaurante Boa Mesa', cnpj: '12.345.678/0001-01', probability: 82, demand: 15, compatibility: 'Alta' },
        { name: 'Quitanda do Bairro', cnpj: '23.456.789/0001-02', probability: 76, demand: 25, compatibility: 'Alta' },
        { name: 'Feira Orgânica Local', cnpj: '34.567.890/0001-03', probability: 68, demand: 30, compatibility: 'Média' },
        { name: 'Restaurante Sabor Natural', cnpj: '45.678.901/0001-04', probability: 55, demand: 10, compatibility: 'Média' },
        { name: 'Mercadinho Bom Preço', cnpj: '56.789.012/0001-05', probability: 42, demand: 20, compatibility: 'Baixa' },
    ])

    const notifications = ref([
        {
            id: 1,
            message: 'Novo lote de Tomate Italiano disponível para 15/03',
            producer: 'Sítio São Jorge',
            product: 'Tomate Italiano',
            quantity: 150,
            unit: 'kg',
            price: 5.80,
            deadline: '14/03/2026 às 08:00',
            read: false,
        },
        {
            id: 2,
            message: 'Novo lote de Cenoura Orgânica disponível para 20/03',
            producer: 'Sítio Vida Verde',
            product: 'Cenoura Orgânica',
            quantity: 80,
            unit: 'kg',
            price: 4.50,
            deadline: '19/03/2026 às 08:00',
            read: true,
        },
    ])

    const closingData = ref({
        product: 'Tomate Italiano',
        totalDemanded: 110,
        totalConfirmed: 95,
        unit: 'kg',
        buyers: [
            { name: 'Restaurante Boa Mesa', quantity: 15, status: 'Confirmado' },
            { name: 'Quitanda do Bairro', quantity: 25, status: 'Confirmado' },
            { name: 'Feira Orgânica Local', quantity: 30, status: 'Confirmado' },
            { name: 'Restaurante Sabor Natural', quantity: 10, status: 'Confirmado' },
            { name: 'Mercadinho Bom Preço', quantity: 15, status: 'Confirmado' },
        ],
    })

    const routeData = ref({
        origin: 'Sítio São Jorge — Campinas, SP',
        totalDistance: 42,
        estimatedCost: 85.00,
        savings: 22,
        stops: [
            { name: 'Quitanda do Bairro', address: 'Rua das Laranjeiras, 45 - Campinas', distance: 5 },
            { name: 'Feira Orgânica Local', address: 'Praça Central, s/n - Campinas', distance: 8 },
            { name: 'Restaurante Boa Mesa', address: 'Rua das Flores, 89 - Campinas', distance: 12 },
            { name: 'Restaurante Sabor Natural', address: 'Rua XV de Novembro, 320 - Valinhos', distance: 22 },
            { name: 'Mercadinho Bom Preço', address: 'Av. São Paulo, 500 - Valinhos', distance: 42 },
        ],
    })

    // --- Beneficiador mock data ---
    const processingData = ref({
        batches: [
            { id: 1, product: 'Tomate Italiano', origin: 'Sítio São Jorge', quantity: 50, unit: 'kg', status: 'Em processamento', quality: 'A', date: '2026-03-15' },
            { id: 2, product: 'Alface Crespa', origin: 'Sítio Vida Verde', quantity: 30, unit: 'Caixas', status: 'Concluído', quality: 'A', date: '2026-03-12' },
            { id: 3, product: 'Cenoura Orgânica', origin: 'Sítio Esperança', quantity: 60, unit: 'kg', status: 'Aguardando', quality: 'B', date: '2026-03-18' },
        ],
        stats: { processed: 120, pending: 60, rejected: 5, avgQuality: 94 },
    })

    // --- Transportador mock data ---
    const deliveryData = ref({
        activeDeliveries: [
            { id: 1, product: 'Tomate Italiano', from: 'Sítio São Jorge', to: 'Quitanda do Bairro', distance: 5, status: 'Em trânsito', eta: '14:30', vehicle: 'Utilitário Refrigerado' },
            { id: 2, product: 'Cenoura Orgânica', from: 'Sítio Vida Verde', to: 'Feira Orgânica Local', distance: 8, status: 'Aguardando coleta', eta: '16:00', vehicle: 'Fiorino' },
            { id: 3, product: 'Alface Crespa', from: 'Sítio Esperança', to: 'Restaurante Boa Mesa', distance: 12, status: 'Entregue', eta: '--', vehicle: 'Kombi Baú' },
        ],
        stats: { active: 2, completed: 8, totalKm: 96, avgRating: 4.8 },
    })

    // --- Actions ---
    function login(cnpj, type) {
        userCnpj.value = cnpj
        userType.value = type
        userName.value = mockNames[type] || type
        permissions.value = rolePermissions[type] || []

        // Persist to localStorage
        localStorage.setItem('fc_userType', type)
        localStorage.setItem('fc_userName', userName.value)
        localStorage.setItem('fc_userCnpj', cnpj)
    }

    function logout() {
        userType.value = null
        userName.value = ''
        userCnpj.value = ''
        permissions.value = []

        localStorage.removeItem('fc_userType')
        localStorage.removeItem('fc_userName')
        localStorage.removeItem('fc_userCnpj')
    }

    function restoreSession() {
        const savedType = localStorage.getItem('fc_userType')
        const savedName = localStorage.getItem('fc_userName')
        const savedCnpj = localStorage.getItem('fc_userCnpj')
        if (savedType) {
            userType.value = savedType
            userName.value = savedName || ''
            userCnpj.value = savedCnpj || ''
            permissions.value = rolePermissions[savedType] || []
        }
    }

    function hasPermission(perm) {
        return permissions.value.includes(perm)
    }

    return {
        userType, userName, userCnpj, permissions,
        offers, predictions, notifications,
        closingData, routeData,
        processingData, deliveryData,
        login, logout, restoreSession, hasPermission,
    }
})
