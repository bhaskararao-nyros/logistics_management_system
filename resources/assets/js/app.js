require('./bootstrap');

window.Vue = require('vue');

window.VueRouter=require('vue-router').default;

window.Vuex=require('vuex').default;

window.VueAxios=require('vue-axios').default;

window.Axios=require('axios').default;

let AppLayout= require('./components/MainApp.vue');

window.BootstrapVue=require('bootstrap-vue').default;

import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faCaretRight, faCaretDown, faPenSquare, faTrash, faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Notifications from 'vue-notification'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(faCoffee, faCaretRight, faCaretDown, faPenSquare, faTrash, faPlusCircle, faEye)

Vue.component('font-awesome-icon', FontAwesomeIcon)


// show the list post template
const Dashboard=Vue.component('Dashboard', require('./components/Dashboard.vue'));

const Products=Vue.component('Products', require('./components/data_management/Products.vue'));

// // add post template
const Companies =Vue.component('Companies', require('./components/data_management/Companies.vue'));

const Tankers =Vue.component('Tankers', require('./components/data_management/Tankers.vue'));

const Users =Vue.component('Users', require('./components/data_management/Users.vue'));

const Fright =Vue.component('Fright', require('./components/data_management/Fright.vue'));

const Vendor =Vue.component('Vendor', require('./components/data_management/Vendors.vue'));

const LrEntry =Vue.component('LrEntry', require('./components/Lrentry.vue'));

// // edite post template
// const Editpost =Vue.component('Editpost', require('./components/Editpost.vue'));

// // delete post template
// const Deletepost =Vue.component('Deletepost', require('./components/Deletepost.vue'));

// // view single post template
// const Viewpost =Vue.component('Viewpost', require('./components/Viewpost.vue'));

// registering Modules
Vue.use(VueRouter,VueAxios, axios, Vuex, BootstrapVue);

Vue.use(Notifications);

const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: Dashboard
  },
  {
    name: 'Companies',
    path: '/company',
    component: Companies
  },
  {
    name: 'Products',
    path: '/product',
    component: Products
  },
  {
    name: 'Tankers',
    path: '/tanker',
    component: Tankers
  },
  {
    name: 'Users',
    path: '/user',
    component: Users
  },
  {
    name: 'Fright',
    path: '/fright',
    component: Fright
  },
  {
    name: 'Vendor',
    path: '/vendor',
    component: Vendor
  },
  {
    name: 'LrEntry',
    path: '/lr_entry',
    component: LrEntry
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(
 Vue.util.extend(
 { router, store },
 AppLayout
 )
).$mount('#app');
