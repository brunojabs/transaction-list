// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VeeValidate from 'vee-validate'
import dict from './locale/validateDict'

Vue.use(VeeValidate, { events: 'blur' })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  beforeCreate () {
    this.$validator.localize('en', dict)
  },
  router,
  components: { App },
  template: '<App/>'
})
