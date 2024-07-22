export default function ({ store, redirect }) {
  // Si l'utilisateur n'est PAS authentifié
  if (!store.state.auth.token) {
    return redirect('/login')
  }
  // Si l'utilisateur est authentifié, ne rien faire et laisser la navigation continuer
}

