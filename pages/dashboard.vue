<template>
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-leaf-green">Tableau de bord</h1>
        <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Déconnexion
        </button>
      </div>
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold text-soil-brown mb-4">Profil de l'utilisateur</h2>
        <div v-if="user">
          <p><strong>Email :</strong> {{ user.email }}</p>
          <p><strong>Pseudo :</strong> {{ user.pseudo }}</p>
        </div>
        <div v-else>
          Chargement du profil...
        </div>
      </div>
      <div class="mb-8">
        <AddPlant @plant-added="fetchPlants" />
      </div>
      <div>
        <h2 class="text-2xl font-semibold text-soil-brown mb-4">Mes plantes</h2>
        <PlantList :plants="plants" />
      </div>
    </div>
  </template>
  
  <script>
  import AddPlant from '@/components/AddPlant.vue'
  import PlantList from '@/components/PlantList.vue'
  
  export default {
    name: 'DashboardPage',
    components: {
      AddPlant,
      PlantList
    },
    middleware: 'auth',
    data() {
      return {
        user: null,
        plants: []
      }
    },
    async mounted() {
      await this.fetchUserProfile()
      await this.fetchPlants()
    },
    methods: {
      async fetchUserProfile() {
        try {
          const response = await this.$axios.$get('/api/user/profile')
          this.user = response.user
        } catch (error) {
          console.error('Erreur lors du chargement du profil:', error)
        }
      },
      async fetchPlants() {
        try {
          this.plants = await this.$axios.$get('/api/plants')
        } catch (error) {
          console.error('Erreur lors du chargement des plantes:', error)
        }
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