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
          <b-form @submit.prevent="addProduct">
            <b-row>
              <b-col cols="2">
                <label>Product Name</label>  
              </b-col>
              <b-col cols="8">
                <b-form-input 
                  v-model="product_name"
                  type="text"
                  placeholder="Enter product name"
                  class="form_input">
                </b-form-input>
                <p class="text-danger" v-if="add_product_err">* {{ product_err_msg }}</p>
              </b-col>
            </b-row>
            <b-button type="submit" class="add_product_btn" size="sm">Add</b-button>
          </b-form>
        </b-card>
        <b-card class="display_products_card">
          <b-container fluid>
            <b-row>
              <!-- SEARCH PRODUCTS FILTER -->
              <b-col md="4" class="my-1">
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="Type to Search" />
                  <b-input-group-append>
                    <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col md="6" class="my-1"></b-col>
              <!-- SORT PRODUCTS FILTER -->
              <b-col md="2" class="my-1">
                <b-form-group horizontal class="mb-0">
                  <b-form-select :options="pageOptions" v-model="perPage" />
                </b-form-group>
              </b-col>
            </b-row>
            <!-- PRODUCTS TABLE -->
            <b-table show-empty
              stacked="md"
              :items="products"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              @filtered="onFiltered">
              <template slot="name" slot-scope="row">{{ row.value }}</template>
              <template slot="actions" slot-scope="row">
                <b-button size="sm" variant="info" @click.stop="editProduct(row.item, row.index, $event.target)" class="mr-1">
                  Edit
                </b-button>
                <b-button size="sm" variant="danger" @click.stop="openDeleteProductModal(row.item, row.index, $event.target)" class="mr-1">
                  Delete
                </b-button>
              </template>
              <template slot="row-details" slot-scope="row">
                <b-card>
                  <ul>
                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
                  </ul>
                </b-card>
              </template>
            </b-table>
            <!-- TABLE PAGINATION -->
            <b-row class="pagination_row">
              <b-col md="6" class="my-1">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
              </b-col>
            </b-row>

            <!-- EDIT PRODUCT MODAL -->
            <b-modal id="editProductModal" title="Edit Product">
              <b-form-input v-model="editModalInfo.name"
                type="text"
                placeholder="Enter product name">
              </b-form-input>
              <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="primary" @click="updateProduct">
                   Update
                </b-btn>
              </div>
            </b-modal>

            <!-- DELETE PRODUCT MODAL -->
            <b-modal header-bg-variant="danger" id="deleteProductModal" title="Delete Product">
              <p>Are you sure want to delete this product ?</p>
              <div slot="modal-footer" class="w-100">
                <b-btn size="md" class="modal_btns" variant="secondary" @click="deleteProduct">
                   Yes
                </b-btn>
                <b-btn size="md" class="modal_btns" variant="primary" @click="closeDeleteProductModal">
                   No
                </b-btn>
              </div>
            </b-modal>
          </b-container>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Sidebar from './../Sidebar'; 
import Navbar from './../Navbar';

let products = []

export default {
  name: 'Products',
  data () {
    return {
      breadcrumb_items: [
        { text: 'Dashboard', href: '/' }, 
        { text: 'Products', active: true }
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