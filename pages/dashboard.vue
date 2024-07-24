<template>
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-leaf-green">Tableau de bord</h1>
      
      </div>
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold text-soil-brown mb-4">Mon Profil</h2>
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
      <PlantAdviceChat />

    </div>
  </template>
  
  <script>
  import AddPlant from '@/components/AddPlant.vue'
  import PlantList from '@/components/PlantList.vue'
  import PlantAdviceChat from '~/components/PlantAdviceChat.vue'

  
  export default {
    name: 'DashboardPage',
    components: {
      AddPlant,
      PlantList,
      PlantAdviceChat

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
      
    }
  }
  </script>