// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, Row, Col, Search, Swipe, SwipeItem, Lazyload ,List,Field,NavBar,Tabs, Tab ,PullRefresh,stepper,Tabbar, TabbarItem ,Cell, CellGroup} from 'vant'

Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Tabs).use(Tab).use(PullRefresh).use(stepper).use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
