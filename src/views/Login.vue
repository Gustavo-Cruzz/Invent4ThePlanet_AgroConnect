<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-4">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4 shadow-lg">
          <span class="text-3xl font-bold text-white">A</span>
        </div>
        <h1 class="text-3xl font-bold text-white">AgroConnect</h1>
        <p class="text-primary-200 mt-2 text-sm">Plataforma B2B de Comercialização Agrícola</p>
      </div>

      <!-- Card -->
      <div class="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <h2 class="text-xl font-bold text-gray-800 mb-1">Bem-vindo</h2>
        <p class="text-sm text-gray-500 mb-6">Acesse com o CNPJ da sua empresa</p>

        <form @submit.prevent="doLogin" class="space-y-4">
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

          <!-- Account type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de conta</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="tipo = 'produtor'"
                :class="[
                  'flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                  tipo === 'produtor'
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <span class="text-2xl">🌾</span>
                <span class="text-sm font-semibold" :class="tipo === 'produtor' ? 'text-primary-700' : 'text-gray-600'">Produtor</span>
              </button>
              <button
                type="button"
                @click="tipo = 'comprador'"
                :class="[
                  'flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                  tipo === 'comprador'
                    ? 'border-accent-500 bg-accent-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <span class="text-2xl">🛒</span>
                <span class="text-sm font-semibold" :class="tipo === 'comprador' ? 'text-accent-700' : 'text-gray-600'">Comprador</span>
              </button>
            </div>
          </div>

          <button type="submit" class="btn-primary w-full text-center mt-2">
            Entrar
          </button>
        </form>

        <div class="mt-6 text-center">
          <a href="#" class="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors">
            Cadastrar minha empresa →
          </a>
        </div>
      </div>

      <p class="text-center text-primary-200 text-xs mt-6">
        Protótipo ilustrativo — dados simulados
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'

const router = useRouter()
const store = useAppStore()

const cnpj = ref('12.345.678/0001-90')
const senha = ref('')
const tipo = ref('produtor')

function doLogin() {
  store.login(cnpj.value, tipo.value)
  if (tipo.value === 'produtor') {
    router.push('/produtor')
  } else {
    router.push('/comprador')
  }
}
</script>
