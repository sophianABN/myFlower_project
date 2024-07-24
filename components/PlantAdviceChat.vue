<template>
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold text-leaf-green mb-4">Conseils pour vos plantes</h2>
      <div class="mb-4 h-64 overflow-y-auto bg-gray-100 p-4 rounded">
        <div v-for="(message, index) in chatHistoryf" :key="index" class="mb-2">
          <strong>{{ message.role === 'user' ? 'Vous' : 'Assistant' }}:</strong> {{ message.content }}
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="flex">
        <input v-model="userInput" type="text" placeholder="Posez votre question sur les plantes..." 
               class="flex-grow mr-2 p-2 border rounded">
        <button type="submit" class="bg-leaf-green text-white px-4 py-2 rounded hover:bg-green-600">Envoyer</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userInput: '',
        chatHistory: [{role: 'system', content: 'tu es un spécialiste de la botanique et a de tres vastes connaissance sur l\'entretien des plantes exterieur et interieur. Tu reponds seulement à user si la question est en relation avec les plantes, sinon tu lui repond poliment que tu n\'est pas compétent'}]
      }
    },
    computed: {
        chatHistoryf() {
            return this.chatHistory.filter((e) => e.role!='system')
        }
    },
    methods: {
      async sendMessage() {
        if (!this.userInput.trim()) return;
  
        // Ajouter le message de l'utilisateur à l'historique
        this.chatHistory.push({ role: 'user', content: this.userInput });
  
        try {
          const response = await this.$axios.$post('/api/chatgpt', {
            messages: this.chatHistory
          });
  
          // Ajouter la réponse de l'assistant à l'historique
          this.chatHistory.push({ role: 'assistant', content: response.reply });
  
        } catch (error) {
          console.error('Erreur lors de la communication avec le serveur:', error);
          this.chatHistory.push({ role: 'assistant', content: "Désolé, je n'ai pas pu obtenir de réponse. Veuillez réessayer." });
        }
  
        // Réinitialiser l'entrée utilisateur
        this.userInput = '';
      }
    }
  }
  </script>