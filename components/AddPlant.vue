<template>
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-leaf-green">Ajouter une plante</h2>
        <button 
          @click="toggleForm" 
          class="bg-leaf-green hover:bg-green-600 text-white font-bold py-1 px-2 rounded-full transition duration-300"
        >
          {{ isFormVisible ? 'Fermer' : 'Ouvrir' }}
        </button>
      </div>
      
      <transition name="slide-fade">
        <form v-if="isFormVisible" @submit.prevent="addPlant" class="mt-4" enctype="multipart/form-data">
          <div class="mb-4">
            <label for="name" class="block text-soil-brown font-bold mb-2">Nom</label>
            <input v-model="plant.name" type="text" id="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf-green">
          </div>
          <div class="mb-4">
            <label for="species" class="block text-soil-brown font-bold mb-2">Espèce</label>
            <input v-model="plant.species" type="text" id="species" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf-green">
          </div>
          <div class="mb-4">
            <label for="description" class="block text-soil-brown font-bold mb-2">description</label>
            <input v-model="plant.description" type="text" id="description" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf-green">
          </div>
          <div class="mb-4">
            <label for="purchaseDate" class="block text-soil-brown font-bold mb-2">Date d'achat</label>
            <input v-model="plant.purchaseDate" type="date" id="purchaseDate" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf-green">
          </div>
          <div class="mb-4">
            <label for="waterQuantity" class="block text-soil-brown font-bold mb-2">Quantité d'eau (en ml)</label>
            <input v-model.number="plant.waterNeeds.quantity" type="number" id="waterQuantity" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf-green">
          </div>
          <div class="mb-4">
            <label for="waterFrequency" class="block text-soil-brown font-bold mb-2">Fréquence d'arrosage (en jours)</label>
            <input v-model.number="plant.waterNeeds.frequency" type="number" id="waterFrequency" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf-green">
          </div>
          <div class="mb-4">
            <label for="image" class="block text-soil-brown font-bold mb-2">Image de la plante</label>
            <input type="file" id="image" @change="onFileSelected" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf-green">
          </div>
          <button type="submit" class="w-full bg-leaf-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Ajouter la plante
          </button>
        </form>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isFormVisible: false,
        plant: {
          name: '',
          species: '',
          description: '',
          purchaseDate: '',
          waterNeeds: {
            quantity: '',
            frequency: ''
          }
        },
        selectedFile: null
      }
    },
    methods: {
      toggleForm() {
        this.isFormVisible = !this.isFormVisible;
      },
      onFileSelected(event) {
        this.selectedFile = event.target.files[0];
      },
      async addPlant() {
        try {
          const formData = new FormData();
          formData.append('name', this.plant.name);
          formData.append('species', this.plant.species);
          formData.append('description', this.plant.description);
          formData.append('purchaseDate', this.plant.purchaseDate);
          formData.append('waterNeeds[quantity]', this.plant.waterNeeds.quantity);
          formData.append('waterNeeds[frequency]', this.plant.waterNeeds.frequency);
          if (this.selectedFile) {
            formData.append('image', this.selectedFile, this.selectedFile.name);
          }
  
          const response = await this.$axios.$post('/api/plants/add', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Plante ajoutée:', response);
          // Réinitialiser le formulaire
          this.plant = {
            name: '',
            species: '',
            description: '',
            purchaseDate: '',
            waterNeeds: {
              quantity: '',
              frequency: ''
            }
          };
          this.selectedFile = null;
          this.isFormVisible = false;
          // Émettre un événement pour informer le parent qu'une plante a été ajoutée
          this.$emit('plant-added', response);
        } catch (error) {
          console.error('Erreur lors de l\'ajout de la plante:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
  </style>