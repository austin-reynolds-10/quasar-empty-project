import Vue from 'vue'
let t = Vue.prototype

export const login = ({ commit }, payload) => {
  t.$log({
    msg: 'auth actions login',
    payload
  })
  return new Promise((resolve, reject) => {
    t.$axios.post(t.$consts.AUTH_LOGIN_URL, payload).then((response) => {
      t.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token
      t.$log('auth actions Login Response', response)
      commit(t.$mtypes.LOGIN, response.data)
      resolve(response)
    }).catch((error) => {
      t.$log('auth actions login Error', error)

      if (error.response.status === 403) {
        t.$log('auth actions Login Invalid Credentials')
        reject(error.response)
      } else {
        t.$log('auth actions Login Unkown Server Error')
        reject(error.response)
      }
    })
  })
}

export const isLoggedIn = ({ state, commit }) => {
  t.$log({
    msg: 'auth actions isLoggedIn'
  })

  return new Promise((resolve, reject) => {
    t.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.access_token

    // Pull in the local token to check.
    if (!JSON.parse(window.localStorage.vuex).auth.access_token) {
      reject(new Error('No session data found.'))
    }

    var lsToken = JSON.parse(window.localStorage.vuex).auth.access_token
    if (lsToken !== state.access_token) {
      // t.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + lsToken// Just for testing
      reject(new Error('Session has been messed with')) // Go ahead and just log them out if we see foul play
    }

    t.$axios.get(t.$consts.IS_LOGGED_IN_URL).then((response) => {
      t.$log('auth actions isLoggedIn Response', response)
      resolve(response)
    }).catch((error) => {
      t.$log('auth actions isLoggedIn Error', error)
      reject(error.response)
    })
  })
}

export const refreshToken = ({ state, commit }) => {
  t.$log('auth actions refresh token')
  return new Promise((resolve, reject) => {
    t.$axios.post(t.$consts.REFRESH_TOKEN_URL, {
      'refresh_token': state.refresh_token
    }).then((response) => {
      t.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token
      t.$log('auth actions Refresh Token Response', response)
      commit(t.$mtypes.LOGIN, response.data)
      resolve(response)
    }).catch((error) => {
      t.$log('auth actions Refresh Token Error', error)
      if (error.response.status === 401) {
        t.$log('auth actions Refresh Token Not Authorized')
        reject(error.response)
      } else {
        t.$log('auth actions Refresh Token Unkown Server Error')
        reject(error.response)
      }
    })
  })
}

export const logout = ({ commit }) => {
  t.$log('auth actions logout')
  return new Promise((resolve, reject) => {
    t.$axios.post(t.$consts.LOGOUT_URL).then((response) => {
      t.$log('auth actions logout Response', response)
    }).catch((error) => {
      t.$log('auth actions Logout Error', error)
    }).then(() => {
      commit(t.$mtypes.LOGOUT)
      resolve()
    })
  })
}
