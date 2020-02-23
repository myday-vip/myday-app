import Vue from 'vue'
import App from './App'

import today from './pages/today/index.vue'
Vue.component('today',today)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
