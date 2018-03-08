<template>
  <div class="error-page-custom window-width window-height">
    <div class="row justify-center">
      <q-card class="error-code">
        <h4 class="text-center text-white with-bg">Looks like
          <span class="error-text-name">Chuck Norris</span> broke this page.</h4>
        <h1 class="text-center text-white error-text">404</h1>
        <p class="text-center group">
          <q-btn class="padding-all-1" color="negative" big v-if="canGoBack" push @click.native="goBack">
            <q-icon name="keyboard_arrow_left" class="pad-right-half" size="1em"></q-icon>
            Go back
          </q-btn>
          <q-btn class="padding-all-1" big color="negative" push @click.native="$router.push({name:'myTraining'})" icon-right="home">
            Go home
          </q-btn>
        </p>
      </q-card>
    </div>
  </div>
</template>

<script>
import { QBtn, QIcon, QCard } from 'quasar'
export default {
  components: {
    QBtn,
    QIcon,
    QCard
  },
  data () {
    return {
      canGoBack: window.history.length > 1
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.error-page-custom
  background #0b0d0c url(/statics/testing/page-404.png) no-repeat center center
  background-size cover
  .with-bg
    margin-top 0px
    font-weight 800
    padding-top 15vh
.q-btn
  width 18rem
  font-size 2rem
.error-text-name
  font-size 5rem
.error-text
    font-weight 800
    font-size 9rem
</style>
