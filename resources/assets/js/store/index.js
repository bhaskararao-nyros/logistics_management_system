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
    vendors : [],
    lr_entries : [],
    sidebar_var : false,
    last_lr_no : ''
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
    },

    // GETTING VENDORS
    VENDORS : state => {
      return state.vendors;
    },

    // TOGGLE SIDEBAR
    SIDEBAR : state => {
      return state.sidebar_var;
    },

    // GETTING LR ENTRIES
    LR_ENTRIES : state => {
      return state.lr_entries;
    },

    // GETTING LR NUMBER
    LR_NUMBER : state => {
      return state.last_lr_no;
    },

    // GETTING SOURCES

    SOURCES : state => {
      var sources_arr = []
      state.lr_entries.filter((obj) => { 
        sources_arr.push(obj.source)
      })
      return sources_arr;
    },

    // GETTING DESTINATIONS

    DESTINATIONS : state => {
      var destinations_arr = []
      state.lr_entries.filter((obj) => { 
        destinations_arr.push(obj.destination)
      })
      return destinations_arr;
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
    },

    // SET VENDORS

    SET_VENDORS : (state,vendors) => {
      state.vendors = vendors
    },
    SET_VENDOR : (state,vendor) => {
      state.vendors.push(vendor)
    },

    // SETTING SIDEBAR

    SET_SIDEBAR : (state, sidebar) => {
      if (sidebar === undefined) {
        state.sidebar_var = !state.sidebar_var
      } else {
        state.sidebar_var = true
      }
    },

    // SET LR ENTRIES

    SET_LR_ENTRIES : (state,lr_entries) => {
      state.lr_entries = lr_entries
    },
    SET_LR_ENTRY : (state,lr_entry) => {
      state.lr_entries.push(lr_entry)
      state.last_lr_no = lr_entry.lr_no
    },

    // SET LAST LR NUMBER

    SET_LAST_LR_NUMBER : (state,last_lr_no) => {
      state.last_lr_no = last_lr_no
    },

    // SET RECEIPT

    UPDATE_LR_RECEIPT : (state,lr_entries) => {
      state.lr_entries = lr_entries
    },

  },
  actions:{

    // PRODUCTS CRUD
    GET_PRODUCTS : async (context,products) => {
      let uri = 'http://203.193.173.125:8080/products/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_PRODUCTS',response.data)
      });
    },
    ADD_PRODUCT : async (context,product) => {
      let uri = 'http://203.193.173.125:8080/add_product/';
      await Axios.post(uri, product).then((response) => {
        context.commit('SET_PRODUCT',response.data)
      });
    },
    UPDATE_PRODUCT : async (context,product) => {
      let uri = 'http://203.193.173.125:8080/update_product/';
      await Axios.post(uri, product).then((response) => {
        console.log('update product response-------', response.data)
      });
    },
    DELETE_PRODUCT : async (context,product) => {
      let uri = 'http://203.193.173.125:8080/delete_product/';
      await Axios.post(uri, product).then((response) => {
        console.log('delete product response-------', response.data)
      });
    },

    // COMPANIES CRUD

    GET_COMPANIES : async (context,companies) => {
      let uri = 'http://203.193.173.125:8080/companies/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_COMPANIES',response.data)
      });
    },
    ADD_COMPANY : async (context,company) => {
      let uri = 'http://203.193.173.125:8080/add_company/';
      console.log('object--------', company)
      await Axios.post(uri, company).then((response) => {
        context.commit('SET_COMPANY',response.data)
      });
    },
    UPDATE_COMPANY : async (context,company) => {
      let uri = 'http://203.193.173.125:8080/update_company/';
      await Axios.post(uri, company).then((response) => {
        console.log('update company response-------', response.data)
      });
    },
    DELETE_COMPANY : async (context,company) => {
      let uri = 'http://203.193.173.125:8080/delete_company/';
      await Axios.post(uri, company).then((response) => {
        console.log('delete company response-------', response.data)
      });
    },

    // TANKERS CRUD

    GET_TANKERS : async (context,tankers) => {
      let uri = 'http://203.193.173.125:8080/tankers/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_TANKERS',response.data)
      });
    },
    ADD_TANKER : async (context,tanker) => {
      let uri = 'http://203.193.173.125:8080/add_tanker/';
      console.log('object--------', tanker)
      await Axios.post(uri, tanker).then((response) => {
        context.commit('SET_TANKER',response.data)
      });
    },
    UPDATE_TANKER : async (context,tanker) => {
      let uri = 'http://203.193.173.125:8080/update_tanker/';
      await Axios.post(uri, tanker).then((response) => {
        console.log('update tanker response-------', response.data)
      });
    },
    DELETE_TANKER : async (context,tanker) => {
      let uri = 'http://203.193.173.125:8080/delete_tanker/';
      await Axios.post(uri, tanker).then((response) => {
        console.log('delete tanker response-------', response.data)
      });
    },

    // TANKERS CRUD

    GET_USERS : async (context,users) => {
      let uri = 'http://203.193.173.125:8080/users/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_USERS',response.data)
      });
    },
    ADD_USER : async (context,user) => {
      let uri = 'http://203.193.173.125:8080/add_user/';
      await Axios.post(uri, user).then((response) => {
        context.commit('SET_USER',response.data)
      });
    },
    UPDATE_USER : async (context,user) => {
      let uri = 'http://203.193.173.125:8080/update_user/';
      await Axios.post(uri, user).then((response) => {
        console.log('update user response-------', response.data)
      });
    },
    ACTIVATE_USER : async (context,user) => {
      let uri = 'http://203.193.173.125:8080/activate_user/';
      await Axios.post(uri, user).then((response) => {
        console.log('activate user response-------', response.data)
      });
    },
    DEACTIVATE_USER : async (context,user) => {
      let uri = 'http://203.193.173.125:8080/deactivate_user/';
      await Axios.post(uri, user).then((response) => {
        console.log('deactivate user response-------', response.data)
      });
    },

    // FRIGHTS CRUD

    GET_FRIGHTS : async (context,frights) => {
      let uri = 'http://203.193.173.125:8080/frights/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_FRIGHTS',response.data)
      });
    },
    ADD_FRIGHT : async (context,fright) => {
      let uri = 'http://203.193.173.125:8080/add_fright/';
      await Axios.post(uri, fright).then((response) => {
        context.commit('SET_FRIGHT',response.data)
      });
    },
    UPDATE_FRIGHT : async (context,fright) => {
      let uri = 'http://203.193.173.125:8080/update_fright/';
      await Axios.post(uri, fright).then((response) => {
        console.log('update fright response-------', response.data)
      });
    },
    DELETE_FRIGHT : async (context,fright) => {
      let uri = 'http://203.193.173.125:8080/delete_fright/';
      await Axios.post(uri, fright).then((response) => {
        console.log('activate fright response-------', response.data)
      });
    },

    // VENDORS CRUD

    GET_VENDORS : async (context,vendors) => {
      let uri = 'http://203.193.173.125:8080/vendors/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_VENDORS',response.data)
      });
    },
    ADD_VENDOR : async (context,vendor) => {
      let uri = 'http://203.193.173.125:8080/add_vendor/';
      await Axios.post(uri, vendor).then((response) => {
        context.commit('SET_VENDOR',response.data)
      });
    },
    UPDATE_VENDOR : async (context,vendor) => {
      let uri = 'http://203.193.173.125:8080/update_vendor/';
      await Axios.post(uri, vendor).then((response) => {
        console.log('update vendor response-------', response.data)
      });
    },
    DELETE_VENDOR : async (context,vendor) => {
      let uri = 'http://203.193.173.125:8080/delete_vendor/';
      await Axios.post(uri, vendor).then((response) => {
        console.log('activate vendor response-------', response.data)
      });
    },


    // SIDEBAR TOGGLE

    MODIFY_SIDEBAR : async (context, sidebar) => {
      if (sidebar === undefined) {
        context.commit('SET_SIDEBAR')
      } else {
        context.commit('SET_SIDEBAR', sidebar)
      }
    },


    // LR ENTRIES CREATION

    GET_LR_ENTRIES : async (context,lr_entries) => {
      let uri = 'http://203.193.173.125:8080/lr_entries/';
      await Axios.get(uri).then((response) => {
        context.commit('SET_LR_ENTRIES',response.data)
      });
    },
    ADD_LR_ENTRY : async (context,lr_entry) => {
      let uri = 'http://203.193.173.125:8080/add_lr_entry/';
      await Axios.post(uri, lr_entry).then((response) => {
        context.commit('SET_LR_ENTRY',response.data)
      });
    },

    // GETTING LAST LR NUMBER
    GET_LAST_LR_NUMBER : async (context,lr_entry) => {
      let uri = 'http://203.193.173.125:8080/get_last_lr_number/';
      await Axios.post(uri).then((response) => {
        context.commit('SET_LAST_LR_NUMBER',response.data.lr_no)
      });
    },

    // ADDING RECEIPT

    ADD_RECEIPT : async (context,receipt) => {
      let uri = 'http://203.193.173.125:8080/create_receipt/';
      await Axios.post(uri, receipt).then((response) => {
        context.commit('UPDATE_LR_RECEIPT',response.data)
      });
    },

  },
})