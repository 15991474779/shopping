// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import DetailPage from './pages/DetailPage'
import OrderListPage from './pages/OrderListPage'
import CountDetailPage from './pages/details/CountDetailPage'
import ForecastDetailPage from './pages/details/ForecastDetailPage'
import AnalysisDetailPage from './pages/details/AnalysisDetailPage'
import PublishDetailPage from './pages/details/PublishDetailPage'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    }, 
    {
      path: '/orderList',
      component: OrderListPage
    },
    {
      path: '/detail',
      component: DetailPage,
      redirect: '/detail/analysis',
      children: [
        { path: 'analysis', component: AnalysisDetailPage },
        { path: 'count', component: CountDetailPage },
        { path: 'forecast', component: ForecastDetailPage },
        { path: 'publish', component: PublishDetailPage }
      ]
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { Layout },
  template: '<Layout/>'
})
