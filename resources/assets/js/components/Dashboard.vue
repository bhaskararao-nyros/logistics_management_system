<template>
  <div class="dashboard">
    <!-- NOTIFICATIONS COMPONENT -->
    <notifications group="product_notifications" />
    <b-row class="dashboard_row">
      <b-col cols="3">
        <!-- SIDEBAR COMPONENT -->
        <Sidebar />
      </b-col>
      <b-col cols="9">
        <!-- NAVBAR COMPONENT -->
        <Navbar />
        <!-- BREADCRUBM FOR EASY NAVIGATION -->
        <b-breadcrumb :items="breadcrumb_items"/>
        <!-- ADD PRODUCT FORM -->
        <b-card class="add_product_card">
          <h2>Dashboard</h2>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Sidebar from './Sidebar'; 
import Navbar from './Navbar';

let products = []

export default {
  name: 'Dashboard',
  data () {
    return {
      breadcrumb_items: [
        { text: 'Dashboard', active: true }
      ],
      fields: [
        { key: 'name', label: 'Product Name', sortable: true },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: products.length,
      pageOptions: [ 5, 10, 15 ],
      filter: null,
      editModalInfo: { name: '', id: 0 },
      product_name:'',
      product_err_msg:'',
      add_product_err: false,
      edit_product_err: false,
      delete_product_id: 0
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      this.$store.dispatch('GET_PRODUCTS')
    },

    // CALLING NOTIFICATIONS AFTER EACH OPERATION
    callNotification (type,msg) {
      this.$notify({
        group: 'product_notifications',
        type: 'warn',
        title: type,
        text: msg
      });
    },

    // OPEN AND CLOSE MODALS
    closeDeleteProductModal () {
      this.$root.$emit('bv::hide::modal', 'deleteProductModal')
    },
    openDeleteProductModal (item, index, button) {
      this.delete_product_id = item.id
      this.$root.$emit('bv::show::modal', 'deleteProductModal', button)
    },

    // SEARCH FILTER
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    // CRUD METHODS
    addProduct () {
      if (this.product_name === '') {
        this.add_product_err = true
        this.product_err_msg = "enter product name"
      } else if (this.product_name.length < 3) {
        this.add_product_err = true
        this.product_err_msg = "product name must be atleast 3 characters"
      } else {
        this.add_product_err = false
        this.product_err_msg = ""

        let data = { name: this.product_name }
        this.$store.dispatch('ADD_PRODUCT',data)
        this.callNotification('ADD PRODUCT','Product added successfully')
        this.product_name = ''
      }
    },
    editProduct (item, index, button) {
      this.editModalInfo.name = item.name
      this.editModalInfo.id = item.id
      this.$root.$emit('bv::show::modal', 'editProductModal', button)
    },
    updateProduct () {
      this.$root.$emit('bv::hide::modal', 'editProductModal')
      this.$store.dispatch('UPDATE_PRODUCT',this.editModalInfo)
      this.getProducts()
      this.callNotification('UPDATE PRODUCT','Product updated successfully')
    },
    deleteProduct () {
      let data = { id: this.delete_product_id }
      this.$store.dispatch('DELETE_PRODUCT',data)
      this.closeDeleteProductModal()
      this.getProducts()
      this.callNotification('DELETE PRODUCT','Product deleted successfully')
    },
  },
  computed: {

    // GETTING PRODUCTS FROM VUEX STORE
    products () {
      products = this.$store.getters.PRODUCTS
      return this.$store.getters.PRODUCTS
    }
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style scoped>
.col-9, .col-3 {
  padding: 0px !important;
}
.dashboard_row {
  margin: 0px;
}
.add_product_card .card-body {
  padding: 2%;  
}
.add_product_card, .breadcrumb, .display_products_card {
  border-radius: 0px;
}
.add_product_btn {
  float: right;
}
.pagination_row {
  float: right;
}
.form_input {
  width: 50%;
}
.modal_btns {
  float: right;
  margin-left: 1%;
}
</style>