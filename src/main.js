import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueApexCharts from 'vue-apexcharts'

// https://router.vuejs.org/ja/installation.html#npm
// https://router.vuejs.org/ja/guide/#javascript
Vue.use(VueRouter)
const routes = [{ path: '/', component: App }]
const router = new VueRouter({ routes });

// https://apexcharts.com/docs/vue-charts/
Vue.use(VueApexCharts)
Vue.component('apexcharts', VueApexCharts)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
