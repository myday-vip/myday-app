import Vue from 'vue'
import App from './App'

import store from './store'

import today from './pages/today/index.vue'
Vue.component('today',today)
import life from './pages/life/index.vue'
Vue.component('life',life)
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
