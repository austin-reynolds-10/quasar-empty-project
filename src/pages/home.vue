<template class="theme-default">
  <div class="center-page center">
    <div>
      <h1>Quasar Rocks</h1>
    </div>
    <div>
      <small>Mid-States Empty Project</small>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  methods: {
  },
  created: function () {
    this.$log('Home Created')
  },
  beforeDestroy: function () {
    this.$log('Home Before Destroyed')
  }
}
</script>
<style lang="stylus" scoped>
  .center-page
    height 300px
    width 100%
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    margin auto
</style>

<style lang="stylus">
</style>
