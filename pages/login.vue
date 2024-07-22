<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-leaf-green text-center mb-8">Connexion</h1>
        <form @submit.prevent="login" class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div class="mb-4">
                <label for="email" class="block text-soil-brown font-bold mb-2">Email</label>
                <input v-model="email" type="email" id="email" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-blue">
            </div>
            <div class="mb-6">
                <label for="password" class="block text-soil-brown font-bold mb-2">Mot de passe</label>
                <input v-model="password" type="password" id="password" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-blue">
            </div>
            <button type="submit"
                class="w-full bg-sky-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 mb-4">
                Se connecter
            </button>
            <p class="text-center text-gray-600">
                Pas encore de compte ? 
                <nuxt-link to="/register" class="text-sky-blue hover:underline">S'inscrire</nuxt-link>
            </p>
        </form>
    </div>
</template>


<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            try {
                const response = await this.$axios.$post('/api/auth/login', {
                    email: this.email,
                    password: this.password
                })
                this.$store.commit('auth/setToken', response.token)
                this.$axios.setToken(response.token, 'Bearer')
                await this.$store.dispatch('auth/fetchUser')
                console.log('Login réussi, redirection vers le tableau de bord')
                this.$router.push('/dashboard', () => {
                    console.log('Redirection effectuée')
                }, (error) => {
                    console.error('Erreur lors de la redirection:', error)
                })
            } catch (error) {
                console.error('Erreur lors de la connexion:', error)
            }
        }
    }
}
</script>