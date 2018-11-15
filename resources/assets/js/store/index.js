import Vue from 'vue'
import Vuex from 'vuex'
// import API from './../services/Api'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products : []
  },
  getters : {

    // GETTING PRODUCTS
    PRODUCTS : state => {
      return state.products;
    },

    // GETTING COMPANIES
    COMPANIES : state => {
      return state.companies;
    }
  },
  mutations: {

    // SET PRODUCTS
    SET_PRODUCTS : (state,products) => {
      state.products = products
    },
    SET_PRODUCT : (state,product) => {
      state.products.push(product)
    },

    // SET COMPANIES
    SET_COMPANIES : (state,companies) => {
      state.products = products
    },
    SET_COMPANY : (state,company) => {
      state.companies.push(company)
    }
  },
  actions:{

    // PRODUCTS CRUD
    GET_PRODUCTS : async (context,products) => {
      let uri = 'http://localhost:8000/products/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_PRODUCTS',response.data)
      });
    },
    ADD_PRODUCT : async (context,product) => {
      let uri = 'http://localhost:8000/add_product/';
      await Axios.post(uri, product).then((response) => {
        context.commit('SET_PRODUCT',response.data)
      });
    },
    UPDATE_PRODUCT : async (context,product) => {
      let uri = 'http://localhost:8000/update_product/';
      await Axios.post(uri, product).then((response) => {
        console.log('update product response-------', response.data)
      });
    },
    DELETE_PRODUCT : async (context,product) => {
      let uri = 'http://localhost:8000/delete_product/';
      await Axios.post(uri, product).then((response) => {
        console.log('delete product response-------', response.data)
      });
    },

    // COMPANIES CRUD
    ADD_COMPANY : async (context,company) => {
      let uri = 'http://localhost:8000/companies/';
      console.log('object--------', company)
      await Axios.post(uri, company).then((response) => {
        context.commit('SET_COMPANY',response.data)
      });
    },
  },
})