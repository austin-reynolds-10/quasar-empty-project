import axios from 'axios'

export default ({ app, store, router, Vue }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: Vue.prototype.$consts.API_URL
  })

  // Global response checker. If we ever get a 401 returned we'll send them to the logout function.
  Vue.prototype.$axios.interceptors.response.use(function (response) {
    Vue.prototype.$log('Axios INTERCEPT', response)
    if (response.status === 401 || response.status === 500) {
    }
    return response
  }, function (error) {
    Vue.prototype.$log('Axios INTERCEPT Error', JSON.parse(JSON.stringify(error)))
    return Promise.reject(error)
  })
}
