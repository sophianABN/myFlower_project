<template>
    <div class="h-screen flex flex-col">
      <Navbar />
      <Nuxt />
    </div>
  </template>
  
  <script>
  import Navbar from '~/components/Navbar.vue'
  
  export default {
    components: {
      Navbar
    }
  }
  </script>