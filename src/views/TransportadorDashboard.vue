<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard do Transportador</h1>
      <p class="text-gray-500 mt-1">Gerenciamento de entregas e logística</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div class="card text-center">
        <div class="text-2xl font-bold" style="color: var(--theme-primary-600)">{{ store.deliveryData.stats.active }}</div>
        <div class="text-xs text-gray-500 mt-1">Entregas Ativas</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-green-600">{{ store.deliveryData.stats.completed }}</div>
        <div class="text-xs text-gray-500 mt-1">Concluídas</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-gray-700">{{ store.deliveryData.stats.totalKm }} km</div>
        <div class="text-xs text-gray-500 mt-1">Km Percorridos</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-yellow-500">⭐ {{ store.deliveryData.stats.avgRating }}</div>
        <div class="text-xs text-gray-500 mt-1">Avaliação Média</div>
      </div>
    </div>

    <!-- Active Deliveries -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
        🚛 Entregas
      </h2>

      <div v-for="delivery in store.deliveryData.activeDeliveries" :key="delivery.id" class="card">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center gap-4 flex-1">
            <!-- Status icon -->
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                 :style="{ background: delivery.status === 'Entregue'
                   ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                   : delivery.status === 'Em trânsito'
                     ? `linear-gradient(135deg, var(--theme-primary-600), var(--theme-primary-700))`
                     : 'linear-gradient(135deg, #f59e0b, #d97706)'
                 }">
              {{ delivery.status === 'Entregue' ? '✓' : delivery.status === 'Em trânsito' ? '🚛' : '⏳' }}
            </div>
            <div>
              <h3 class="font-bold text-gray-800">{{ delivery.product }}</h3>
              <p class="text-sm text-gray-400">{{ delivery.from }} → {{ delivery.to }}</p>
            </div>
          </div>

          <div class="flex items-center gap-6 flex-wrap">
            <div class="text-center">
              <div class="text-lg font-bold text-gray-700">{{ delivery.distance }} km</div>
              <div class="text-xs text-gray-400">Distância</div>
            </div>
            <div class="text-center">
              <div class="text-sm font-medium text-gray-600">{{ delivery.vehicle }}</div>
              <div class="text-xs text-gray-400">Veículo</div>
            </div>
            <div class="text-center">
              <div class="text-sm font-bold" :class="delivery.eta === '--' ? 'text-gray-400' : 'text-gray-700'">{{ delivery.eta }}</div>
              <div class="text-xs text-gray-400">ETA</div>
            </div>
            <div>
              <span :class="
                delivery.status === 'Entregue' ? 'badge-green' :
                delivery.status === 'Em trânsito' ? 'badge-purple' :
                'badge-yellow'
              ">
                {{ delivery.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Route Overview Card -->
    <div class="card mt-8" style="border-left: 4px solid var(--theme-primary-600)">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
             :style="{ backgroundColor: 'var(--theme-primary-50)' }">
          <span class="text-2xl">🗺️</span>
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-800">Rota do Dia</h3>
          <p class="text-sm text-gray-500 mt-1">{{ store.routeData.stops.length }} pontos de entrega · {{ store.routeData.totalDistance }} km total · Economia estimada de {{ store.routeData.savings }}%</p>
          <button @click="$router.push('/roteamento')" class="btn-themed text-sm py-2 px-4 mt-3">
            Ver Rota Completa →
          </button>
        </div>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="text-center mt-8">
      <p class="text-xs text-gray-400 italic">
        ⚠️ Dados simulados para fins de demonstração.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '../stores/appStore'

const store = useAppStore()
</script>
