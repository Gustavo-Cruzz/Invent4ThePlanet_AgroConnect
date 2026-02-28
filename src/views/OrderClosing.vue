<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Fechamento de Pedidos</h1>
      <p class="text-gray-500 mt-1">Resumo consolidado após encerramento do prazo</p>
    </div>

    <!-- Status banner -->
    <div class="card bg-gradient-to-r from-red-50 to-orange-50 border-red-100 mb-6">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <span class="text-2xl">🔒</span>
        </div>
        <div>
          <h3 class="text-lg font-bold text-red-800">Pedidos Encerrados</h3>
          <p class="text-sm text-red-600">O prazo para solicitações de <strong>{{ store.closingData.product }}</strong> foi finalizado.</p>
        </div>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div class="card text-center">
        <div class="text-2xl font-bold text-gray-800">{{ store.closingData.totalDemanded }}</div>
        <div class="text-xs text-gray-500 mt-1">{{ store.closingData.unit }} Demandados</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-primary-600">{{ store.closingData.totalConfirmed }}</div>
        <div class="text-xs text-gray-500 mt-1">{{ store.closingData.unit }} Confirmados</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-accent-600">{{ store.closingData.buyers.length }}</div>
        <div class="text-xs text-gray-500 mt-1">Compradores</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-green-600">84%</div>
        <div class="text-xs text-gray-500 mt-1">Taxa de Conversão</div>
      </div>
    </div>

    <!-- Demand vs Confirmed bar -->
    <div class="card mb-8">
      <h3 class="text-md font-bold text-gray-700 mb-4">Demanda vs. Confirmado</h3>
      <div class="space-y-3">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600">Total Demandado</span>
            <span class="font-medium">{{ store.closingData.totalDemanded }} {{ store.closingData.unit }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill bg-gradient-to-r from-gray-400 to-gray-500" style="width: 100%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600">Total Confirmado</span>
            <span class="font-medium text-primary-600">{{ store.closingData.totalConfirmed }} {{ store.closingData.unit }}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill bg-gradient-to-r from-primary-400 to-primary-600"
                 :style="{width: Math.round(store.closingData.totalConfirmed / store.closingData.totalDemanded * 100) + '%'}"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Buyers Table -->
    <div class="card">
      <h3 class="text-md font-bold text-gray-700 mb-4">Lista de Compradores</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100">
              <th class="text-left py-3 px-4 text-gray-500 font-medium">Comprador</th>
              <th class="text-right py-3 px-4 text-gray-500 font-medium">Quantidade</th>
              <th class="text-right py-3 px-4 text-gray-500 font-medium">% do Total</th>
              <th class="text-center py-3 px-4 text-gray-500 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(buyer, idx) in store.closingData.buyers" :key="idx" class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                    {{ buyer.name.charAt(0) }}
                  </div>
                  <span class="font-medium text-gray-800">{{ buyer.name }}</span>
                </div>
              </td>
              <td class="py-3 px-4 text-right font-medium text-gray-700">{{ buyer.quantity }} {{ store.closingData.unit }}</td>
              <td class="py-3 px-4 text-right text-gray-500">{{ Math.round(buyer.quantity / store.closingData.totalConfirmed * 100) }}%</td>
              <td class="py-3 px-4 text-center">
                <span class="badge-green">{{ buyer.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-3 pt-6">
      <button @click="$router.push('/produtor')" class="btn-outline">← Voltar ao Dashboard</button>
      <button @click="$router.push('/roteamento')" class="btn-primary">Gerar Rota de Entrega →</button>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '../stores/appStore'

const store = useAppStore()
</script>
