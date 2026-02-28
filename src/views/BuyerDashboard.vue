<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard do Varejista</h1>
      <p class="text-gray-500 mt-1">Acompanhe ofertas disponíveis e faça seus pedidos</p>
    </div>

    <!-- Notifications -->
    <div class="space-y-4 mb-8">
      <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
        🔔 Notificações
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold">
          {{ store.notifications.filter(n => !n.read).length }}
        </span>
      </h2>

      <div v-for="notif in store.notifications" :key="notif.id"
           :class="['card border-l-4 transition-all duration-200', notif.read ? 'border-l-gray-200 opacity-70' : 'border-l-primary-500']">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span v-if="!notif.read" class="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0"></span>
              <h3 class="font-bold text-gray-800">{{ notif.message }}</h3>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-500 mt-2">
              <div>🏭 {{ notif.producer }}</div>
              <div>📦 {{ notif.quantity }} {{ notif.unit }}</div>
              <div>💰 R$ {{ notif.price.toFixed(2) }}/{{ notif.unit }}</div>
              <div>⏰ Até {{ notif.deadline }}</div>
            </div>
          </div>
          <div class="flex gap-2 flex-shrink-0">
            <button @click="showDetails(notif)" class="btn-outline text-sm py-2 px-4">Ver detalhes</button>
            <button @click="openRequest(notif)" class="btn-primary text-sm py-2 px-4">Solicitar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Request Modal -->
    <div v-if="showRequestModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
        <button @click="showRequestModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">✕</button>

        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
            <span class="text-xl">🛒</span>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800">Solicitar Quantidade</h3>
            <p class="text-sm text-gray-500">{{ selectedNotif?.product }}</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="bg-gray-50 rounded-xl p-4 text-sm space-y-1">
            <div class="flex justify-between"><span class="text-gray-500">Produtor</span><span class="font-medium">{{ selectedNotif?.producer }}</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Disponível</span><span class="font-medium">{{ selectedNotif?.quantity }} {{ selectedNotif?.unit }}</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Preço</span><span class="font-medium">R$ {{ selectedNotif?.price?.toFixed(2) }}/{{ selectedNotif?.unit }}</span></div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Quantidade desejada ({{ selectedNotif?.unit }})</label>
            <input v-model="requestQty" type="number" placeholder="Ex: 300" class="input-field" />
          </div>

          <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-start gap-2">
            <span class="text-yellow-500 mt-0.5">⚠️</span>
            <p class="text-sm text-yellow-800">Pedidos aceitos até <strong>24h antes</strong> da data de entrega. Após esse prazo, o pedido será encerrado automaticamente.</p>
          </div>

          <div class="flex gap-3">
            <button @click="showRequestModal = false" class="btn-outline flex-1 text-center">Cancelar</button>
            <button @click="submitRequest" class="btn-primary flex-1 text-center">Confirmar Pedido</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmed message -->
    <div v-if="confirmed" class="card bg-gradient-to-r from-green-50 to-primary-50 border-green-200 text-center py-8">
      <div class="text-4xl mb-3">✅</div>
      <h3 class="text-lg font-bold text-green-800">Pedido Confirmado!</h3>
      <p class="text-sm text-green-600 mt-1">Sua solicitação de {{ requestQty }} {{ selectedNotif?.unit }} de {{ selectedNotif?.product }} foi registrada.</p>
      <p class="text-xs text-gray-400 mt-3">Você receberá atualizações sobre o status da entrega.</p>
    </div>

    <!-- Detail Modal -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative">
        <button @click="showDetailModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">✕</button>
        <h3 class="text-lg font-bold text-gray-800 mb-4">Detalhes da Oferta</h3>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Produto</span><span class="font-medium">{{ selectedNotif?.product }}</span></div>
          <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Produtor</span><span class="font-medium">{{ selectedNotif?.producer }}</span></div>
          <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Quantidade</span><span class="font-medium">{{ selectedNotif?.quantity }} {{ selectedNotif?.unit }}</span></div>
          <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-gray-500">Preço unitário</span><span class="font-medium">R$ {{ selectedNotif?.price?.toFixed(2) }}</span></div>
          <div class="flex justify-between py-2"><span class="text-gray-500">Prazo</span><span class="font-medium">{{ selectedNotif?.deadline }}</span></div>
        </div>
        <button @click="showDetailModal = false" class="btn-primary w-full mt-6 text-center">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '../stores/appStore'

const store = useAppStore()
const showRequestModal = ref(false)
const showDetailModal = ref(false)
const selectedNotif = ref(null)
const requestQty = ref('')
const confirmed = ref(false)

function openRequest(notif) {
  selectedNotif.value = notif
  showRequestModal.value = true
  confirmed.value = false
}

function showDetails(notif) {
  selectedNotif.value = notif
  showDetailModal.value = true
}

function submitRequest() {
  showRequestModal.value = false
  confirmed.value = true
}
</script>

<style scoped>
.animate-scale-in {
  animation: scaleIn 0.2s ease-out;
}
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
