import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
    const userType = ref(null) // 'produtor' or 'comprador'
    const userName = ref('')
    const userCnpj = ref('')

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

    function login(cnpj, type) {
        userCnpj.value = cnpj
        userType.value = type
        userName.value = type === 'produtor' ? 'Fazenda São Jorge' : 'Supermercado Central'
    }

    function logout() {
        userType.value = null
        userName.value = ''
        userCnpj.value = ''
    }

    return {
        userType, userName, userCnpj,
        offers, predictions, notifications,
        closingData, routeData,
        login, logout,
    }
})
