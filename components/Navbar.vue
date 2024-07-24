<template>
<nav class="bg-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex items-center space-x-7">
          <!-- Logo -->
          <nuxt-link to="/" class="flex items-center ">
            <div class="flex-shrink-0">
              <img src="~/assets/myFlower_logo.png" alt="Logo" class="h-full w-full max-h-12 object-contain">
            </div>
          </nuxt-link>
        </div>
          <!-- Secondary Navbar items -->
          <div class="hidden md:flex items-center space-x-3">
            <template v-if="!isLoggedIn">
              <nuxt-link to="/login" class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Se Connecter</nuxt-link>
              <nuxt-link to="/register" class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">S'inscrire</nuxt-link>
            </template>
            <template v-else>
              <div class="relative">
                <button @click="toggleDropdown" class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">
                  <i class="fas fa-user"></i>
                </button>
                <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                  <nuxt-link to="/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</nuxt-link>
                  <a @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</a>
                </div>
              </div>
            </template>
          </div>
          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button @click="toggleMobileMenu" class="outline-none mobile-menu-button">
              <svg class="w-6 h-6 text-gray-500 hover:text-green-500"
                x-show="!showMenu"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Mobile menu -->
      <div :class="{'hidden': !showMobileMenu}" class="md:hidden">
        <template v-if="!isLoggedIn">
          <nuxt-link to="/login" class="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Log In</nuxt-link>
          <nuxt-link to="/register" class="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Sign Up</nuxt-link>
        </template>
        <template v-else>
          <nuxt-link to="/profile" class="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Profile</nuxt-link>
          <nuxt-link to="/dashboard" class="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Dashboard</nuxt-link>
          <a @click="logout" class="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300 cursor-pointer">Logout</a>
        </template>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showMobileMenu: false,
        showDropdown: false
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.auth.token !== null
      }
    },
    methods: {
      toggleMobileMenu() {
        this.showMobileMenu = !this.showMobileMenu
      },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown
      },
      async logout() {
        try {
          await this.$store.dispatch('auth/logout')
          this.$router.push('/login')
        } catch (error) {
          console.error('Erreur lors de la déconnexion:', error)
        }
      }
    }
  }
  </script>

<style scoped>
.logo-container {
  width: 32px; /* ou la taille que vous voulez */
  height: 32px; /* ou la taille que vous voulez */
}

.logo-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>