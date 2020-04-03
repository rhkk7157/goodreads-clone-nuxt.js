import axios from 'axios'
export const state = () => ({
  authUser: null
})

export const mutations = {
  LOGIN(state, user) {
    console.log(user)
    state.authUser = user
  },
  LOGOUT() {
    state.authUser = null
  },
  SET_USER(state, user) {
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit는 모든 페이지를 서버 렌더링하기 전에 Nuxt.js에 의해 호출
  // eslint-disable-next-line require-await
  async nuxtServerInit({ commit }, { req, redirect }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    } else {
      commit('LOGOUT')
    }
  },
  async login({ commit }, { id, password }) {
    const { data } = await axios.post('/api/auth/signin', {
      id,
      password
    })
    commit('LOGIN', data)
  },
  async logout({ commit }) {
    await axios.post('/api/auth/signout').then(() => commit('LOGOUT'))
  }
}
