<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-4">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl"></div>
    </div>

    <div class="relative w-full max-w-lg">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4 shadow-lg">
          <span class="text-3xl font-bold text-white">A</span>
        </div>
        <h1 class="text-3xl font-bold text-white">FoodConnect</h1>
        <p class="text-gray-400 mt-2 text-sm">Plataforma B2B de Comercialização Agrícola</p>
      </div>

      <!-- Card -->
      <div class="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <h2 class="text-xl font-bold text-gray-800 mb-1">Bem-vindo</h2>
        <p class="text-sm text-gray-500 mb-6">Acesse com o CNPJ da sua empresa</p>

        <form @submit.prevent="doLogin" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
            <input
              v-model="cnpj"
              type="text"
              placeholder="00.000.000/0000-00"
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              v-model="senha"
              type="password"
              placeholder="••••••••"
              class="input-field"
            />
          </div>

          <!-- Account type selector -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Tipo de conta</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                v-for="profile in profiles"
                :key="profile.value"
                type="button"
                @click="tipo = profile.value"
                :class="[
                  'flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                  tipo === profile.value
                    ? `${profile.borderActive} ${profile.bgActive} shadow-md ring-2 ring-offset-1 ${profile.ringActive}`
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                ]"
              >
                <span class="text-2xl">{{ profile.icon }}</span>
                <span
                  class="text-xs font-semibold"
                  :class="tipo === profile.value ? profile.textActive : 'text-gray-600'"
                >{{ profile.label }}</span>
              </button>
            </div>
          </div>

          <button type="submit" class="btn-themed w-full text-center mt-2 py-3 text-base">
            Entrar
          </button>
        </form>

        <div class="mt-6 text-center">
          <a href="#" class="text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors">
            Cadastrar minha empresa →
          </a>
        </div>
      </div>

      <p class="text-center text-gray-500 text-xs mt-6">
        Protótipo ilustrativo — dados simulados
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const store = useAppStore()
const { applyTheme } = useTheme()

const cnpj = ref('12.345.678/0001-90')
const senha = ref('')
const tipo = ref('produtor')

const profiles = [
  {
    value: 'produtor',
    label: 'Produtor',
    icon: '🌾',
    borderActive: 'border-primary-500',
    bgActive: 'bg-primary-50',
    textActive: 'text-primary-700',
    ringActive: 'ring-primary-300',
  },
  {
    value: 'varejista',
    label: 'Varejista',
    icon: '🛒',
    borderActive: 'border-varejista-600',
    bgActive: 'bg-varejista-50',
    textActive: 'text-varejista-700',
    ringActive: 'ring-varejista-200',
  },
  {
    value: 'beneficiador',
    label: 'Beneficiador',
    icon: '🏭',
    borderActive: 'border-beneficiador-600',
    bgActive: 'bg-beneficiador-50',
    textActive: 'text-beneficiador-700',
    ringActive: 'ring-beneficiador-200',
  },
  {
    value: 'transportador',
    label: 'Transportador',
    icon: '🚛',
    borderActive: 'border-transportador-600',
    bgActive: 'bg-transportador-50',
    textActive: 'text-transportador-700',
    ringActive: 'ring-transportador-200',
  },
]

const routeMap = {
  produtor: '/produtor',
  varejista: '/varejista',
  beneficiador: '/beneficiador',
  transportador: '/transportador',
}

function doLogin() {
  store.login(cnpj.value, tipo.value)
  applyTheme(tipo.value)
  router.push(routeMap[tipo.value] || '/')
}
</script>
