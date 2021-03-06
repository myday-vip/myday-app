import Vue from 'vue'
import App from './App'

import store from './store'

import mainToday from './pages/today/index.vue'
Vue.component('mainToday',mainToday)
import today from './pages/today/today.vue'
Vue.component('today',today)
import eventCreate from './pages/today/event-create.vue'
Vue.component('event-create',eventCreate)
import eventupdate from './pages/today/event-update.vue'
Vue.component('event-update',eventupdate)

import life from './pages/life/index.vue'
Vue.component('life',life)
import my from './pages/my/index.vue'
Vue.component('my',my)
import cuCustom from './components/pro/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
