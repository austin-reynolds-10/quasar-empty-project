import store from '../'
import Vue from 'vue'
let t = Vue.prototype

export default {
  methods: {
    isAllowed: function (requiredPerms) {
      if (!store.getters['auth/accessToken']) {
        return false
      }

      var userPerms = store.getters['auth/user'].permissions
      _.remove(requiredPerms, function (n) {
        return n === 'DEFAULT'
      })

      t.$log('Checking users permissions', {
        User_Roles: userPerms,
        Required_Permissions: requiredPerms
      })
      // log('Differences', _.difference(requiredPerms, userPerms))
      if (_.difference(requiredPerms, userPerms).length === 0) {
        return true
      } else {
        return false
      }
    }
  }
}
