<template>
  <div id="page-login-styles" class="login-main" v-bind:style="{ 'height': + screenHeight + 'px' }">
    <div class="docs-input row full-height justify-center items-center">
      <div class="login-box">
        <q-card class="card-content-custom card-content-padding-custom index-adjusted vertical-middle" absolute>
          <q-card-title align="center">
            <img src="~assets/general/logos/midstates-logo-red-white.png" class="logo-height">
          </q-card-title>
          <q-card-main>
            <q-input
              placeholder="Email"
              v-model.trim="email"
              inverted
              class="transparent aktext1 input-custom"
              type="email"
              required />
          </q-card-main>

          <q-alert
            v-show="showError"
            color="red"
            icon="pan tool"
            enter="bounceInLeft"
            leave="bounceOutRight"
            appear
            dismissible
            class="forgotAlert"
          >
            {{ errorMsg }}
          </q-alert>

          <q-card-actions>
            <q-btn
              big
              loader
              type="submit"
              class="full-width"
              color="blue"
              v-model="sendingEmail"
              @click.native.prevent="submitForgotBtn">
                  Send Password Reset
              <span slot="loading">
                <q-spinner-tail class="on-left" />
                  Sending Email...
              </span>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ForgotPassword',
  props: ['screenHeight'],
  data () {
    return {
      showError: false,
      errorMsg: '',
      sendingEmail: false,
      email: ''
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated'
    })
  },
  methods: {
    ...mapActions({
      resetPassword: 'auth/resetPassword',
      getUser: 'auth/getUser'
    }),

    submitForgotBtn: function (e) {
      this.sendingEmail = true
      this.showError = false
      this.errorMsg = ''

      this.$log('submitForgotBtn trying to send reset')
      this.resetPassword({
        'email': this.email
      }).then(response => {
        this.$log('submitForgotBtn', response)
        this.getUser().then(() => {
          this.$log('submitForgotBtn email sent')
          // this.$router.push({ name: 'myTraining' })
          // TODO: Send back to the login page with success message
        })
      }).catch((error) => {
        this.$log('submitForgotBtn email error', error)

        if (error.status === 500) {
          this.errorMsg = 'Server could not complete the request at this time.'
        } else {
          this.errorMsg = 'Invalid Email'
        }

        this.showError = true
        this.sendingEmail = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.forgotAlert
    padding 8px
</style>

<style lang="stylus">
</style>
