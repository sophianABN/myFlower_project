<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div v-for="plant in plants" :key="plant._id" class="plant-card" @click="openPlantDetails(plant._id)">
      <div class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <img :src="getImageUrl(plant.image)" :alt="plant.name" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-semibold text-soil-brown mb-2">{{ plant.name }}</h3>
          <p class="text-gray-600 mb-2">{{ plant.species }}</p>
          <p class="text-sm text-leaf-green font-medium">
            Prochain arrosage : {{ getNextWateringDate(plant) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    plants: {
      type: Array,
      required: true
    }
  },
  methods: {
    getImageUrl(imageName) {
      return imageName ? `${process.env.API_URL}/uploads/${imageName}` : '/placeholder-plant.png';
    },
    openPlantDetails(plantId) {
      this.$router.push(`/plant/${plantId}`);
    },
    getNextWateringDate(plant) {
      if (!plant.lastWatered || !plant.waterNeeds || !plant.waterNeeds.frequency) {
        return 'Non défini';
      }

      const lastWatered = new Date(plant.lastWatered);
      const nextWatering = new Date(lastWatered.getTime() + plant.waterNeeds.frequency * 24 * 60 * 60 * 1000);
      
      const today = new Date();
      const diffTime = nextWatering - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        return 'En retard';
      } else if (diffDays === 0) {
        return 'Aujourd\'hui';
      } else if (diffDays === 1) {
        return 'Demain';
      } else {
        return `Dans ${diffDays} jours`;
      }
    }
  }
}
</script>