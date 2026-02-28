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
        produtor: 'Fazenda São Jorge',
        varejista: 'Supermercado Central',
        beneficiador: 'Indústria AgroBrasil',
        transportador: 'TransLog Express',
    }

    // --- Mock data (unchanged from original) ---
    const offers = ref([
        {
            id: 1,
            product: 'Tomate Italiano',
            category: 'Hortaliças',
            quantity: 2000,
            unit: 'kg',
            reserved: 1420,
            date: '2026-03-15',
            location: 'Campinas, SP',
            price: 4.50,
            status: 'Aberto',
            deadline: '2026-03-14T08:00:00',
        },
        {
            id: 2,
            product: 'Alface Crespa',
            category: 'Hortaliças',
            quantity: 800,
            unit: 'caixa',
            reserved: 800,
            date: '2026-03-10',
            location: 'Campinas, SP',
            price: 12.00,
            status: 'Fechado',
            deadline: '2026-03-09T08:00:00',
        },
    ])

    const predictions = ref([
        { name: 'Restaurante Boa Mesa', cnpj: '12.345.678/0001-01', probability: 82, demand: 120, compatibility: 'Alta' },
        { name: 'Supermercado Central', cnpj: '23.456.789/0001-02', probability: 76, demand: 300, compatibility: 'Alta' },
        { name: 'Distribuidora Fartura', cnpj: '34.567.890/0001-03', probability: 68, demand: 500, compatibility: 'Média' },
        { name: 'Restaurante Sabor Natural', cnpj: '45.678.901/0001-04', probability: 55, demand: 80, compatibility: 'Média' },
        { name: 'Mercado Bom Preço', cnpj: '56.789.012/0001-05', probability: 42, demand: 200, compatibility: 'Baixa' },
    ])

    const notifications = ref([
        {
            id: 1,
            message: 'Novo lote de Tomate Italiano disponível para 15/03',
            producer: 'Fazenda São Jorge',
            product: 'Tomate Italiano',
            quantity: 2000,
            unit: 'kg',
            price: 4.50,
            deadline: '14/03/2026 às 08:00',
            read: false,
        },
        {
            id: 2,
            message: 'Novo lote de Cenoura Orgânica disponível para 20/03',
            producer: 'Sítio Vida Verde',
            product: 'Cenoura Orgânica',
            quantity: 1500,
            unit: 'kg',
            price: 3.80,
            deadline: '19/03/2026 às 08:00',
            read: true,
        },
    ])

    const closingData = ref({
        product: 'Tomate Italiano',
        totalDemanded: 1420,
        totalConfirmed: 1200,
        unit: 'kg',
        buyers: [
            { name: 'Restaurante Boa Mesa', quantity: 120, status: 'Confirmado' },
            { name: 'Supermercado Central', quantity: 300, status: 'Confirmado' },
            { name: 'Distribuidora Fartura', quantity: 500, status: 'Confirmado' },
            { name: 'Restaurante Sabor Natural', quantity: 80, status: 'Confirmado' },
            { name: 'Mercado Bom Preço', quantity: 200, status: 'Confirmado' },
        ],
    })

    const routeData = ref({
        origin: 'Fazenda São Jorge — Campinas, SP',
        totalDistance: 187,
        estimatedCost: 620.00,
        savings: 18,
        stops: [
            { name: 'Supermercado Central', address: 'Av. Brasil, 1200 - Campinas', distance: 12 },
            { name: 'Distribuidora Fartura', address: 'Rod. SP-340, km 45 - Jaguariúna', distance: 38 },
            { name: 'Restaurante Boa Mesa', address: 'Rua das Flores, 89 - Paulínia', distance: 52 },
            { name: 'Restaurante Sabor Natural', address: 'Rua XV de Novembro, 320 - Valinhos', distance: 68 },
            { name: 'Mercado Bom Preço', address: 'Av. São Paulo, 500 - Vinhedo', distance: 87 },
        ],
    })

    // --- Beneficiador mock data ---
    const processingData = ref({
        batches: [
            { id: 1, product: 'Tomate Italiano', origin: 'Fazenda São Jorge', quantity: 500, unit: 'kg', status: 'Em processamento', quality: 'A', date: '2026-03-15' },
            { id: 2, product: 'Alface Crespa', origin: 'Sítio Vida Verde', quantity: 300, unit: 'caixa', status: 'Concluído', quality: 'A', date: '2026-03-12' },
            { id: 3, product: 'Cenoura Orgânica', origin: 'Fazenda Esperança', quantity: 800, unit: 'kg', status: 'Aguardando', quality: 'B', date: '2026-03-18' },
        ],
        stats: { processed: 1200, pending: 800, rejected: 45, avgQuality: 94 },
    })

    // --- Transportador mock data ---
    const deliveryData = ref({
        activeDeliveries: [
            { id: 1, product: 'Tomate Italiano', from: 'Fazenda São Jorge', to: 'Supermercado Central', distance: 12, status: 'Em trânsito', eta: '14:30', vehicle: 'Caminhão Refrigerado' },
            { id: 2, product: 'Cenoura Orgânica', from: 'Sítio Vida Verde', to: 'Distribuidora Fartura', distance: 38, status: 'Aguardando coleta', eta: '16:00', vehicle: 'Van Refrigerada' },
            { id: 3, product: 'Alface Crespa', from: 'Fazenda Esperança', to: 'Restaurante Boa Mesa', distance: 52, status: 'Entregue', eta: '--', vehicle: 'Caminhão Baú' },
        ],
        stats: { active: 2, completed: 15, totalKm: 487, avgRating: 4.8 },
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
