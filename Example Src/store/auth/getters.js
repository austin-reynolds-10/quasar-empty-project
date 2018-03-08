import Vue from 'vue'
let t = Vue.prototype

export const authenticated = (state) => {
  return state.is_logged_in
}

export const accessToken = (state) => {
  return state.access_token
}

export const refreshToken = (state) => {
  return state.refresh_token
}

export const expiresIn = (state) => {
  return state.expires_in
}

export const user = (state) => {
  return state.user
}

export const userProperties = (state) => {
  return state.user.properties
}

export const userPermissions = (state) => {
  return state.user.permissions
}

export const avatars = (state) => {
  return state.avatars
}
