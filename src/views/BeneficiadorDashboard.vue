<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard do Beneficiador</h1>
      <p class="text-gray-500 mt-1">Controle de processamento e qualidade dos produtos</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <div class="card text-center">
        <div class="text-2xl font-bold" style="color: var(--theme-primary-600)">{{ store.processingData.stats.processed }}</div>
        <div class="text-xs text-gray-500 mt-1">Kg Processados</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-yellow-600">{{ store.processingData.stats.pending }}</div>
        <div class="text-xs text-gray-500 mt-1">Kg Pendentes</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-red-500">{{ store.processingData.stats.rejected }}</div>
        <div class="text-xs text-gray-500 mt-1">Kg Rejeitados</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-green-600">{{ store.processingData.stats.avgQuality }}%</div>
        <div class="text-xs text-gray-500 mt-1">Qualidade Média</div>
      </div>
    </div>

    <!-- Batches -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
        🏭 Lotes em Processamento
      </h2>

      <div v-for="batch in store.processingData.batches" :key="batch.id" class="card">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center gap-4 flex-1">
            <!-- Avatar -->
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                 :style="{ background: `linear-gradient(135deg, var(--theme-primary-600), var(--theme-primary-700))` }">
              {{ batch.product.charAt(0) }}
            </div>
            <div>
              <h3 class="font-bold text-gray-800">{{ batch.product }}</h3>
              <p class="text-sm text-gray-400">Origem: {{ batch.origin }} · {{ batch.date }}</p>
            </div>
          </div>

          <div class="flex items-center gap-6 flex-wrap">
            <div class="text-center">
              <div class="text-lg font-bold text-gray-700">{{ batch.quantity }} {{ batch.unit }}</div>
              <div class="text-xs text-gray-400">Quantidade</div>
            </div>
            <div class="text-center">
              <span :class="batch.quality === 'A' ? 'badge-green' : batch.quality === 'B' ? 'badge-yellow' : 'badge-red'">
                Grau {{ batch.quality }}
              </span>
            </div>
            <div>
              <span :class="
                batch.status === 'Concluído' ? 'badge-green' :
                batch.status === 'Em processamento' ? 'badge-blue' :
                'badge-yellow'
              ">
                {{ batch.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quality Overview -->
    <div class="card mt-8">
      <h3 class="text-md font-bold text-gray-700 mb-4">📊 Visão Geral de Qualidade</h3>
      <div class="space-y-3">
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600">Aprovados (Grau A)</span>
            <span class="font-medium text-green-600">78%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill bg-gradient-to-r from-green-400 to-green-600" style="width: 78%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600">Aprovados (Grau B)</span>
            <span class="font-medium text-yellow-600">16%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill bg-gradient-to-r from-yellow-400 to-yellow-600" style="width: 16%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-600">Rejeitados</span>
            <span class="font-medium text-red-500">6%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill bg-gradient-to-r from-red-400 to-red-500" style="width: 6%"></div>
          </div>
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
