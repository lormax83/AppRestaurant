import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import AppCommande from './component/app-commande';
import AppMenu from './component/app-menu-restaurant';
import AppDetail from './component/app-restau-detail';

Vue.use(VueRouter);
 
 
const routes = [
 
    {path:'/AppCommande', component: AppCommande},
 
    {path:'/AppMenu', component: AppMenu},

    {path:'/AppDetail', component: AppDetail},

    {path:'/', component: App}
 
]
 
const router = new VueRouter({
 
    routes: routes,
 
    mode:'history'
 
})

Vue.component("app-commande", AppCommande);
Vue.component("app-menu-restaurant", AppMenu);
Vue.component("app-restau-detail", AppDetail);
Vue.component("App",App);

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
