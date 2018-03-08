import Vue from 'vue'
let t = Vue.prototype

export const LOGIN = (state, payload) => {
  t.$log('auth mutation LOGIN', payload)
  state.is_logged_in = true
  state.access_token = payload.access_token
  state.expires_in = payload.expires_in
  state.refresh_token = payload.refresh_token
}

export const LOGOUT = (state) => {
  t.$log('auth mutation LOGOUT')
  state.is_logged_in = false
  state.access_token = null
  state.expires_in = null
  state.refresh_token = null
  t.$axios.defaults.headers.common['Authorization'] = ''
}
