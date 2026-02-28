<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Análise Preditiva de Demanda</h1>
      <p class="text-gray-500 mt-1">Previsões baseadas em histórico de compra e compatibilidade</p>
    </div>

    <!-- Loading animation -->
    <div v-if="loading" class="card text-center py-16">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 mb-4 animate-pulse">
        <span class="text-3xl">🔍</span>
      </div>
      <h3 class="text-lg font-bold text-gray-700 mb-2">Analisando demanda prevista...</h3>
      <p class="text-sm text-gray-400">Cruzando dados de histórico de compras, sazonalidade e localização</p>
      <div class="mt-6 max-w-xs mx-auto">
        <div class="progress-bar">
          <div class="progress-fill bg-gradient-to-r from-accent-400 to-accent-600 animate-pulse" style="width: 70%"></div>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-else class="space-y-6">
      <!-- Summary card -->
      <div class="card bg-gradient-to-r from-accent-50 to-primary-50 border-accent-100">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 class="text-lg font-bold text-gray-800">Resultado da Análise</h3>
            <p class="text-sm text-gray-500 mt-1">Produto: <span class="font-semibold text-gray-700">Tomate Italiano</span> — 2.000 kg</p>
          </div>
          <div class="flex gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-accent-600">5</div>
              <div class="text-xs text-gray-500">Compradores</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-600">1.200</div>
              <div class="text-xs text-gray-500">Kg previstos</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-yellow-600">64.6%</div>
              <div class="text-xs text-gray-500">Prob. média</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Buyers list -->
      <div class="space-y-3">
        <h3 class="text-md font-bold text-gray-700">Compradores Sugeridos</h3>

        <div v-for="(pred, idx) in store.predictions" :key="idx" class="card flex flex-col sm:flex-row sm:items-center gap-4">
          <!-- Avatar -->
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
               :class="pred.probability >= 70 ? 'bg-gradient-to-br from-primary-500 to-primary-700' : pred.probability >= 50 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-gray-400 to-gray-600'">
            {{ pred.name.charAt(0) }}
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-gray-800">{{ pred.name }}</h4>
            <p class="text-sm text-gray-400">CNPJ: {{ pred.cnpj }}</p>
          </div>

          <!-- Metrics -->
          <div class="flex items-center gap-6 flex-wrap">
            <div class="text-center">
              <div class="text-lg font-bold" :class="pred.probability >= 70 ? 'text-primary-600' : pred.probability >= 50 ? 'text-yellow-600' : 'text-gray-500'">
                {{ pred.probability }}%
              </div>
              <div class="text-xs text-gray-400">Probabilidade</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold text-gray-700">{{ pred.demand }} kg</div>
              <div class="text-xs text-gray-400">Demanda</div>
            </div>
            <div>
              <span :class="pred.compatibility === 'Alta' ? 'badge-green' : pred.compatibility === 'Média' ? 'badge-yellow' : 'badge-red'">
                {{ pred.compatibility }}
              </span>
            </div>
          </div>

          <!-- Progress bar -->
          <div class="w-32 hidden lg:block">
            <div class="progress-bar">
              <div class="progress-fill"
                   :class="pred.probability >= 70 ? 'bg-primary-500' : pred.probability >= 50 ? 'bg-yellow-400' : 'bg-gray-400'"
                   :style="{width: pred.probability + '%'}"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action -->
      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button @click="$router.push('/produtor')" class="btn-outline">← Voltar ao Dashboard</button>
        <button @click="$router.push('/fechamento')" class="btn-primary">Enviar Notificações aos Compradores →</button>
      </div>

      <!-- Disclaimer -->
      <div class="text-center mt-6">
        <p class="text-xs text-gray-400 italic">
          ⚠️ Dados simulados para fins de demonstração. Em produção, a análise preditiva utilizaria
          modelos de Machine Learning treinados com histórico real de transações.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '../stores/appStore'

const store = useAppStore()
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>
