<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav v-if="store.userType" class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center"
                 :style="{ background: `linear-gradient(135deg, var(--theme-primary-600), var(--theme-primary-700))` }">
              <span class="text-white font-bold text-lg">A</span>
            </div>
            <span class="text-xl font-bold"
                  :style="{ backgroundImage: `linear-gradient(to right, var(--theme-primary-700), var(--theme-primary-600))`,
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }">
              FoodConnect
            </span>
          </div>

          <!-- User info -->
          <div class="flex items-center gap-4">
            <div class="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <div class="w-8 h-8 rounded-full flex items-center justify-center"
                   :style="{ backgroundColor: 'var(--theme-primary-50)' }">
                <span class="font-semibold text-xs" :style="{ color: 'var(--theme-primary-700)' }">{{ store.userName.charAt(0) }}</span>
              </div>
              <span class="font-medium text-gray-700">{{ store.userName }}</span>
              <span class="badge-profile">
                {{ profileMeta.icon }} Logado como: {{ profileMeta.label }}
              </span>
            </div>
            <!-- Mobile badge -->
            <span class="badge-profile sm:hidden">
              {{ profileMeta.icon }} {{ profileMeta.label }}
            </span>
            <button @click="handleLogout" class="text-sm text-gray-400 hover:text-red-500 transition-colors font-medium">Sair</button>
          </div>
        </div>
      </div>

      <!-- Sub-navigation -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div class="flex gap-1 py-2 overflow-x-auto">
          <template v-if="store.userType === 'produtor'">
            <router-link to="/produtor" class="nav-tab" :class="{ 'nav-tab-active-themed': $route.path === '/produtor' }">Dashboard</router-link>
            <router-link to="/analise" class="nav-tab" :class="{ 'nav-tab-active-themed': $route.path === '/analise' }">Análise Preditiva</router-link>
            <router-link to="/fechamento" class="nav-tab" :class="{ 'nav-tab-active-themed': $route.path === '/fechamento' }">Fechamento</router-link>
            <router-link to="/roteamento" class="nav-tab" :class="{ 'nav-tab-active-themed': $route.path === '/roteamento' }">Roteamento</router-link>
          </template>
          <template v-else-if="store.userType === 'varejista'">
            <router-link to="/varejista" class="nav-tab" :class="{ 'nav-tab-active-themed': $route.path === '/varejista' }">Dashboard</router-link>
          </template>
          <template v-else-if="store.userType === 'beneficiador'">
            <router-link to="/beneficiador" class="nav-tab" :class="{ 'nav-tab-active-themed': $route.path === '/beneficiador' }">Dashboard</router-link>
          </template>
          <template v-else-if="store.userType === 'transportador'">
            <router-link to="/transportador" class="nav-tab" :class="{ 'nav-tab-active-themed': $route.path === '/transportador' }">Dashboard</router-link>
            <router-link to="/roteamento" class="nav-tab" :class="{ 'nav-tab-active-themed': $route.path === '/roteamento' }">Roteamento</router-link>
          </template>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAppStore } from './stores/appStore'
import { useRouter } from 'vue-router'
import { useTheme } from './composables/useTheme'

const store = useAppStore()
const router = useRouter()
const { applyTheme, clearTheme, getProfileMeta } = useTheme()

const profileMeta = computed(() => getProfileMeta(store.userType))

// Restore session + theme on app mount (handles page refresh)
onMounted(() => {
  store.restoreSession()
  if (store.userType) {
    applyTheme(store.userType)
  }
})

function handleLogout() {
  clearTheme()
  store.logout()
  router.push('/')
}
</script>

<style>
.nav-tab {
  @apply px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-all duration-150 whitespace-nowrap;
}
.nav-tab-active-themed {
  background-color: var(--theme-primary-50) !important;
  color: var(--theme-primary-700) !important;
}
</style>
