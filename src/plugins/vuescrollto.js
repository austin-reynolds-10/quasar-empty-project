import VueScrollTo from 'vue-scrollto'

export default ({ app, router, Vue }) => {
  Vue.use(VueScrollTo, {
    container: 'body',
    duration: 500,
    easing: 'ease',
    offset: 0,
    cancelable: true,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
  })
}
