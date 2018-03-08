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
              v-model.trim="creds.email"
              inverted
              v-bind:class="{ 'form-error': $v.creds.email.$error }"
              class="transparent aktext1 input-custom"
              type="email"
              @blur="$v.creds.email.$touch()"/>
            <span class="form-message" v-if="!$v.creds.email.required && $v.creds.email.$dirty">Field is required</span>
            <span class="form-message" v-if="!$v.creds.email.email && $v.creds.email.$dirty">Field must be a valid email address</span>
            <div>&nbsp;</div>
            <q-input
              placeholder="Password"
              v-model="creds.password"
              inverted
              required
              v-bind:class="{ 'form-error': $v.creds.password.$error }"
              class="transparent aktext1 input-custom"
              type="password"
              @keyup.enter="submitLoginBtn()"
              @blur="$v.creds.password.$touch()"/>
            <span class="form-message" v-if="!$v.creds.password.required && $v.creds.password.$dirty">Field is required</span>
            <div>&nbsp;</div>
          </q-card-main>

          <q-alert
            v-show="showError"
            color="red"
            icon="pan tool"
            enter="bounceInLeft"
            leave="bounceOutRight"
            appear
            dismissible
            class="loginAlert"
          >
            {{ errorMsg }}
          </q-alert>

          <q-card-actions>
            <q-btn
              big
              :loading="loggingIn"
              type="submit"
              class="full-width"
              color="blue"
              @click.native.prevent="submitLoginBtn">
                  LOG IN
              <span slot="loading">
                <q-spinner class="on-left" />
                  Logging In...
              </span>
            </q-btn>
          </q-card-actions>
          <br/>
          <q-card-actions class="justify-end">
            <a class="text-white aktext1" @click.native.prevent="showForgotPassword()">Forgot Password?</a>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ForgotPassword',
  props: ['screenHeight'],
  data () {
    return {
      showError: false,
      errorMsg: '',
      loggingIn: false,
      creds: {
        email: 'johndoe@midstates.com',
        password: 'Secret'
        // email: null,
        // password: null
      }
    }
  },
  validations: {
    creds: {
      email: { required, email },
      password: { required }
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated'
    })
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      getUser: 'auth/getUser'
    }),

    submitLoginBtn: function (e) {
      this.$log('VUELIDATE', this.$v)

      if (this.$v.$invalid) {
        setTimeout(() => {
          this.loggingIn = false
        }, 100)
        return true
      }

      this.loggingIn = true
      this.showError = false
      this.errorMsg = ''

      this.$log('submitLoginBtn trying to login')
      this.login(this.creds).then(response => {
        this.$log('submitLoginBtn', response)
        this.getUser().then(() => {
          this.$log('submitLoginBtn sending to myTraining')
          this.$router.push({
            name: 'myTraining'
          })
        })
      }).catch((error) => {
        this.$log('submitLoginBtn login error', error)

        if (error.status !== 403) {
          this.errorMsg = 'Login Service Unavailable'
          this.showError = true
          this.loggingIn = false
        } else {
          this.errorMsg = 'Invalid Username or Password'
          this.showError = true
          this.loggingIn = false
        }
      })
    },

    showForgotPassword: function (e) {
      this.$root.$emit('showForgotPassword')
    }
  }
}
</script>

<style lang="stylus" scoped>
.loginAlert
    padding 8px
.login-box .q-input
  margin-bottom 0 !important
.form-message
  color #a00000 !important
</style>

<style lang="stylus">
</style>
