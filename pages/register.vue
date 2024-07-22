<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-leaf-green text-center mb-8">Inscription</h1>
        <form @submit.prevent="register" class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div class="mb-4">
                <label for="email" class="block text-soil-brown font-bold mb-2">Email</label>
                <input v-model="email" type="email" id="email" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf-green">
            </div>
            <div class="mb-4">
                <label for="pseudo" class="block text-soil-brown font-bold mb-2">Pseudo</label>
                <input v-model="pseudo" type="text" id="pseudo" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf-green">
            </div>
            <div class="mb-6">
                <label for="password" class="block text-soil-brown font-bold mb-2">Mot de passe</label>
                <input v-model="password" type="password" id="password" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leaf-green">
            </div>
            <button type="submit"
                class="w-full bg-leaf-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 mb-4">
                S'inscrire
            </button>
            <p class="text-center text-gray-600">
                Déjà un compte ? 
                <nuxt-link to="/login" class="text-leaf-green hover:underline">Se connecter</nuxt-link>
            </p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'RegisterPage',
    data() {
        return {
            email: '',
            pseudo: '',
            password: ''
        }
    },
    methods: {
        async register() {
            try {
                const response = await this.$axios.$post('/api/auth/register', {
                    email: this.email,
                    pseudo: this.pseudo,
                    password: this.password
                })
                
                this.$store.commit('auth/setToken', response.token)
                await this.$store.dispatch('auth/fetchUser') 

                this.$router.push('/dashboard')
            } catch (error) {
                console.error('Erreur lors de linscription:', error)
            }
        }
    }
}
</script>