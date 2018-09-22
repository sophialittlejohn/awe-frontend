import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import store from './store'
import router from './router'
import {baseUrl} from './store/types'
import baseUrlPlugin from './plugins/baseUrl'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(baseUrlPlugin)
Vue.http.options.root = baseUrl;
Vue.http.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
