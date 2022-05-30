import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    }
  },
  actions: {
    // 在 actions 中可以透過參數的方式取得 commit 的方法
    async fetchCurrentUser({ commit }) {
      try {
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來 (確認data中有登入使用者的資料)
        // const response = await usersAPI.getCurrentUser()
        // console.log('response', response)
        const {data} = await usersAPI.getCurrentUser()

        const {id, name, email, image, isAdmin} = data

        commit('setCurrentUser', { id, name, email, image,  isAdmin})
      } catch (error) {
        console.error(error.message)
      }
    }
  },
  modules: {
  }
})
