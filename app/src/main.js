import Vue from 'vue'
import VueResource from 'vue-resource'
import VueScrollTo from 'vue-scrollto'
import App from './App.vue'
import store from './store'
import router from './router/router'
import {baseUrl} from './store/types'
import baseUrlPlugin from './plugins/baseUrl'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(baseUrlPlugin);
Vue.use(VueClipboard);
Vue.use(VueScrollTo)

Vue.http.options.root = baseUrl;
Vue.http.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
