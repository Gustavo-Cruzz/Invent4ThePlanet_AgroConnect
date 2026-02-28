<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard do Produtor</h1>
      <p class="text-gray-500 mt-1">Gerencie suas ofertas de produtos agrícolas</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Left Column: New Offer Form -->
      <div class="lg:col-span-1">
        <div class="card">
          <div class="flex items-center gap-2 mb-5">
            <div class="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <span class="text-primary-600 font-bold text-sm">+</span>
            </div>
            <h2 class="text-lg font-bold text-gray-800">Novo Anúncio</h2>
          </div>

          <form @submit.prevent="publishOffer" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Produto</label>
              <input v-model="form.product" type="text" placeholder="Ex: Tomate Italiano" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <select v-model="form.category" class="input-field">
                <option value="">Selecione...</option>
                <option>Hortaliças</option>
                <option>Frutas</option>
                <option>Grãos</option>
                <option>Leguminosas</option>
                <option>Tubérculos</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
                <input v-model="form.quantity" type="number" placeholder="2000" class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Unidade</label>
                <select v-model="form.unit" class="input-field">
                  <option>kg</option>
                  <option>caixa</option>
                  <option>tonelada</option>
                  <option>unidade</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Data de Disponibilidade</label>
              <input v-model="form.date" type="date" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Localização</label>
              <input v-model="form.location" type="text" placeholder="Campinas, SP" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Preço Estimado (R$/unidade)</label>
              <input v-model="form.price" type="number" step="0.01" placeholder="4.50" class="input-field" />
            </div>

            <button type="submit" class="btn-primary w-full text-center">
              📦 Publicar Oferta
            </button>
          </form>
        </div>
      </div>

      <!-- Right Column: Offer List -->
      <div class="lg:col-span-2 space-y-5">
        <h2 class="text-lg font-bold text-gray-800">📊 Meus Anúncios</h2>

        <div v-for="offer in store.offers" :key="offer.id" class="card">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-bold text-gray-800">{{ offer.product }}</h3>
                <span :class="offer.status === 'Aberto' ? 'badge-green' : 'badge-red'">
                  {{ offer.status }}
                </span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-600">
                <div><span class="text-gray-400">Categoria:</span> {{ offer.category }}</div>
                <div><span class="text-gray-400">Localização:</span> {{ offer.location }}</div>
                <div><span class="text-gray-400">Preço:</span> R$ {{ offer.price.toFixed(2) }}/{{ offer.unit }}</div>
                <div><span class="text-gray-400">Disponível:</span> {{ offer.date }}</div>
                <div><span class="text-gray-400">Prazo pedidos:</span> 24h antes</div>
              </div>
            </div>

            <!-- Stats -->
            <div class="flex flex-col items-end gap-2 min-w-[160px]">
              <div class="text-right">
                <div class="text-xs text-gray-400 uppercase tracking-wide">Qtd Disponível</div>
                <div class="text-xl font-bold text-gray-800">{{ offer.quantity }} <span class="text-sm font-normal text-gray-500">{{ offer.unit }}</span></div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400 uppercase tracking-wide">Reservado</div>
                <div class="text-xl font-bold text-primary-600">{{ offer.reserved }} <span class="text-sm font-normal text-gray-500">{{ offer.unit }}</span></div>
              </div>
              <!-- progress -->
              <div class="w-full">
                <div class="progress-bar">
                  <div class="progress-fill bg-gradient-to-r from-primary-400 to-primary-600" :style="{width: Math.round(offer.reserved / offer.quantity * 100) + '%'}"></div>
                </div>
                <div class="text-xs text-gray-400 mt-1 text-right">{{ Math.round(offer.reserved / offer.quantity * 100) }}% reservado</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div class="card text-center">
            <div class="text-2xl font-bold text-primary-600">{{ store.offers.length }}</div>
            <div class="text-xs text-gray-500 mt-1">Anúncios Ativos</div>
          </div>
          <div class="card text-center">
            <div class="text-2xl font-bold text-accent-600">1.420</div>
            <div class="text-xs text-gray-500 mt-1">Kg Reservados</div>
          </div>
          <div class="card text-center">
            <div class="text-2xl font-bold text-yellow-600">5</div>
            <div class="text-xs text-gray-500 mt-1">Compradores</div>
          </div>
          <div class="card text-center">
            <div class="text-2xl font-bold text-green-600">R$ 6.390</div>
            <div class="text-xs text-gray-500 mt-1">Receita Estimada</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'

const store = useAppStore()
const router = useRouter()

const form = reactive({
  product: '',
  category: '',
  quantity: '',
  unit: 'kg',
  date: '',
  location: '',
  price: '',
})

function publishOffer() {
  // Mock: just navigate to analysis page
  router.push('/analise')
}
</script>
