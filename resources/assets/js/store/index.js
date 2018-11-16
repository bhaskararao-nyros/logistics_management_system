import Vue from 'vue'
import Vuex from 'vuex'
// import API from './../services/Api'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products : [],
    companies : [],
    tankers : [],
    users : [],
    frights : [],
  },
  getters : {

    // GETTING PRODUCTS
    PRODUCTS : state => {
      return state.products;
    },

    // GETTING COMPANIES
    COMPANIES : state => {
      return state.companies;
    },

    // GETTING TANKERS
    TANKERS : state => {
      return state.tankers;
    },

    // GETTING USERS
    USERS : state => {
      return state.users;
    },

    // GETTING FRIGHTS
    FRIGHTS : state => {
      return state.frights;
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
      state.companies = companies
    },
    SET_COMPANY : (state,company) => {
      state.companies.push(company)
    },

    // SET TANKERS

    SET_TANKERS : (state,tankers) => {
      state.tankers = tankers
    },
    SET_TANKER : (state,tanker) => {
      state.tankers.push(tanker)
    },

    // SET USERS

    SET_USERS : (state,users) => {
      state.users = users
    },
    SET_USER : (state,user) => {
      state.users.push(user)
    },

    // SET USERS

    SET_FRIGHTS : (state,frights) => {
      state.frights = frights
    },
    SET_FRIGHT : (state,fright) => {
      state.frights.push(fright)
    }
  },
  actions:{

    // PRODUCTS CRUD
    GET_PRODUCTS : async (context,products) => {
      let uri = 'http://10.90.90.55:8000/products/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_PRODUCTS',response.data)
      });
    },
    ADD_PRODUCT : async (context,product) => {
      let uri = 'http://10.90.90.55:8000/add_product/';
      await Axios.post(uri, product).then((response) => {
        context.commit('SET_PRODUCT',response.data)
      });
    },
    UPDATE_PRODUCT : async (context,product) => {
      let uri = 'http://10.90.90.55:8000/update_product/';
      await Axios.post(uri, product).then((response) => {
        console.log('update product response-------', response.data)
      });
    },
    DELETE_PRODUCT : async (context,product) => {
      let uri = 'http://10.90.90.55:8000/delete_product/';
      await Axios.post(uri, product).then((response) => {
        console.log('delete product response-------', response.data)
      });
    },

    // COMPANIES CRUD

    GET_COMPANIES : async (context,companies) => {
      let uri = 'http://10.90.90.55:8000/companies/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_COMPANIES',response.data)
      });
    },
    ADD_COMPANY : async (context,company) => {
      let uri = 'http://10.90.90.55:8000/add_company/';
      console.log('object--------', company)
      await Axios.post(uri, company).then((response) => {
        context.commit('SET_COMPANY',response.data)
      });
    },
    UPDATE_COMPANY : async (context,company) => {
      let uri = 'http://10.90.90.55:8000/update_company/';
      await Axios.post(uri, company).then((response) => {
        console.log('update company response-------', response.data)
      });
    },
    DELETE_COMPANY : async (context,company) => {
      let uri = 'http://10.90.90.55:8000/delete_company/';
      await Axios.post(uri, company).then((response) => {
        console.log('delete company response-------', response.data)
      });
    },

    // TANKERS CRUD

    GET_TANKERS : async (context,tankers) => {
      let uri = 'http://10.90.90.55:8000/tankers/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_TANKERS',response.data)
      });
    },
    ADD_TANKER : async (context,tanker) => {
      let uri = 'http://10.90.90.55:8000/add_tanker/';
      console.log('object--------', tanker)
      await Axios.post(uri, tanker).then((response) => {
        context.commit('SET_TANKER',response.data)
      });
    },
    UPDATE_TANKER : async (context,tanker) => {
      let uri = 'http://10.90.90.55:8000/update_tanker/';
      await Axios.post(uri, tanker).then((response) => {
        console.log('update tanker response-------', response.data)
      });
    },
    DELETE_TANKER : async (context,tanker) => {
      let uri = 'http://10.90.90.55:8000/delete_tanker/';
      await Axios.post(uri, tanker).then((response) => {
        console.log('delete tanker response-------', response.data)
      });
    },

    // TANKERS CRUD

    GET_USERS : async (context,users) => {
      let uri = 'http://10.90.90.55:8000/users/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_USERS',response.data)
      });
    },
    ADD_USER : async (context,user) => {
      let uri = 'http://10.90.90.55:8000/add_user/';
      await Axios.post(uri, user).then((response) => {
        context.commit('SET_USER',response.data)
      });
    },
    UPDATE_USER : async (context,user) => {
      let uri = 'http://10.90.90.55:8000/update_user/';
      await Axios.post(uri, user).then((response) => {
        console.log('update user response-------', response.data)
      });
    },
    ACTIVATE_USER : async (context,user) => {
      let uri = 'http://10.90.90.55:8000/activate_user/';
      await Axios.post(uri, user).then((response) => {
        console.log('activate user response-------', response.data)
      });
    },
    DEACTIVATE_USER : async (context,user) => {
      let uri = 'http://10.90.90.55:8000/deactivate_user/';
      await Axios.post(uri, user).then((response) => {
        console.log('deactivate user response-------', response.data)
      });
    },

    // FRIGHTS CRUD

    GET_FRIGHTS : async (context,frights) => {
      let uri = 'http://10.90.90.55:8000/frights/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_FRIGHTS',response.data)
      });
    },
    ADD_FRIGHT : async (context,fright) => {
      let uri = 'http://10.90.90.55:8000/add_fright/';
      await Axios.post(uri, fright).then((response) => {
        context.commit('SET_FRIGHT',response.data)
      });
    },
    UPDATE_FRIGHT : async (context,fright) => {
      let uri = 'http://10.90.90.55:8000/update_fright/';
      await Axios.post(uri, fright).then((response) => {
        console.log('update fright response-------', response.data)
      });
    },
    DELETE_FRIGHT : async (context,fright) => {
      let uri = 'http://10.90.90.55:8000/delete_fright/';
      await Axios.post(uri, fright).then((response) => {
        console.log('activate fright response-------', response.data)
      });
    },
  },
})