<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav v-if="store.userType" class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span class="text-white font-bold text-lg">A</span>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent">AgroConnect</span>
          </div>
          <div class="flex items-center gap-4">
            <div class="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span class="text-primary-700 font-semibold text-xs">{{ store.userName.charAt(0) }}</span>
              </div>
              <span class="font-medium text-gray-700">{{ store.userName }}</span>
              <span class="badge-green" v-if="store.userType === 'produtor'">Produtor</span>
              <span class="badge-blue" v-else>Comprador</span>
            </div>
            <button @click="handleLogout" class="text-sm text-gray-400 hover:text-red-500 transition-colors font-medium">Sair</button>
          </div>
        </div>
      </div>
      <!-- Sub-navigation -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div class="flex gap-1 py-2 overflow-x-auto">
          <template v-if="store.userType === 'produtor'">
            <router-link to="/produtor" class="nav-tab" active-class="nav-tab-active">Dashboard</router-link>
            <router-link to="/analise" class="nav-tab" active-class="nav-tab-active">Análise Preditiva</router-link>
            <router-link to="/fechamento" class="nav-tab" active-class="nav-tab-active">Fechamento</router-link>
            <router-link to="/roteamento" class="nav-tab" active-class="nav-tab-active">Roteamento</router-link>
          </template>
          <template v-else>
            <router-link to="/comprador" class="nav-tab" active-class="nav-tab-active">Dashboard</router-link>
          </template>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { useAppStore } from './stores/appStore'
import { useRouter } from 'vue-router'

const store = useAppStore()
const router = useRouter()

function handleLogout() {
  store.logout()
  router.push('/')
}
</script>

<style>
.nav-tab {
  @apply px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-all duration-150 whitespace-nowrap;
}
.nav-tab-active {
  @apply bg-primary-50 text-primary-700 !important;
}
</style>
