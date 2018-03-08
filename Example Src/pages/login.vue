<template>
  <div>
    <q-window-resize-observable @resize="onResize" />
    <login-area v-if="!showForgotPassword" :screenHeight="screenHeight"></login-area>
    <forgot-password-area v-else :screenHeight="screenHeight"></forgot-password-area>
  </div>
</template>

<script>
import LoginArea from 'components/auth/login1'
import ForgotPasswordArea from 'components/auth/forgotPassword1'

export default {
  components: { LoginArea, ForgotPasswordArea },
  data () {
    return {
      screenHeight: 0,
      showForgotPassword: false
    }
  },
  methods: {
    handleWindowResize: function (e) {
      this.$log('Updating Screen Size', window.innerHeight)
      this.screenHeight = window.innerHeight
    },
    onResize (size) {
      this.handleWindowResize()
    },
    showForgotPasswordLink () {
      this.$log('showForgotPassword')
      this.showForgotPassword = true
    }
  },
  beforeDestroy: function () {
    this.$root.$off('showForgotPassword', this.showForgotPasswordLink())
  }
}
</script>
<style lang="stylus" scoped>
</style>

<style lang="stylus">
@import '~variables'
html *
  font-family Helvetica Neue, Helvetica, Roboto, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  font-smoothing antialiased
  font-weight 200
  letter-spacing  0.12rem
  line-height 1.5
.index-adjusted
  z-index 1
  background  rgba(123,133,142,.95)
.logo-height
  max-height 4rem
.input-custom
  height 3rem
  border-width 1px

.card-content-padding-custom
  padding-left    1rem
  padding-right   1rem
.aktext1
  font-family Helvetica
  -webkit-font-smoothing antialiased

@media screen and (min-width $breakpoint-sm) and (max-width $breakpoint-md)
  .card-content-custom
    min-width 390px

.login-box
  max-width 100%
  width 100%

  @media screen and (max-width $breakpoint-sm)
    margin-right 5px

  @media screen and (min-width $breakpoint-sm) and (min-width $breakpoint-md)
    max-width 50%
    width 50%

  @media screen and (min-width $breakpoint-lg)
    max-width 30%
    width 30%

  z-index 1
  .q-input
    border-style solid
    border-color white
    border-radius 3px
    margin-top 0rem
    margin-bottom 1.5rem
  .q-if-inverted
    box-shadow  none
.login-main
  background #FFFFFF url(/statics/login/4.jpg) no-repeat center center
  background-size cover
</style>
