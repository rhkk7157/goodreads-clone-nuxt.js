import axios from 'axios'
export const state = () => ({
  authUser: null
})

export const mutations = {
  LOGIN(state, user) {
    state.authUser = user
  },
  LOGOUT() {
    console.log('------last')
    state.authUser = null
  },
  SET_USER(state, user) {
    console.log('------------SET_USER')
    console.log(user)
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit는 모든 페이지를 서버 렌더링하기 전에 Nuxt.js에 의해 호출
  // eslint-disable-next-line require-await
  async nuxtServerInit({ commit }, { req, redirect }) {
    console.log('-------check-1')
    console.log(req.session)
    console.log('-------check-2')
    console.log(req.session.authUser)
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    } else {
      console.log('--------0')
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
    console.log('store 로그아웃 클릭')
    await axios.post('/api/auth/signout').then(() => commit('LOGOUT'))
  }
}
