<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Roteamento Inteligente</h1>
      <p class="text-gray-500 mt-1">Otimização logística para entrega consolidada</p>
    </div>

    <!-- Route Map (Mock SVG) -->
    <div class="card mb-6 overflow-hidden">
      <div class="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-50 rounded-xl p-6 min-h-[400px]">
        <!-- SVG Route Map -->
        <svg viewBox="0 0 800 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <!-- Background grid -->
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
            </pattern>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/>
            </filter>
          </defs>
          <rect width="800" height="400" fill="url(#grid)"/>

          <!-- Roads -->
          <path d="M 100,200 Q 200,180 300,250 Q 400,300 500,200 Q 550,160 600,180 Q 650,200 700,160" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8,4" opacity="0.4"/>

          <!-- Optimized Route -->
          <path d="M 100,200 C 180,190 220,230 300,250 C 380,270 420,220 480,200 C 530,185 560,195 600,180 C 640,170 670,165 700,160"
                fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round" filter="url(#shadow)">
            <animate attributeName="stroke-dasharray" values="0,2000;2000,0" dur="2s" fill="freeze"/>
          </path>

          <!-- Origin (Producer) -->
          <g transform="translate(100,200)">
            <circle r="18" fill="#15803d" filter="url(#shadow)"/>
            <circle r="12" fill="#22c55e"/>
            <text y="1" text-anchor="middle" fill="white" font-size="12" font-weight="bold">🏭</text>
            <text y="40" text-anchor="middle" fill="#374151" font-size="11" font-weight="600">Fazenda São Jorge</text>
            <text y="54" text-anchor="middle" fill="#9ca3af" font-size="9">ORIGEM</text>
          </g>

          <!-- Stop 1 -->
          <g transform="translate(300,250)">
            <circle r="14" fill="#2563eb" filter="url(#shadow)"/>
            <circle r="9" fill="#3b82f6"/>
            <text y="1" text-anchor="middle" fill="white" font-size="10" font-weight="bold">1</text>
            <text y="-24" text-anchor="middle" fill="#374151" font-size="10" font-weight="600">Supermercado Central</text>
          </g>

          <!-- Stop 2 -->
          <g transform="translate(480,200)">
            <circle r="14" fill="#2563eb" filter="url(#shadow)"/>
            <circle r="9" fill="#3b82f6"/>
            <text y="1" text-anchor="middle" fill="white" font-size="10" font-weight="bold">2</text>
            <text y="30" text-anchor="middle" fill="#374151" font-size="10" font-weight="600">Distribuidora Fartura</text>
          </g>

          <!-- Stop 3 -->
          <g transform="translate(600,180)">
            <circle r="14" fill="#2563eb" filter="url(#shadow)"/>
            <circle r="9" fill="#3b82f6"/>
            <text y="1" text-anchor="middle" fill="white" font-size="10" font-weight="bold">3</text>
            <text y="-24" text-anchor="middle" fill="#374151" font-size="10" font-weight="600">Rest. Boa Mesa</text>
          </g>

          <!-- Stop 4 -->
          <g transform="translate(700,160)">
            <circle r="14" fill="#2563eb" filter="url(#shadow)"/>
            <circle r="9" fill="#3b82f6"/>
            <text y="1" text-anchor="middle" fill="white" font-size="10" font-weight="bold">4</text>
            <text y="30" text-anchor="middle" fill="#374151" font-size="10" font-weight="600">Rest. Sabor Natural</text>
          </g>

          <!-- Legend -->
          <g transform="translate(20,370)">
            <circle r="5" fill="#22c55e" cx="5" cy="0"/>
            <text x="16" y="4" fill="#6b7280" font-size="10">Rota otimizada</text>
            <line x1="100" y1="0" x2="130" y2="0" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,2"/>
            <text x="136" y="4" fill="#6b7280" font-size="10">Rota original</text>
          </g>
        </svg>
      </div>
    </div>

    <!-- Route Info Banner -->
    <div class="card bg-gradient-to-r from-primary-50 to-green-50 border-primary-100 mb-6">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
          <span class="text-2xl">🚛</span>
        </div>
        <div>
          <h3 class="text-lg font-bold text-primary-800">Rota otimizada gerada com redução estimada de {{ store.routeData.savings }}% no custo de frete.</h3>
          <p class="text-sm text-primary-600 mt-1">Algoritmo de roteamento consolidou {{ store.routeData.stops.length }} pontos de entrega na melhor sequência possível.</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div class="card text-center">
        <div class="text-3xl font-bold text-gray-800">{{ store.routeData.totalDistance }} km</div>
        <div class="text-sm text-gray-500 mt-1">Distância Total</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold text-accent-600">R$ {{ store.routeData.estimatedCost.toFixed(2) }}</div>
        <div class="text-sm text-gray-500 mt-1">Custo Estimado</div>
      </div>
      <div class="card text-center">
        <div class="text-3xl font-bold text-primary-600">{{ store.routeData.savings }}%</div>
        <div class="text-sm text-gray-500 mt-1">Economia Projetada</div>
        <div class="mt-2">
          <div class="progress-bar">
            <div class="progress-fill bg-gradient-to-r from-primary-400 to-primary-600" :style="{width: store.routeData.savings + '%'}"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stops Table -->
    <div class="card">
      <h3 class="text-md font-bold text-gray-700 mb-4">Sequência de Entregas</h3>
      <div class="space-y-3">
        <!-- Origin -->
        <div class="flex items-center gap-4 p-3 rounded-xl bg-green-50">
          <div class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            📍
          </div>
          <div class="flex-1">
            <div class="font-bold text-gray-800">{{ store.routeData.origin }}</div>
            <div class="text-sm text-gray-500">Ponto de Origem</div>
          </div>
          <div class="text-sm text-gray-400">0 km</div>
        </div>

        <!-- Stops -->
        <div v-for="(stop, idx) in store.routeData.stops" :key="idx"
             class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
          <div class="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {{ idx + 1 }}
          </div>
          <div class="flex-1">
            <div class="font-bold text-gray-800">{{ stop.name }}</div>
            <div class="text-sm text-gray-500">{{ stop.address }}</div>
          </div>
          <div class="text-sm text-gray-500 font-medium">+{{ stop.distance }} km</div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-3 pt-6">
      <button @click="$router.push('/fechamento')" class="btn-outline">← Voltar ao Fechamento</button>
      <button class="btn-primary">📄 Exportar Relatório</button>
    </div>

    <!-- Disclaimer -->
    <div class="text-center mt-8">
      <p class="text-xs text-gray-400 italic">
        ⚠️ Mapa e rotas simulados para fins de demonstração. Em produção, a otimização de rota utilizaria
        APIs de geolocalização e algoritmos de Vehicle Routing Problem (VRP).
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '../stores/appStore'

const store = useAppStore()
</script>
