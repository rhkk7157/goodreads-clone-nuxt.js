import _ from 'lodash'

export default async function({ store, redirect, error, route, app }) {
  if (route.path !== '/signin') {
    const r = await app.$axios.get('/api/auth/session')
    const session = _.get(r, 'data')
    if (!session || !store.state.authUser) {
      redirect('/signin')
    }
  }
}
