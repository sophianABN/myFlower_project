<template>
  <div class="container bg-[url('/bg_garden.png')] bg-cover h-full mx-auto px-4 py-8 flex item-center">
    <main class="max-w-2xl m-auto">
      <section class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl text-center font-semibold text-leaf-green mb-4">Bienvenue sur My Flower !</h2>
        <p class="text-xl text-center text-soil-brown mb-4">Votre compagnon végétal</p>

        <p class="mb-4">
          Découvrez une nouvelle façon de prendre soin de vos plantes. 
          My Flower vous aide à suivre les besoins en eau de chacune de vos plantes, 
          vous rappelle quand les arroser, et vous offre des conseils personnalisés 
          pour garder votre jardin d'intérieur florissant.
        </p>
        <p>
          Que vous soyez un jardinier novice ou expérimenté, My Flower est l'outil 
          idéal pour vous assurer que vos plantes reçoivent l'attention qu'elles méritent.
        </p>
      </section>

      <div class="flex justify-center space-x-6 mt-12 text-xl">
    <a href="#" class="text-gray-100 hover:text-leaf-green transition-colors duration-300">
      <font-awesome-icon :icon="['fab', 'facebook-f']" size="1x" />
    </a>
    <a href="#" class="text-gray-100 hover:text-leaf-green transition-colors duration-300">
      <font-awesome-icon :icon="['fab', 'twitter']" size="1x" />
    </a>
    <a href="#" class="text-gray-100 hover:text-leaf-green transition-colors duration-300">
      <font-awesome-icon :icon="['fab', 'instagram']" size="1x" />
    </a>
    <a href="#" class="text-gray-100 hover:text-leaf-green transition-colors duration-300">
      <font-awesome-icon :icon="['fab', 'pinterest-p']" size="1x" />
    </a>
  </div>
    </main>

</div>

</template>

<script>

export default {
  name: 'IndexPage',  

}
</script>

<style scoped>
/* Vous pouvez ajouter des styles spécifiques ici si nécessaire */
</style>