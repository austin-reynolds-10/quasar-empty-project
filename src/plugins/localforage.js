import lf from 'localforage'

export default ({ Vue }) => {
  Vue.prototype.$localforage = lf
}
