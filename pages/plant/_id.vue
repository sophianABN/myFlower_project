<template>
    <div class="container mx-auto px-4 py-8">
      <button @click="$router.push('/dashboard')" class="mb-6 bg-leaf-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
        Retour au Dashboard
      </button>
      <div v-if="plant" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="md:flex">
          <div class="md:w-1/2">
            <img :src="getImageUrl(plant.image)" :alt="plant.name" class="w-full h-64 md:h-full object-cover">
          </div>
          <div class="md:w-1/2 p-6">
            <h1 class="text-3xl font-bold text-soil-brown mb-4">{{ plant.name }}</h1>
            <p class="text-xl text-gray-600 mb-4">{{ plant.species }}</p>
            <p class="text-xl text-gray-600 mb-4">{{ plant.description }}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h2 class="text-lg font-semibold text-leaf-green">Besoins en eau</h2>
                <p>{{ plant.waterNeeds.quantity }} ml tous les {{ plant.waterNeeds.frequency }} jours</p>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-leaf-green">Date d'achat</h2>
                <p>{{ formatDate(plant.purchaseDate) }}</p>
              </div>
            </div>
            <div class="mb-6">
              <h2 class="text-lg font-semibold text-leaf-green mb-2">Historique d'arrosage</h2>
              <ul v-if="plant.wateringHistory && plant.wateringHistory.length" class="max-h-40 overflow-y-auto">
                <li v-for="(watering, index) in plant.wateringHistory" :key="index" class="mb-1">
                  {{ formatDate(watering.date) }} - {{ watering.quantity }} ml
                </li>
              </ul>
              <p v-else class="text-gray-600">Aucun historique d'arrosage disponible.</p>
            </div>
            <button @click="waterPlant" class="w-full sm:w-auto bg-sky-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Arroser la plante
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-leaf-green"></div>
        <p class="mt-2">Chargement...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        plant: null
      }
    },
    async fetch() {
      try {
        this.plant = await this.$axios.$get(`/api/plants/${this.$route.params.id}`);
      } catch (error) {
        console.error('Erreur lors du chargement de la plante:', error);
      }
    },
    methods: {
      getImageUrl(imageName) {
        return imageName ? `${process.env.API_URL}/uploads/${imageName}` : '/placeholder-plant.png';
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      async waterPlant() {
        try {
          await this.$axios.$post(`/api/plants/${this.plant._id}/water`);
          // Recharger les données de la plante après l'arrosage
          this.$fetch();
        } catch (error) {
          console.error('Erreur lors de l\'arrosage de la plante:', error);
        }
      }
    }
  }
  </script>