import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import AppCommande from './component/app-commande.vue';
import AppMenu from './component/app-menu-restaurant.vue';
import AppDetail from './component/app-restau-detail.vue';

Vue.use(VueRouter);
 
 
const routes = [
 
    {path:'/AppCommande', component: AppCommande},
 
    {path:'/AppMenu', component: AppMenu},

    {path:'/AppDetail', component: AppDetail},
 
]
 
const router = new VueRouter({
 
    routes: routes,
 
    mode:'history'
 
})

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
