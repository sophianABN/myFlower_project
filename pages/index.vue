<template>
  <div class="container mx-auto px-4 py-8">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-leaf-green mb-2">My Flower</h1>
      <p class="text-xl text-soil-brown">Votre compagnon végétal</p>
    </header>

    <main class="max-w-2xl mx-auto">
      <section class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold text-leaf-green mb-4">Bienvenue sur My Flower !</h2>
        <p class="mb-4">
          Découvrez une nouvelle façon de prendre soin de vos plantes d'intérieur. 
          My Flower vous aide à suivre les besoins en eau de chacune de vos plantes, 
          vous rappelle quand les arroser, et vous offre des conseils personnalisés 
          pour garder votre jardin d'intérieur florissant.
        </p>
        <p>
          Que vous soyez un jardinier novice ou expérimenté, My Flower est l'outil 
          idéal pour vous assurer que vos plantes reçoivent l'attention qu'elles méritent.
        </p>
      </section>

      <div class="flex justify-center space-x-4">
        <nuxt-link to="/register" class="bg-leaf-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          S'inscrire
        </nuxt-link>
        <nuxt-link to="/login" class="bg-sky-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Se connecter
        </nuxt-link>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style scoped>
/* Vous pouvez ajouter des styles spécifiques ici si nécessaire */
</style>