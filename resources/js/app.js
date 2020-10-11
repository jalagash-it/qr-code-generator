import Vue from 'vue';
import VueRouter from 'vue-router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueRouter)

import App from './views/App.vue'
const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('./views/Home.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('./views/Login.vue'),
        },
      
    ],
});

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')